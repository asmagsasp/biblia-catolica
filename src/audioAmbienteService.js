/**
 * audioAmbienteService.js - Trilha Sonora Sacra Ambiente (100% Offline & Universal)
 * Síntese acústica sagrada via Web Audio API + Loops harmônicos em 432Hz
 * Bíblia Sagrada Católica (Edição Ave Maria)
 */

export const SACRED_TRACKS = [
  {
    id: 'gregoriano',
    nome: 'Canto Gregoriano Monástico',
    subtitulo: 'Ressonância solene de abadia beneditina',
    icone: 'fa-church',
    cor: '#eab308'
  },
  {
    id: 'harpa',
    nome: 'Harpa Sacra Celeste',
    subtitulo: 'Arpejos suaves de paz e oração (432Hz)',
    icone: 'fa-feather-pointed',
    cor: '#38bdf8'
  },
  {
    id: 'catedral',
    nome: 'Eco Sagrado & Sinos de Catedral',
    subtitulo: 'Harmônicos de órgão e sinos distantes',
    icone: 'fa-bell',
    cor: '#a855f7'
  },
  {
    id: 'paz',
    nome: 'Paz Serena & Adoração',
    subtitulo: 'Gotas de água viva e acordes celestiais',
    icone: 'fa-dove',
    cor: '#22c55e'
  }
];

class SacredAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.currentTrackId = 'gregoriano';
    this.activeNodes = [];
    this.timerId = null;
    this.volume = 0.25; // 25% default volume (gentle background)
    this.playing = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  getVolume() {
    return this.volume;
  }

  isPlaying() {
    return this.playing;
  }

  getCurrentTrack() {
    return SACRED_TRACKS.find(t => t.id === this.currentTrackId) || SACRED_TRACKS[0];
  }

  stop() {
    this.playing = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    if (this.ctx && this.masterGain) {
      // Fade out smoothly over 400ms
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(0.0001, now, 0.15);
      setTimeout(() => {
        this.cleanupNodes();
        if (this.masterGain) {
          this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        }
      }, 450);
    } else {
      this.cleanupNodes();
    }
  }

  cleanupNodes() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
  }

  play(trackId = null) {
    if (trackId) this.currentTrackId = trackId;
    this.initContext();
    if (!this.ctx) return;

    this.stop();
    setTimeout(() => {
      this.playing = true;
      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      }

      switch (this.currentTrackId) {
        case 'harpa':
          this.playSacredHarp();
          break;
        case 'catedral':
          this.playCathedralEchoes();
          break;
        case 'paz':
          this.playSerenePeace();
          break;
        case 'gregoriano':
        default:
          this.playGregorianChant();
          break;
      }
    }, 200);
  }

  /**
   * 1. Canto Gregoriano: Drones e formantes vocais em Ré menor místico (D - F - A - C)
   */
  playGregorianChant() {
    if (!this.ctx || !this.playing) return;
    const notes = [146.83, 220.00, 261.63, 293.66, 349.23, 440.00]; // D3, A3, C4, D4, F4, A4

    const createVocalDrone = (freq, gainVal) => {
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.002, this.ctx.currentTime);

      // Bandpass vocal formant filter for "Ohhh/Ahhh" monastic chant texture
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 2.2, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainVal, this.ctx.currentTime + 3);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc2.start();

      this.activeNodes.push(osc, osc2, filter, gain);
    };

    createVocalDrone(73.42, 0.15); // D2 Root
    createVocalDrone(110.00, 0.12); // A2 Fifth
    createVocalDrone(146.83, 0.10); // D3 Octave
    createVocalDrone(174.61, 0.08); // F3 Minor Third

    // Gentle evolving chant melody note every 6-9 seconds
    this.timerId = setInterval(() => {
      if (!this.playing || !this.ctx) return;
      const melodyFreq = notes[Math.floor(Math.random() * notes.length)];
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(melodyFreq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 2.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 7.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 8);
    }, 6500);
  }

  /**
   * 2. Harpa Sacra: Arpejos angelicais e harmonia celeste em 432Hz
   */
  playSacredHarp() {
    if (!this.ctx || !this.playing) return;
    const scale = [216, 256.87, 288, 324, 384, 432, 513.74, 576, 648, 768]; // Pure 432Hz Pentatonic

    // Soft warm pad background
    const drone = this.ctx.createOscillator();
    const droneGain = this.ctx.createGain();
    drone.type = 'sine';
    drone.frequency.setValueAtTime(108, this.ctx.currentTime); // Low A
    droneGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    drone.connect(droneGain);
    droneGain.connect(this.masterGain);
    drone.start();
    this.activeNodes.push(drone, droneGain);

    const playHarpPluck = (freq, delaySec) => {
      if (!this.playing || !this.ctx) return;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delaySec);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, this.ctx.currentTime + delaySec);
      filter.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + delaySec + 3.0);

      const now = this.ctx.currentTime + delaySec;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 4.2);
    };

    // Arpeggio loop
    let step = 0;
    this.timerId = setInterval(() => {
      if (!this.playing || !this.ctx) return;
      const note = scale[step % scale.length];
      playHarpPluck(note, 0);
      if (step % 3 === 0) {
        const harmonyNote = scale[(step + 2) % scale.length];
        playHarpPluck(harmonyNote, 0.4);
      }
      step = (step + 1 + Math.floor(Math.random() * 2)) % scale.length;
    }, 1800);
  }

  /**
   * 3. Catedral & Sinos Sagrados: Órgão litúrgico e ressonância de sino
   */
  playCathedralEchoes() {
    if (!this.ctx || !this.playing) return;

    // Organ pedal drone
    const organFrequencies = [65.41, 130.81, 196.00, 261.63]; // C2, C3, G3, C4
    organFrequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06 / (idx + 1), this.ctx.currentTime + 3);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      this.activeNodes.push(osc, gain);
    });

    // Slow distant cathedral bell
    const ringBell = (freq) => {
      if (!this.playing || !this.ctx) return;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 2.76, this.ctx.currentTime); // Inharmonic bell overtone

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 8.5);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + 9);
      oscHarmonic.stop(now + 9);
    };

    ringBell(523.25); // C5

    this.timerId = setInterval(() => {
      if (!this.playing || !this.ctx) return;
      const bellPitches = [392.00, 440.00, 523.25, 659.25, 783.99]; // G4, A4, C5, E5, G5
      const p = bellPitches[Math.floor(Math.random() * bellPitches.length)];
      ringBell(p);
    }, 9500);
  }

  /**
   * 4. Paz Serena & Adoração: Som suave de águas tranquilas e pad de paz
   */
  playSerenePeace() {
    if (!this.ctx || !this.playing) return;

    // Peaceful G major chords
    const chord = [98.00, 146.83, 196.00, 246.94, 293.66, 392.00]; // G2, D3, G3, B3, D4, G4
    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.05, this.ctx.currentTime + 3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.activeNodes.push(osc, filter, gain);
    });

    // Gentle sacred chime shimmer
    this.timerId = setInterval(() => {
      if (!this.playing || !this.ctx) return;
      const chimeFreq = 587.33 + Math.random() * 400;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(chimeFreq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 5);
    }, 4500);
  }
}

export const sacredAudio = new SacredAudioSynthesizer();
