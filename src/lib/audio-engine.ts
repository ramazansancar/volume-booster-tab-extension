import { EQ_BAND_FREQUENCIES, type AudioSettings } from '@/types';
import { clamp } from '@/lib/validate';

/** Seconds used for every parameter ramp, short enough to feel instant. */
const RAMP_SECONDS = 0.05;

/**
 * Builds and drives the Web Audio processing graph for a single audio source.
 *
 * Signal chain:
 *
 *   source -> equalizer bands -> limiter -> gain -> panner -> destination
 *
 * The equalizer sits before the boost so band cuts can make headroom, and the
 * limiter sits before the gain node so it sees a predictable input level. The
 * panner is last because it only redistributes what has already been shaped.
 *
 * The engine is deliberately agnostic about where its input comes from: a
 * MediaElementAudioSourceNode from a page's <video>, or a MediaStreamAudioSource
 * from tab capture. Both feed the same graph.
 */
export class AudioEngine {
  private readonly context: AudioContext;
  private readonly input: GainNode;
  private readonly bands: BiquadFilterNode[];
  private readonly limiter: DynamicsCompressorNode;
  private readonly boost: GainNode;
  private readonly panner: StereoPannerNode;
  private readonly merger: ChannelMergerNode;
  private readonly monoSplitter: ChannelSplitterNode;
  private readonly output: GainNode;
  private monoActive = false;
  private disposed = false;

  constructor(context: AudioContext) {
    this.context = context;
    this.input = context.createGain();
    this.output = context.createGain();

    // One peaking filter per band. Peaking (rather than shelving) keeps the
    // bands independent so moving one does not visibly shift its neighbours.
    this.bands = EQ_BAND_FREQUENCIES.map((frequency) => {
      const filter = context.createBiquadFilter();
      filter.type = 'peaking';
      filter.frequency.value = frequency;
      filter.Q.value = 1.1;
      filter.gain.value = 0;
      return filter;
    });

    // A fast, hard-kneed compressor acting as a brickwall-ish limiter. These
    // values keep loud boosts from clipping without audibly pumping.
    this.limiter = context.createDynamicsCompressor();
    this.limiter.threshold.value = -3;
    this.limiter.knee.value = 0;
    this.limiter.ratio.value = 20;
    this.limiter.attack.value = 0.003;
    this.limiter.release.value = 0.25;

    this.boost = context.createGain();
    this.boost.gain.value = 1;

    this.panner = context.createStereoPanner();
    this.panner.pan.value = 0;

    // Mono downmix: split the stereo pair and feed the same summed signal to
    // both output channels. Only wired up while mono mode is on.
    this.monoSplitter = context.createChannelSplitter(2);
    this.merger = context.createChannelMerger(2);

    this.connectChain();
  }

  /** Wires the static portion of the graph that never changes at runtime. */
  private connectChain(): void {
    let node: AudioNode = this.input;
    for (const band of this.bands) {
      node.connect(band);
      node = band;
    }
    node.connect(this.limiter);
    this.limiter.connect(this.boost);
    this.boost.connect(this.panner);
    this.panner.connect(this.output);
    this.output.connect(this.context.destination);
  }

  /** The node that upstream sources should connect into. */
  get inputNode(): AudioNode {
    return this.input;
  }

  /** Applies a full settings object to the running graph. */
  apply(settings: AudioSettings): void {
    if (this.disposed) return;
    const now = this.context.currentTime;

    // Bypass is implemented as unity gain everywhere rather than by rewiring,
    // so toggling it cannot introduce clicks or drop the audio entirely.
    const effectiveGain = settings.bypassed ? 1 : settings.gain;
    this.rampParam(this.boost.gain, effectiveGain, now);

    // A limiter that is off is modelled as a threshold above any real signal,
    // which avoids disconnecting and reconnecting nodes mid-playback.
    const limiterOn = !settings.bypassed && settings.limiterEnabled;
    this.rampParam(this.limiter.threshold, limiterOn ? -3 : 0, now);
    this.limiter.ratio.value = limiterOn ? 20 : 1;

    this.rampParam(this.panner.pan, settings.bypassed ? 0 : settings.balance, now);

    this.bands.forEach((band, index) => {
      const value = settings.bypassed ? 0 : (settings.equalizer[index] ?? 0);
      this.rampParam(band.gain, clamp(value, -24, 24), now);
    });

    this.setMono(!settings.bypassed && settings.mono);
  }

  /** Inserts or removes the mono downmix between the panner and the output. */
  private setMono(enabled: boolean): void {
    if (enabled === this.monoActive) return;
    this.monoActive = enabled;

    try {
      this.panner.disconnect();
      this.monoSplitter.disconnect();
      this.merger.disconnect();
    } catch {
      // Disconnecting a node that was never connected throws in some engines;
      // the graph is rebuilt below either way.
    }

    if (enabled) {
      this.panner.connect(this.monoSplitter);
      // Summing both source channels into each output channel is what actually
      // produces mono; connecting one input to two merger inputs does that.
      this.monoSplitter.connect(this.merger, 0, 0);
      this.monoSplitter.connect(this.merger, 0, 1);
      this.monoSplitter.connect(this.merger, 1, 0);
      this.monoSplitter.connect(this.merger, 1, 1);
      this.merger.connect(this.output);
    } else {
      this.panner.connect(this.output);
    }
  }

  /**
   * Ramps an AudioParam instead of assigning it, because instant jumps in gain
   * produce audible clicks. Falls back to a direct assignment on engines that
   * reject the scheduling call.
   */
  private rampParam(param: AudioParam, value: number, now: number): void {
    try {
      param.cancelScheduledValues(now);
      param.setValueAtTime(param.value, now);
      param.linearRampToValueAtTime(value, now + RAMP_SECONDS);
    } catch {
      param.value = value;
    }
  }

  /**
   * Resumes the context, which browsers suspend until the page is allowed to
   * make sound.
   *
   * Chrome writes "The AudioContext was not allowed to start" straight to the
   * console when a resume is refused. That message is not an exception, so a
   * catch block cannot suppress it - the only way to avoid the noise is not to
   * call resume() unless it can succeed.
   *
   * `navigator.userActivation.hasBeenActive` answers that: it reports whether
   * the document has ever had a user gesture, which is the condition the
   * autoplay policy actually checks. Its sibling `isActive` is deliberately not
   * used here - that one expires a few seconds after each gesture, and would
   * refuse legitimate resumes triggered by a later settings change.
   */
  async resume(): Promise<void> {
    if (this.context.state !== 'suspended') return;

    const activation = (
      navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }
    ).userActivation;
    if (activation && !activation.hasBeenActive) return;

    try {
      await this.context.resume();
    } catch {
      // Autoplay policy can still refuse; the next user gesture will retry.
    }
  }

  /** Tears the graph down. The AudioContext itself is owned by the caller. */
  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    for (const node of [
      this.input,
      ...this.bands,
      this.limiter,
      this.boost,
      this.panner,
      this.monoSplitter,
      this.merger,
      this.output,
    ]) {
      try {
        node.disconnect();
      } catch {
        // Already disconnected.
      }
    }
  }
}
