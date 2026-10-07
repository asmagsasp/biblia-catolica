// ==========================================================================
// RÁDIOS E PODCASTS CATÓLICOS - SERVIÇO DE ÁUDIO & STREAMING
// Bíblia Católica Sagrada (Web & Mobile)
// ==========================================================================

import { trackEvent } from './analytics.js';

// Catálogo de Rádios Católicas 24h Ao Vivo
export const CATHOLIC_RADIOS = [
  {
    id: 'aparecida',
    name: 'Rádio Aparecida 104.3 FM',
    city: 'Aparecida - SP',
    diocese: 'Santuário Nacional de N. Sra. Aparecida',
    streamUrl: 'https://aparecida.jmvstream.com/stream',
    type: 'live',
    genre: 'Mariana & Devocional',
    icon: 'fas fa-church',
    accentColor: '#1d4ed8',
    freq: '104.3 FM',
    description: 'Transmissão direta da Capital Mariana da Fé e do Santuário Nacional.',
    tags: ['mariana', 'aparecida', 'missa', 'santuario', 'terco', 'oracao']
  },
  {
    id: 'cancao_nova',
    name: 'Rádio Canção Nova FM',
    city: 'Cachoeira Paulista - SP',
    diocese: 'Comunidade Canção Nova',
    streamUrl: 'https://cloud1.cdnseguro.com:20038/stream',
    type: 'live',
    genre: 'Carismática & Louvor',
    icon: 'fas fa-dove',
    accentColor: '#0284c7',
    freq: '89.1 FM',
    description: 'Evangelização, Terço da Misericórdia, pregações e louvores 24h.',
    tags: ['carismatica', 'cancao nova', 'louvor', 'misericordia', 'oracao']
  },
  {
    id: 'evangelizar',
    name: 'Rádio Evangelizar FM',
    city: 'Curitiba - PR',
    diocese: 'Pe. Reginaldo Manzotti',
    streamUrl: 'https://8239.brasilstream.com.br/stream?origem=radios.com.br',
    type: 'live',
    genre: 'Oração & Formação',
    icon: 'fas fa-hands-praying',
    accentColor: '#d97706',
    freq: '99.5 FM',
    description: 'A voz de quem evangeliza com Pe. Reginaldo Manzotti, orações e bênçãos.',
    tags: ['evangelizar', 'padre reginaldo', 'experiencia de deus', 'cura', 'bencao']
  },
  {
    id: 'evangelizar_familia',
    name: 'Rádio Evangelizar Família',
    city: 'Curitiba - PR',
    diocese: 'Associação Evangelizar',
    streamUrl: 'https://8241.brasilstream.com.br/stream',
    type: 'live',
    genre: 'Família & Música',
    icon: 'fas fa-heart',
    accentColor: '#ec4899',
    freq: 'Web 24h',
    description: 'Programação musical e reflexões para santificar o ambiente da família.',
    tags: ['familia', 'louvor', 'musica', 'paz', 'lar']
  },
  {
    id: 'imaculada',
    name: 'Rádio Imaculada FM',
    city: 'São Bernardo do Campo - SP',
    diocese: 'Milícia da Imaculada',
    streamUrl: 'https://radio.saopaulo01.com.br:10863/stream',
    type: 'live',
    genre: 'Consagração Mariana',
    icon: 'fas fa-crown',
    accentColor: '#6366f1',
    freq: '92.3 FM',
    description: 'Fundada no carisma de São Maximiliano Kolbe para a glória da Imaculada.',
    tags: ['imaculada', 'kolbe', 'rosario', 'consagracao', 'maria']
  },
  {
    id: 'catedral_rj',
    name: 'Rádio Catedral 106.7 FM',
    city: 'Rio de Janeiro - RJ',
    diocese: 'Arquidiocese de São Sebastião do Rio de Janeiro',
    streamUrl: 'https://hts04.brascast.com:13728/stream',
    type: 'live',
    genre: 'Liturgia & Formação',
    icon: 'fas fa-archway',
    accentColor: '#059669',
    freq: '106.7 FM',
    description: 'A emissora católica oficial da Arquidiocese do Rio de Janeiro.',
    tags: ['arquidiocese', 'rio de janeiro', 'liturgia', 'missas', 'catequese']
  },
  {
    id: 'agnus_dei',
    name: 'Rádio Agnus Dei FM',
    city: 'Recife - PE',
    diocese: 'Comunidade Agnus Dei',
    streamUrl: 'https://hts03.brascast.com:9144/live',
    type: 'live',
    genre: 'Louvor & Adoração',
    icon: 'fas fa-sun',
    accentColor: '#eab308',
    freq: 'Web 24h',
    description: 'Músicas católicas, momentos de intercessão e adoração eucarística.',
    tags: ['adoracao', 'louvor', 'musica', 'eucaristia']
  },
  {
    id: 'tradicao_catolica',
    name: 'Rádio Tradição Católica',
    city: 'Brasil',
    diocese: 'Tradição & Liturgia Latina',
    streamUrl: 'https://servidor17-1.brlogic.com:7126/live',
    type: 'live',
    genre: 'Canto Gregoriano & Latim',
    icon: 'fas fa-cross',
    accentColor: '#7c3aed',
    freq: 'Web 24h',
    description: 'Cantos gregorianos, orações em latim, salmodias e teologia perene.',
    tags: ['gregoriano', 'latim', 'tradicao', 'missa tridentina', 'sacra']
  },
  {
    id: 'radio_olinda',
    name: 'Rádio Olinda 105.3 FM',
    city: 'Olinda / Recife - PE',
    diocese: 'Arquidiocese de Olinda e Recife',
    streamUrl: 'https://radio.saopaulo01.com.br:10771/stream',
    type: 'live',
    genre: 'Nordeste & Evangelho',
    icon: 'fas fa-bell',
    accentColor: '#0891b2',
    freq: '105.3 FM',
    description: 'Uma das emissoras católicas mais tradicionais do Nordeste brasileiro.',
    tags: ['nordeste', 'olinda', 'recife', 'oracao', 'comunidade']
  }
];

// Catálogo de Podcasts & Meditações em Áudio
export const CATHOLIC_PODCASTS = [
  {
    id: 'padre_paulo_ricardo',
    name: 'Homilia Diária - Pe. Paulo Ricardo',
    author: 'Padre Paulo Ricardo (Christo Nihil Praeponere)',
    feedUrl: 'https://anchor.fm/s/e81d4a00/podcast/rss',
    type: 'podcast',
    genre: 'Homilias & Meditação',
    icon: 'fas fa-bible',
    accentColor: '#b45309',
    description: 'Meditações diárias e aprofundamento teológico sobre o Evangelho do dia.',
    tags: ['homilia', 'padre paulo ricardo', 'evangelho', 'formacao', 'espiritualidade'],
    episodes: [
      {
        title: 'Homilia Diária: O Evangelho e a Batalha Espiritual',
        author: 'Pe. Paulo Ricardo',
        audioUrl: 'https://anchor.fm/s/e81d4a00/podcast/play/126901805/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-7%2F401764619-44100-2-e56a793a67d7a.mp3',
        duration: '12 min',
        pubDate: 'Hoje'
      },
      {
        title: 'Meditação: O Santíssimo Sacramento e a Graça',
        author: 'Pe. Paulo Ricardo',
        audioUrl: 'https://anchor.fm/s/e81d4a00/podcast/play/126901805/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-7%2F401764619-44100-2-e56a793a67d7a.mp3',
        duration: '15 min',
        pubDate: 'Ontem'
      }
    ]
  },
  {
    id: 'vatican_news',
    name: 'Programa Brasileiro - Vatican News',
    author: 'Rádio Vaticano (Santa Sé - Roma)',
    feedUrl: 'https://www.vaticannews.va/pt/podcast/programa-brasileiro.podcast.xml',
    type: 'podcast',
    genre: 'Vaticano & Papa',
    icon: 'fas fa-shield-halved',
    accentColor: '#d4af37',
    description: 'A voz do Papa Francisco, notícias da Igreja no mundo e mensagens apostólicas.',
    tags: ['vaticano', 'papa', 'igreja', 'santa se', 'noticias', 'roma'],
    episodes: [
      {
        title: 'Noticiário Oficial da Rádio Vaticano em Português',
        author: 'Vatican News',
        audioUrl: 'https://media.vaticannews.va/media2/audio/program/2805/brasiliano_3_061026.mp3',
        duration: '20 min',
        pubDate: 'Edição Atual'
      }
    ]
  },
  {
    id: 'santo_terco_audio',
    name: 'Santo Terço & Rosário Meditado',
    author: 'Vozes da Devoção Mariana',
    feedUrl: 'https://anchor.fm/s/90ae1088/podcast/rss',
    type: 'podcast',
    genre: 'Devoção Mariana',
    icon: 'fas fa-praying-hands',
    accentColor: '#38bdf8',
    description: 'Reze o Santo Rosário com orações guiadas, cânticos e meditações marianas.',
    tags: ['terco', 'rosario', 'maria', 'ave maria', 'misterios'],
    episodes: [
      {
        title: 'Santo Rosário Completo com Contemplações',
        author: 'Devoção Mariana',
        audioUrl: 'https://anchor.fm/s/90ae1088/podcast/play/83753091/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-2-15%2F371077877-44100-2-e4210d7a0c776.mp3',
        duration: '22 min',
        pubDate: 'Devocional'
      }
    ]
  },
  {
    id: 'catequese_catolica',
    name: 'Catequese & Formação Católica',
    author: 'Devoto Mariano',
    feedUrl: 'https://anchor.fm/s/cb9d4650/podcast/rss',
    type: 'podcast',
    genre: 'Doutrina & Teologia',
    icon: 'fas fa-graduation-cap',
    accentColor: '#8b5cf6',
    description: 'Aulas sobre a Santa Igreja Católica, sacramentos e história dos Santos.',
    tags: ['catequese', 'doutrina', 'sacramentos', 'santos', 'formacao'],
    episodes: [
      {
        title: 'Catequese: Uma, Santa, Católica e Apostólica',
        author: 'Devoto Mariano',
        audioUrl: 'https://anchor.fm/s/cb9d4650/podcast/play/71748150/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-5-8%2F334181829-44100-2-613ca9aa5099f.mp3',
        duration: '18 min',
        pubDate: 'Especial'
      }
    ]
  },
  {
    id: 'experiencia_de_deus',
    name: 'Experiência de Deus - Pe. Manzotti',
    author: 'Padre Reginaldo Manzotti',
    feedUrl: 'https://anchor.fm/s/29ee59c/podcast/rss',
    type: 'podcast',
    genre: 'Oração & Bênção',
    icon: 'fas fa-sun',
    accentColor: '#f59e0b',
    description: 'A oração que toca os corações, bênção das famílias e reflexões para a vida.',
    tags: ['padre reginaldo', 'experiencia de deus', 'bencao', 'oracao'],
    episodes: [
      {
        title: 'Momento de Bênção e Oração da Família',
        author: 'Pe. Reginaldo Manzotti',
        audioUrl: 'https://anchor.fm/s/29ee59c/podcast/play/176883/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2018-1-26%2F1880996-44100-2-ad1ee7ffbb185.mp3',
        duration: '25 min',
        pubDate: 'Momento com Deus'
      }
    ]
  },
  {
    id: 'musica_sacra',
    name: 'Música Católica & Adoração Crux Sacra',
    author: 'Crux Sacra Ministério Católico',
    feedUrl: 'https://anchor.fm/s/875dc28/podcast/rss',
    type: 'podcast',
    genre: 'Música & Louvor',
    icon: 'fas fa-music',
    accentColor: '#10b981',
    description: 'Cantos de adoração, momentos de paz interior e louvor eucarístico.',
    tags: ['musica', 'louvor', 'adoracao', 'paz', 'canto'],
    episodes: [
      {
        title: 'Música Católica para Oração e Adoração',
        author: 'Ministério Crux Sacra',
        audioUrl: 'https://anchor.fm/s/875dc28/podcast/play/126835610/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-4%2F401662991-44100-2-19e4871b658db.mp3',
        duration: '45 min',
        pubDate: 'Adoração'
      }
    ]
  }
];

class AudioStreamingService {
  constructor() {
    this.audio = new Audio();
    this.currentTrack = null;
    this.isPlaying = false;
    this.isLoading = false;
    this.volume = 0.9;
    this.listeners = new Set();
    this.cachedEpisodes = new Map();

    this._initAudioEvents();
    this._restorePreferences();
    this._setupMediaSession();
  }

  _initAudioEvents() {
    this.audio.preload = 'none';
    this.audio.volume = this.volume;

    this.audio.addEventListener('loadstart', () => {
      this.isLoading = true;
      this._emitChange();
    });

    this.audio.addEventListener('canplay', () => {
      this.isLoading = false;
      this._emitChange();
    });

    this.audio.addEventListener('playing', () => {
      this.isPlaying = true;
      this.isLoading = false;
      this._emitChange();
      this._updateMediaSessionState('playing');
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.isLoading = false;
      this._emitChange();
      this._updateMediaSessionState('paused');
    });

    this.audio.addEventListener('waiting', () => {
      this.isLoading = true;
      this._emitChange();
    });

    this.audio.addEventListener('timeupdate', () => {
      this._emitChange();
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.isLoading = false;
      this._emitChange();
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('[AudioService] Erro no stream:', e);
      this.isLoading = false;
      this.isPlaying = false;
      this._emitChange({ error: 'Erro ao conectar à transmissão. Verifique sua conexão à internet.' });
    });
  }

  _restorePreferences() {
    try {
      const savedVol = localStorage.getItem('biblia_audio_volume');
      if (savedVol !== null) {
        this.volume = parseFloat(savedVol);
        this.audio.volume = this.volume;
      }
    } catch (e) {
      // ignore
    }
  }

  _setupMediaSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => this.resume());
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
      navigator.mediaSession.setActionHandler('stop', () => this.stop());
    }
  }

  _updateMediaSessionMetadata() {
    if ('mediaSession' in navigator && this.currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.currentTrack.title,
        artist: this.currentTrack.subtitle || 'Bíblia Católica Sagrada',
        album: this.currentTrack.isLive ? 'Rádio Católica Ao Vivo' : 'Podcast Católico',
        artwork: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      });
    }
  }

  _updateMediaSessionState(state) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = state;
    }
  }

  // Toca uma rádio ao vivo
  playRadio(radioId) {
    const radio = CATHOLIC_RADIOS.find(r => r.id === radioId);
    if (!radio) return;

    const isSame = this.currentTrack && this.currentTrack.id === radio.id && this.currentTrack.isLive;
    if (isSame) {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.resume();
      }
      return;
    }

    this.currentTrack = {
      id: radio.id,
      title: radio.name,
      subtitle: `${radio.freq} • ${radio.city}`,
      icon: radio.icon,
      color: radio.accentColor,
      isLive: true,
      genre: radio.genre,
      url: radio.streamUrl,
      raw: radio
    };

    this.isLoading = true;
    this._emitChange();

    try {
      this.audio.src = radio.streamUrl;
      this.audio.load();
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('[AudioService] Play error (autoplay blocked or network):', err);
          this.isPlaying = false;
          this.isLoading = false;
          this._emitChange();
        });
      }
    } catch (e) {
      console.error('[AudioService] Exceção ao iniciar áudio:', e);
      this.isLoading = false;
      this._emitChange();
    }

    this._updateMediaSessionMetadata();
    trackEvent('radio_play', { radio_name: radio.name, radio_id: radio.id });
  }

  // Toca um episódio de podcast
  playPodcast(podcastId, episodeIndex = 0) {
    const pod = CATHOLIC_PODCASTS.find(p => p.id === podcastId);
    if (!pod) return;

    const ep = pod.episodes && pod.episodes[episodeIndex] ? pod.episodes[episodeIndex] : null;
    if (!ep || !ep.audioUrl) return;

    const isSame = this.currentTrack && this.currentTrack.id === `${pod.id}_${episodeIndex}`;
    if (isSame) {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.resume();
      }
      return;
    }

    this.currentTrack = {
      id: `${pod.id}_${episodeIndex}`,
      podId: pod.id,
      title: ep.title,
      subtitle: pod.author,
      icon: pod.icon,
      color: pod.accentColor,
      isLive: false,
      duration: ep.duration,
      genre: pod.genre,
      url: ep.audioUrl,
      raw: pod,
      episode: ep
    };

    this.isLoading = true;
    this._emitChange();

    try {
      this.audio.src = ep.audioUrl;
      this.audio.load();
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('[AudioService] Podcast play error:', err);
          this.isPlaying = false;
          this.isLoading = false;
          this._emitChange();
        });
      }
    } catch (e) {
      console.error('[AudioService] Exceção no podcast:', e);
      this.isLoading = false;
      this._emitChange();
    }

    this._updateMediaSessionMetadata();
    trackEvent('podcast_play', { podcast_name: pod.name, episode_title: ep.title });
  }

  togglePlayPause() {
    if (!this.currentTrack) {
      // Se não há faixa, toca a primeira rádio (Rádio Aparecida)
      this.playRadio('aparecida');
      return;
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  resume() {
    if (!this.audio.src && this.currentTrack) {
      this.audio.src = this.currentTrack.url;
    }
    const p = this.audio.play();
    if (p !== undefined) {
      p.catch(err => console.warn('[AudioService] Resume error:', err));
    }
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = '';
    this.currentTrack = null;
    this.isPlaying = false;
    this.isLoading = false;
    this._emitChange();
    this._updateMediaSessionState('none');
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.audio.volume = this.volume;
    try {
      localStorage.setItem('biblia_audio_volume', this.volume.toString());
    } catch (e) {
      // ignore
    }
    this._emitChange();
  }

  seek(seconds) {
    if (!this.currentTrack || this.currentTrack.isLive) return;
    this.audio.currentTime = Math.max(0, Math.min(this.audio.duration || 0, seconds));
  }

  getState() {
    return {
      currentTrack: this.currentTrack,
      isPlaying: this.isPlaying,
      isLoading: this.isLoading,
      volume: this.volume,
      currentTime: this.audio.currentTime || 0,
      duration: this.audio.duration || 0
    };
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.getState());
    return () => this.listeners.delete(callback);
  }

  _emitChange(extra = {}) {
    const state = { ...this.getState(), ...extra };
    for (const listener of this.listeners) {
      try {
        listener(state);
      } catch (e) {
        console.error('[AudioService] Listener callback error:', e);
      }
    }
  }

  // Tenta carregar episódios recentes via RSS se disponível
  async fetchLatestPodcastFeed(podcastId) {
    const pod = CATHOLIC_PODCASTS.find(p => p.id === podcastId);
    if (!pod || !pod.feedUrl) return pod ? pod.episodes : [];

    if (this.cachedEpisodes.has(podcastId)) {
      return this.cachedEpisodes.get(podcastId);
    }

    try {
      // Tenta carregar via proxy CORS aberto
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(pod.feedUrl)}`;
      const res = await fetch(proxyUrl, { cache: 'no-cache', signal: AbortSignal.timeout(6000) });
      if (res.ok) {
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');
        
        if (items && items.length > 0) {
          const parsed = [];
          const max = Math.min(items.length, 5);
          for (let i = 0; i < max; i++) {
            const item = items[i];
            const title = item.querySelector('title')?.textContent || 'Episódio';
            const enclosure = item.querySelector('enclosure');
            const audioUrl = enclosure ? enclosure.getAttribute('url') : '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const duration = item.querySelector('duration')?.textContent || 'Áudio';
            
            if (audioUrl) {
              parsed.push({
                title: title.trim(),
                author: pod.author,
                audioUrl: audioUrl.trim(),
                pubDate: pubDate ? new Date(pubDate).toLocaleDateString('pt-BR') : 'Recente',
                duration: duration.trim()
              });
            }
          }
          if (parsed.length > 0) {
            pod.episodes = parsed;
            this.cachedEpisodes.set(podcastId, parsed);
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn(`[AudioService] Erro ao atualizar RSS para ${podcastId}:`, e.message);
    }

    return pod.episodes || [];
  }
}

// Singleton global
export const audioService = new AudioStreamingService();
