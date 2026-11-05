// SPSU DSA Odyssey - Web Audio API Sound Synthesizer (100% Offline & Pure Synthesis)
class SPSUAudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1, freqEnd = null) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      if (freqEnd !== null) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 10), this.ctx.currentTime + duration);
      }
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  click() {
    this.playTone(800, 'triangle', 0.04, 0.05, 400);
  }

  laser() {
    this.playTone(1200, 'sawtooth', 0.12, 0.08, 200);
  }

  success() {
    if (this.muted) return;
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sine', 0.18, 0.08);
        }, idx * 60);
      });
    } catch(e) {}
  }

  error() {
    this.playTone(180, 'sawtooth', 0.25, 0.12, 90);
  }

  powerUp() {
    this.playTone(300, 'sine', 0.35, 0.1, 1400);
  }

  levelUp() {
    if (this.muted) return;
    try {
      this.init();
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'triangle', 0.3, 0.12);
        }, idx * 80);
      });
    } catch(e) {}
  }

  badgeUnlocked() {
    if (this.muted) return;
    try {
      this.init();
      const notes = [587.33, 739.99, 880, 1174.66, 1479.98];
      notes.forEach((f, i) => {
        setTimeout(() => this.playTone(f, 'sine', 0.25, 0.09), i * 90);
      });
    } catch (e) {}
  }

  bossHit() {
    this.playTone(120, 'square', 0.2, 0.15, 40);
  }
}

window.spsuAudio = new SPSUAudioEngine();
