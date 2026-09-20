import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Trash2, Plus, Music2 } from 'lucide-react';
import { Track } from '../types';

export const GramophoneSection: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: 1,
      title: 'Spider-Verse Electrified',
      link: 'https://open.spotify.com/track/3KkXRQHbMCARz0aVfEt68P',
      type: 'Spotify Link',
    },
    {
      id: 2,
      title: 'Cyber Rooftop Battle Anthem',
      link: 'file://music/bgmi_drop_zone.mp3',
      type: 'Local File',
    },
    {
      id: 3,
      title: 'Minecraft Calm Moonlight',
      link: 'https://open.spotify.com/track/sweden-c418',
      type: 'Spotify Link',
    },
  ]);

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newLink, setNewLink] = useState<string>('');
  const [addError, setAddError] = useState<string>('');
  const [spotifyEmbedUrl, setSpotifyEmbedUrl] = useState<string>(
    'https://open.spotify.com/embed/track/3KkXRQHbMCARz0aVfEt68P?utm_source=generator&theme=0'
  );
  const [spotifyInput, setSpotifyInput] = useState<string>(
    'https://open.spotify.com/track/3KkXRQHbMCARz0aVfEt68P'
  );

  const parseSpotifyEmbedUrl = (rawUrl: string): string | null => {
    const trimmed = rawUrl.trim();
    if (!trimmed) return null;
    const match = trimmed.match(
      /spotify\.com\/(track|playlist|album|artist|episode|show)\/([a-zA-Z0-9]+)/
    );
    if (match) {
      return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
    }
    if (trimmed.includes('/embed/')) {
      return trimmed;
    }
    return null;
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleStepMusic = (dir: number) => {
    if (tracks.length === 0) return;
    const nextIdx = (currentTrackIndex + dir + tracks.length) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    const track = tracks[nextIdx];
    if (track && track.link.includes('spotify.com')) {
      const embed = parseSpotifyEmbedUrl(track.link);
      if (embed) setSpotifyEmbedUrl(embed);
    }
  };

  const handleSelectTrack = (idx: number) => {
    setCurrentTrackIndex(idx);
    const track = tracks[idx];
    if (track && track.link.includes('spotify.com')) {
      const embed = parseSpotifyEmbedUrl(track.link);
      if (embed) setSpotifyEmbedUrl(embed);
    }
    setIsPlaying(true);
  };

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (tracks.length >= 7) {
      setAddError('Vault full: Only 7 track slots permitted.');
      return;
    }
    setAddError('');

    const title = newTitle.trim() || `Cosmic Track 0${tracks.length + 1}`;
    const link = newLink.trim() || 'https://open.spotify.com/track/anshu-vibe';
    const type = link.startsWith('http') ? 'Spotify Link' : 'Local File';

    const newTrackItem: Track = {
      id: Date.now(),
      title,
      link,
      type,
    };

    setTracks((prev) => [...prev, newTrackItem]);
    setNewTitle('');
    setNewLink('');

    if (link.includes('spotify.com')) {
      const embed = parseSpotifyEmbedUrl(link);
      if (embed) setSpotifyEmbedUrl(embed);
    }
  };

  const handleRemoveTrack = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTracks((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      if (currentTrackIndex >= updated.length) {
        setCurrentTrackIndex(Math.max(0, updated.length - 1));
      }
      return updated;
    });
    setAddError('');
  };

  const handlePlaySpotifyDirect = () => {
    const embed = parseSpotifyEmbedUrl(spotifyInput);
    if (embed) {
      setSpotifyEmbedUrl(embed);
      setIsPlaying(true);
    }
  };

  const handlePreset = (url: string, title: string) => {
    setSpotifyInput(url);
    const embed = parseSpotifyEmbedUrl(url);
    if (embed) {
      setSpotifyEmbedUrl(embed);
      setIsPlaying(true);
    }
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <section className="scroll-mt-24" id="music">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/10 pb-6 gap-4">
        <div>
          <span className="text-xs font-tech uppercase tracking-widest text-amber-400 font-bold">
            Audio Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-fun text-white mt-1">
            Spinning Gramophone &amp; 7-Track Vault
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Add your favorite Spotify or file links. Exactly 7 curated slots to craft your ultimate theme.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#111726] px-4 py-2 rounded-xl border border-white/10 text-xs font-tech">
          <span className="text-amber-400 font-bold">Active Slots:</span>
          <span className="font-bold text-white text-sm" id="slot-counter">
            {tracks.length} / 7
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gramophone Interactive Visual (Left Column) */}
        <div className="lg:col-span-5 bg-[#0e1424] border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* 2D Gramophone Unit */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-4">
            {/* Vinyl Record */}
            <div
              className={`relative w-56 h-56 rounded-full bg-[#111] border-4 border-amber-900/40 shadow-2xl flex items-center justify-center vinyl-spinning ${
                isPlaying ? '' : 'vinyl-paused'
              }`}
              id="gramo-vinyl"
            >
              {/* Grooves */}
              <div className="absolute inset-3 rounded-full border border-neutral-800 pointer-events-none" />
              <div className="absolute inset-7 rounded-full border border-neutral-800 pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-neutral-800 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-neutral-800 pointer-events-none" />

              {/* Vinyl Center Label */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-spiderRed p-1 shadow-inner flex flex-col items-center justify-center text-center select-none">
                <div className="w-4 h-4 rounded-full bg-black mb-1" />
                <span className="text-[9px] font-fun text-white leading-none">ANSHU</span>
                <span className="text-[7px] font-tech text-slate-200">VINYL</span>
              </div>
            </div>

            {/* Gramophone Brass Horn Illustration Overlay */}
            <div className="absolute -top-6 -right-2 pointer-events-none">
              <svg
                className="w-32 h-32 drop-shadow-[0_10px_20px_rgba(255,170,0,0.3)]"
                fill="none"
                viewBox="0 0 120 120"
              >
                <path
                  d="M75 90 C 85 90, 95 75, 95 55 C 95 30, 80 15, 60 15 C 35 15, 10 35, 10 65 C 10 90, 30 105, 55 105 Z"
                  fill="url(#brassGrad)"
                  opacity="0.9"
                />
                <ellipse cx="60" cy="50" fill="#ffd166" opacity="0.7" rx="35" ry="25" />
                <path d="M75 90 L85 105 L95 105" stroke="#b45309" strokeLinecap="round" strokeWidth="4" />
                <defs>
                  <linearGradient id="brassGrad" x1="0" x2="120" y1="0" y2="120" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f59e0b" />
                    <stop offset="0.5" stopColor="#fbbf24" />
                    <stop offset="1" stopColor="#d97706" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Tonearm */}
            <div
              className={`absolute top-4 right-8 w-28 h-2 bg-gradient-to-r from-amber-300 to-amber-700 origin-top-right rounded-full shadow-md pointer-events-none transition-transform duration-700 ${
                isPlaying ? 'rotate-[28deg]' : 'rotate-12'
              }`}
              id="tonearm"
            >
              <div className="w-4 h-4 bg-amber-400 rounded-full -top-1 -right-1 absolute" />
              <div className="w-4 h-3 bg-neutral-900 rounded -bottom-1 -left-1 absolute" />
            </div>
          </div>

          {/* Currently Playing Display */}
          <div className="w-full text-center space-y-1 mt-2">
            <div className="text-[10px] font-tech uppercase tracking-widest text-slate-400">
              Now spinning
            </div>
            <div className="font-tech text-base font-bold text-white truncate px-4" id="current-track-title">
              {currentTrack ? currentTrack.title : 'No track selected'}
            </div>
            <div className="text-xs text-amber-400 font-tech truncate px-4" id="current-track-source">
              {currentTrack ? `${currentTrack.link} (${currentTrack.type})` : 'Add a slot'}
            </div>
          </div>

          {/* Gramophone Controls */}
          <div className="flex items-center gap-4 mt-5">
            <button
              id="btn-prev-music"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
              onClick={() => handleStepMusic(-1)}
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="gramo-toggle-btn"
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95 cursor-pointer"
              onClick={handleTogglePlay}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span id="gramo-btn-label">{isPlaying ? 'Pause Vinyl' : 'Spin Vinyl'}</span>
            </button>
            <button
              id="btn-next-music"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
              onClick={() => handleStepMusic(1)}
              title="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 7-Track Section & Add Form (Right Column) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Add to Playlist Form */}
          <div className="bg-[#0e1424] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Music2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-tech text-base font-bold text-white">Add to Playlist</h3>
              </div>
              <span className="text-xs font-tech text-slate-400">Only 7 slots permitted</span>
            </div>

            <form onSubmit={handleAddTrack} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <input
                  type="text"
                  placeholder="Track Title (e.g., Believe)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="sm:col-span-5 bg-[#090d16] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <input
                  type="text"
                  placeholder="Spotify URL or file link (file://...)"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  className="sm:col-span-5 bg-[#090d16] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={tracks.length >= 7}
                  id="btn-add-track-slot"
                  className="sm:col-span-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
              {addError && <p className="text-xs text-red-400 font-tech">{addError}</p>}
            </form>

            {/* Track Slots List */}
            <div className="space-y-2 pt-2" id="playlist-container">
              {tracks.map((track, idx) => {
                const isSelected = idx === currentTrackIndex;
                return (
                  <div
                    key={track.id}
                    onClick={() => handleSelectTrack(idx)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/40 text-white'
                        : 'bg-[#0b101c] border-white/5 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-tech text-xs font-bold shrink-0 ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                            : 'bg-white/10 text-slate-400'
                        }`}
                      >
                        0{idx + 1}
                      </div>
                      <div className="truncate">
                        <div
                          className={`font-tech text-xs sm:text-sm font-bold truncate ${
                            isSelected ? 'text-amber-300' : 'text-white'
                          }`}
                        >
                          {track.title}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate font-sans">
                          {track.link} ({track.type})
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-2">
                      {isSelected && isPlaying && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                        </span>
                      )}
                      <button
                        onClick={(e) => handleRemoveTrack(idx, e)}
                        className="p-1.5 hover:text-red-400 text-slate-500 transition-colors cursor-pointer"
                        title="Delete slot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Spotify Player Embed */}
          <div className="bg-[#0e1424] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#1DB954]/20 border border-[#1DB954]/40 flex items-center justify-center text-[#1DB954]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.625.625 0 01-.278-1.218c3.81-.871 7.076-.495 9.713 1.118a.624.624 0 01.207.857zm1.226-2.723a.78.78 0 01-1.074.257c-2.688-1.652-6.785-2.131-9.965-1.166a.782.782 0 01-.452-1.498c3.632-1.103 8.147-.568 11.234 1.333a.78.78 0 01.257 1.074zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.546-1.793c3.528-1.071 9.409-.865 13.142 1.352a.938.938 0 01-.976 1.604z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-tech text-base font-bold text-white">Instant Spotify Player</h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Paste any Spotify link (track, playlist, or album) to play directly in browser.
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-tech text-[10px] font-bold uppercase tracking-wider">
                Live Embed
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    id="spotify-direct-url"
                    type="text"
                    value={spotifyInput}
                    onChange={(e) => setSpotifyInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePlaySpotifyDirect()}
                    placeholder="Paste Spotify link (e.g. https://open.spotify.com/track/3KkXRQHbMCARz0aVfEt68P)"
                    className="w-full bg-[#090d16] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1DB954] pr-8"
                  />
                  {spotifyInput && (
                    <button
                      type="button"
                      onClick={() => setSpotifyInput('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                      title="Clear"
                    >
                      ×
                    </button>
                  )}
                </div>
                <button
                  id="btn-play-spotify"
                  onClick={handlePlaySpotifyDirect}
                  className="px-5 py-2.5 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Play Now</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-tech uppercase text-slate-500 tracking-wider mr-1">
                  Quick Presets:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handlePreset(
                      'https://open.spotify.com/track/3KkXRQHbMCARz0aVfEt68P',
                      'Sunflower (Spider-Verse Remix)'
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400 text-[11px] font-tech text-amber-300 transition-colors cursor-pointer"
                >
                  Sunflower (Spider-Verse)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handlePreset('https://open.spotify.com/track/7MXVkk9YM5IZxh0WSlVI1q', 'Starboy - The Weeknd')
                  }
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400 text-[11px] font-tech text-purple-300 transition-colors cursor-pointer"
                >
                  Starboy (The Weeknd)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handlePreset('https://open.spotify.com/track/1eyzqe2QqGZUmfcPZtrIyt', 'Midnight City - M83')
                  }
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400 text-[11px] font-tech text-cyan-300 transition-colors cursor-pointer"
                >
                  Midnight City (M83)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handlePreset(
                      'https://open.spotify.com/track/1bDbXMyjaUIooNwFE9J0aw',
                      'Calling - Metro Boomin (Spider-Man)'
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-spiderRed text-[11px] font-tech text-spiderRed transition-colors cursor-pointer"
                >
                  Calling (Metro Boomin)
                </button>
              </div>
            </div>

            {/* Embedded Spotify iFrame */}
            <div className="pt-2">
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-inner">
                <iframe
                  id="spotify-embed-iframe"
                  style={{ borderRadius: '12px' }}
                  src={spotifyEmbedUrl}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Player"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
