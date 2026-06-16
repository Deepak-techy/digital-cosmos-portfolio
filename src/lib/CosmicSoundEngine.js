// ─────────────────────────────────────────────────────────────
// DIGITAL COSMOS — Procedural & Streaming Audio Synthesizer
// Background track streamed via HTML5 Audio routed through Web Audio API.
// Reworked cosmic sound effects for an immersive space feel.
// ─────────────────────────────────────────────────────────────

export class CosmicSoundEngine {
  constructor() {
    this._ctx = null;
    this._master = null;
    this._compressor = null;
    this._reverb = null;
    this._bgAudio = null;
    this._bgSource = null;
    this._volume = 0.5;
    this._muted = false;
    this._disposed = false;
  }

  // ── Lazy AudioContext (created on first user gesture) ──────
  _ensureContext() {
    if (this._disposed) return null;
    if (this._ctx) return this._ctx;

    try {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();

      // Compressor → prevents harsh peaks across all sounds
      this._compressor = this._ctx.createDynamicsCompressor();
      this._compressor.threshold.value = -24;
      this._compressor.knee.value = 30;
      this._compressor.ratio.value = 4;
      this._compressor.attack.value = 0.003;
      this._compressor.release.value = 0.25;
      this._compressor.connect(this._ctx.destination);

      // Master gain
      this._master = this._ctx.createGain();
      this._master.gain.value = this._muted ? 0 : this._volume;
      this._master.connect(this._compressor);

      // Convolution reverb with synthetic impulse response
      this._reverb = this._createReverb();
      this._reverb.connect(this._master);

      return this._ctx;
    } catch {
      return null;
    }
  }

  // ── Synthetic impulse response for reverb ──────────────────
  _createReverb() {
    const ctx = this._ctx;
    const length = ctx.sampleRate * 2.5; // 2.5s tail
    const impulse = ctx.createBuffer(2, length, ctx.sampleRate);

    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        // Exponential decay with slight randomization
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.8);
      }
    }

    const convolver = ctx.createConvolver();
    convolver.buffer = impulse;
    return convolver;
  }

  // ── Resume suspended context (required after user gesture) ─
  async resume() {
    const ctx = this._ensureContext();
    if (ctx && ctx.state === "suspended") {
      await ctx.resume();
    }
  }

  // ── Volume & Mute ─────────────────────────────────────────
  setVolume(v) {
    this._volume = Math.max(0, Math.min(1, v));
    if (this._master && !this._muted) {
      this._master.gain.setTargetAtTime(this._volume, this._ctx.currentTime, 0.08);
    }
  }

  setMuted(m) {
    this._muted = m;
    if (this._master) {
      this._master.gain.setTargetAtTime(
        m ? 0 : this._volume,
        this._ctx.currentTime,
        0.08
      );
    }
    // Suspend/resume ambience
    if (m) {
      this._stopAmbience();
    } else {
      this.startAmbience();
    }
  }

  get muted() {
    return this._muted;
  }

  get volume() {
    return this._volume;
  }

  // ── Utility: create a gain node routed to master ──────────
  _createGain(value = 1) {
    const g = this._ctx.createGain();
    g.gain.value = value;
    g.connect(this._master);
    return g;
  }

  // ── Utility: create a gain node routed through reverb ─────
  _createWetGain(value = 0.3) {
    const g = this._ctx.createGain();
    g.gain.value = value;
    g.connect(this._reverb);
    return g;
  }

  // ── Guard: check if playback is allowed ───────────────────
  _canPlay() {
    if (this._disposed || this._muted) return false;
    const ctx = this._ensureContext();
    return ctx && ctx.state === "running";
  }

  // ═══════════════════════════════════════════════════════════
  // BACKGROUND AMBIENCE
  // Streaming space-ambient.mp3 file
  // ═══════════════════════════════════════════════════════════

  startAmbience() {
    if (this._disposed || this._muted) return;
    const ctx = this._ensureContext();
    if (!ctx) return;

    if (!this._bgAudio) {
      this._bgAudio = new Audio("/space-ambient.mp3");
      this._bgAudio.loop = true;
      this._bgAudio.crossOrigin = "anonymous";
      
      // Create dedicated gain node for background track to keep it soft
      this._bgGain = ctx.createGain();
      this._bgGain.gain.value = 0.20; 
      
      this._bgSource = ctx.createMediaElementSource(this._bgAudio);
      this._bgSource.connect(this._bgGain);
      this._bgGain.connect(this._master);
    }

    if (this._bgAudio.paused) {
      this._bgAudio.play().catch((err) => {
        console.log("Autoplay blocked background audio:", err);
      });
    }
  }

  _stopAmbience() {
    if (this._bgAudio) {
      this._bgAudio.pause();
    }
  }

  // ═══════════════════════════════════════════════════════════
  // SECTION TRANSITION SOUNDS — Redesigned for space depth
  // ═══════════════════════════════════════════════════════════

  // ── Spacecraft awakening: deep sub sweep + cabin vents ────
  awaken() {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.06);
    const wet = this._createWetGain(0.15);

    // Deep sub sweep (engine hum warming up)
    const sub = ctx.createOscillator();
    sub.type = "sine";
    sub.frequency.setValueAtTime(40, now);
    sub.frequency.linearRampToValueAtTime(55, now + 3.0);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.6, now + 1.0);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

    sub.connect(subGain);
    subGain.connect(out);
    sub.start(now);
    sub.stop(now + 3.1);

    // Filtered noise swell (cabin pressurization / vents)
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(50, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 2.5);
    filter.Q.value = 1.0;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.12, now + 1.2);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(out);
    noiseGain.connect(wet);
    noise.start(now);

    // Soft warm pad chord (F2 + C3 + G3)
    [87.31, 130.81, 196.0].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0, now + 0.3);
      g.gain.linearRampToValueAtTime(0.25, now + 1.5 + i * 0.2);
      g.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

      osc.connect(g);
      g.connect(out);
      g.connect(wet);
      osc.start(now + 0.3);
      osc.stop(now + 3.3);
    });

    this._autoCleanup([out, wet], 3.5);
  }

  // ── Star emergence: deep, echoing glass-like tone ──────────
  starEmergence() {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.05);
    const wet = this._createWetGain(0.35); // heavily wet for space feel

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 329.63; // E4

    const oscHarmonic = ctx.createOscillator();
    oscHarmonic.type = "sine";
    oscHarmonic.frequency.value = 659.26; // E5 (octave, very quiet)

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.3, now + 0.1); // soft attack
    env.gain.exponentialRampToValueAtTime(0.001, now + 2.0); // long decay

    osc.connect(env);
    oscHarmonic.connect(env);
    env.connect(out);
    env.connect(wet);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + 2.2);
    oscHarmonic.stop(now + 2.2);

    this._autoCleanup([out, wet], 2.5);
  }

  // ── Constellation activate: slow major 7th chord drone ──────
  constellationActivate() {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.04);
    const wet = this._createWetGain(0.35);

    // A2 + E3 + B3 + G4 (A minor 9 style voicing)
    [110.0, 164.81, 246.94, 392.0].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      const g = ctx.createGain();
      const t = now + i * 0.15; // slow ripple
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.25, t + 0.4); // slow attack
      g.gain.exponentialRampToValueAtTime(0.001, t + 2.2); // long tail

      osc.connect(g);
      g.connect(out);
      g.connect(wet);
      osc.start(t);
      osc.stop(t + 3.0);
    });

    this._autoCleanup([out, wet], 3.5);
  }

  // ── Digital pulse: deep sub-bass cosmic sonar radar pulse ──
  digitalPulse() {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.05);
    const wet = this._createWetGain(0.3);

    // Sonar carrier
    const carrier = ctx.createOscillator();
    carrier.type = "sine";
    carrier.frequency.value = 110; // A2

    // Modulator for slight pitch bend (radar sweep effect)
    const modulator = ctx.createOscillator();
    modulator.type = "sine";
    modulator.frequency.value = 5; // 5Hz vibrato

    const modGain = ctx.createGain();
    modGain.gain.value = 3; // detunes carrier by 3Hz

    modulator.connect(modGain);
    modGain.connect(carrier.frequency);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.5, now + 0.08); // warm pulse
    env.gain.exponentialRampToValueAtTime(0.001, now + 2.0); // long decay

    carrier.connect(env);
    env.connect(out);
    env.connect(wet);

    carrier.start(now);
    modulator.start(now);
    carrier.stop(now + 2.2);
    modulator.stop(now + 2.2);

    this._autoCleanup([out, wet], 2.5);
  }

  // ── Data flow: soft swirling solar wind noise sweep ─────────
  dataFlow() {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.04);
    const wet = this._createWetGain(0.4);

    // Create a 2s noise buffer
    const len = ctx.sampleRate * 2.0;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] = Math.random() * 2 - 1;
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    // Sweeping filter
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(120, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + 1.0);
    filter.frequency.exponentialRampToValueAtTime(100, now + 2.0);
    filter.Q.value = 1.5;

    // Stereo Panning for swirl effect
    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(-1, now);
    panner.pan.linearRampToValueAtTime(1, now + 1.0);
    panner.pan.linearRampToValueAtTime(-1, now + 2.0);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.3, now + 0.3);
    env.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

    src.connect(filter);
    filter.connect(panner);
    panner.connect(env);
    env.connect(out);
    env.connect(wet);

    src.start(now);

    this._autoCleanup([out, wet], 2.2);
  }

  // ── Discovery: rich, warm cinematic swell ───────────────────
  discovery() {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.05);
    const wet = this._createWetGain(0.4);

    // Rich harmonic voices (C#3, G#3, D#4, F#4)
    [138.59, 207.65, 311.13, 369.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "triangle"; // softer than sawtooth
      osc.frequency.value = freq;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(150, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 1.2 + i * 0.15);
      filter.frequency.exponentialRampToValueAtTime(150, now + 2.8);
      filter.Q.value = 1.0;

      const env = ctx.createGain();
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.2, now + 1.0);
      env.gain.linearRampToValueAtTime(0, now + 3.0);

      osc.connect(filter);
      filter.connect(env);
      env.connect(out);
      env.connect(wet);

      osc.start(now);
      osc.stop(now + 3.2);
    });

    this._autoCleanup([out, wet], 3.5);
  }

  // ── Hopeful tone: glorious modal pad chord with slow fade ─
  hopefulTone() {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.04);
    const wet = this._createWetGain(0.45);

    // C2 + G2 + C3 + D3 + G3 + D4 voicing
    [65.41, 98.0, 130.81, 146.83, 196.0, 293.66].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      const detuned = ctx.createOscillator();
      detuned.type = "sine";
      detuned.frequency.value = freq * 1.003; // detune layer for chorus/warmth

      const env = ctx.createGain();
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.22, now + 1.5 + i * 0.1); // slow attack
      env.gain.exponentialRampToValueAtTime(0.001, now + 4.5); // very long tail

      osc.connect(env);
      detuned.connect(env);
      env.connect(out);
      env.connect(wet);

      osc.start(now);
      detuned.start(now);
      osc.stop(now + 4.8);
      detuned.stop(now + 4.8);
    });

    this._autoCleanup([out, wet], 5.0);
  }

  // ── Generic section transition: low sub boom with pitch bend
  sectionTransition(pitch = 90) {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.03);
    const wet = this._createWetGain(0.2);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.linearRampToValueAtTime(pitch * 0.7, now + 0.6); // slight downwards pitch bend

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.25, now + 0.1);
    env.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(env);
    env.connect(out);
    env.connect(wet);
    osc.start(now);
    osc.stop(now + 1.3);

    this._autoCleanup([out, wet], 1.5);
  }

  // ═══════════════════════════════════════════════════════════
  // MICRO-INTERACTION SOUNDS
  // ═══════════════════════════════════════════════════════════

  // ── Hover tick: soft low-passed noise click ────────────────
  hoverTick() {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.25); // boosted dry signal
    const wet = this._createWetGain(0.35); // boosted space reverb

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, now); // D5 — consonant with background drone

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.5, now + 0.005); // boosted peak envelope
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.15); // slightly longer decay

    osc.connect(env);
    env.connect(out);
    env.connect(wet);
    osc.start(now);
    osc.stop(now + 0.2);

    this._autoCleanup([out, wet], 0.4);
  }

  // ── Hover glow: soft low frequency hum ─────────────────────
  hoverGlow() {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.02); // very quiet

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 150; // low frequency hum

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.35, now + 0.04);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(env);
    env.connect(out);
    osc.start(now);
    osc.stop(now + 0.3);

    this._autoCleanup([out], 0.4);
  }

  // ── UI click: soft, wet organic tap ────────────────────────
  uiClick() {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.35); // boosted dry signal
    const wet = this._createWetGain(0.4); // boosted space reverb

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.12); // slide down

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.7, now + 0.005); // boosted peak envelope
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(env);
    env.connect(out);
    env.connect(wet);
    osc.start(now);
    osc.stop(now + 0.25);

    this._autoCleanup([out, wet], 0.4);
  }

  // ── Modal open: soft, airy cosmic wind swell (ascending) ───
  modalOpen() {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.035);
    const wet = this._createWetGain(0.2);

    const len = ctx.sampleRate * 0.8;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] = Math.random() * 2 - 1;
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(100, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.5);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.8);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.3, now + 0.2);
    env.gain.linearRampToValueAtTime(0, now + 0.8);

    src.connect(filter);
    filter.connect(env);
    env.connect(out);
    env.connect(wet);

    src.start(now);

    this._autoCleanup([out, wet], 1.0);
  }

  // ── Modal close: soft, airy cosmic wind sweep (descending) ─
  modalClose() {
    if (!this._canPlay()) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const out = this._createGain(0.03);
    const wet = this._createWetGain(0.15);

    const len = ctx.sampleRate * 0.7;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] = Math.random() * 2 - 1;
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(500, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.6);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.25, now + 0.15);
    env.gain.linearRampToValueAtTime(0, now + 0.7);

    src.connect(filter);
    filter.connect(env);
    env.connect(out);
    env.connect(wet);

    src.start(now);

    this._autoCleanup([out, wet], 0.9);
  }

  // ═══════════════════════════════════════════════════════════
  // CLEANUP
  // ═══════════════════════════════════════════════════════════

  _autoCleanup(nodes, afterSeconds) {
    setTimeout(() => {
      nodes.forEach((n) => {
        try {
          n.disconnect();
        } catch {
          // Already disconnected
        }
      });
    }, afterSeconds * 1000 + 100);
  }

  dispose() {
    this._disposed = true;
    this._stopAmbience();
    if (this._bgAudio) {
      this._bgAudio.src = "";
      this._bgAudio = null;
    }
    if (this._bgSource) {
      this._bgSource.disconnect();
      this._bgSource = null;
    }
    if (this._ctx) {
      this._ctx.close().catch(() => {});
      this._ctx = null;
    }
    this._master = null;
    this._compressor = null;
    this._reverb = null;
  }
}
