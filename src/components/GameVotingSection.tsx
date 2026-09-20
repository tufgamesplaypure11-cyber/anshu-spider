import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { GameVoteData } from '../types';

export const GameVotingSection: React.FC = () => {
  const [votes, setVotes] = useState<GameVoteData>({
    bgmi: 1868,
    ff: 1245,
    mc: 779,
  });

  const totalVotes = votes.bgmi + votes.ff + votes.mc;
  const pctBgmi = Math.round((votes.bgmi / totalVotes) * 100);
  const pctFf = Math.round((votes.ff / totalVotes) * 100);
  const pctMc = 100 - pctBgmi - pctFf;

  const handleVote = (gameKey: keyof GameVoteData) => {
    setVotes((prev) => ({
      ...prev,
      [gameKey]: prev[gameKey] + 1,
    }));
  };

  return (
    <section className="scroll-mt-24" id="games">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-tech uppercase tracking-widest text-spiderRed font-bold">Community Arena</span>
          <h2 className="text-3xl sm:text-4xl font-fun text-white mt-1">Vote Your Favourite Game</h2>
          <p className="text-slate-400 text-sm mt-1">
            Cast your live vote! The leaderboard rescales and highlights the champion dynamically.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#111726] px-4 py-2 rounded-xl border border-white/10 text-xs font-tech">
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Total Votes:
          </span>
          <span className="font-bold text-white text-sm" id="total-vote-counter">
            {totalVotes.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 3 Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Game 1: BGMI */}
        <div className="group relative bg-[#0e1424] rounded-3xl p-4 border border-white/10 hover:border-spiderRed/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-spiderRed/20 flex flex-col justify-between">
          <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-slate-900 mb-4">
            <img
              alt="Battlegrounds Mobile India"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArCzXpCrfM7aU28Z_s3lPJ5ODAWiKW1ai4GuLbbY6QMGlJ2gZOye0POAKBq87ixfFYdNQbhPaFhGG2vh_aeA63GDb_jfW1dD4--DtuIN7rBdj3iAHbuMRreFbBSSTi6-C2MP83KpNJC2EDIpn0BFOz3SzrcNSzf1DPgoe21ZKtej6JbLMiySJlLEsoHVF-gj2dp8H926d_utg8ukNoiBjQGfc9zOJEWyrof7XEG4fpE1RTCA7Mq301K4QJDRj7Fjx-hQ"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-tech font-bold text-white border border-white/10">
              #1 Battle Royale
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1424] via-transparent to-transparent opacity-80" />
          </div>
          <div className="space-y-3 px-2">
            <div className="flex items-center justify-between">
              <h3 className="font-tech text-xl font-bold text-white group-hover:text-spiderRed transition-colors">
                BGMI
              </h3>
              <span
                className="text-xs font-bold font-tech text-spiderRed px-2 py-0.5 rounded bg-spiderRed/10 border border-spiderRed/30"
                id="pct-bgmi"
              >
                {pctBgmi}%
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Battlegrounds Mobile India – tactical survival, squads, air drops, and chicken dinners.
            </p>
            {/* Progress Bar */}
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-spiderRed to-orange-500 h-full rounded-full transition-all duration-500"
                id="bar-bgmi"
                style={{ width: `${pctBgmi}%` }}
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-tech" id="count-bgmi">
                {votes.bgmi.toLocaleString()} votes
              </span>
              <button
                id="btn-vote-bgmi"
                className="px-5 py-2 rounded-xl bg-spiderRed hover:bg-spiderRed/80 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-spiderRed/30 flex items-center gap-1.5 cursor-pointer"
                onClick={() => handleVote('bgmi')}
              >
                <span>Vote</span>
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Game 2: Free Fire */}
        <div className="group relative bg-[#0e1424] rounded-3xl p-4 border border-white/10 hover:border-spiderCyber/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-spiderCyber/20 flex flex-col justify-between">
          <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-slate-900 mb-4">
            <img
              alt="Free Fire"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMpG_bGTE7csC2vY2EQIyG_TvVMSxIoxU445SVqUBwJjrTsWoar1fY2x_ntFfZwrG_fNSX13jo2AJo2EY2KGbJbnd1Vgk2Akgz03R4bBv9lqEAUyw2ijU_yyFkHzlixvUp4fLk4kjUNclA9viNAXiFyztNU3crUeDCiY9q0kEU9Be7fHI58dTCG4pnWRMi4H1vm_bZh4TJlAKFSJfS-oI9N5lPhW0PQHyd1i_DH96mdSmNa1zFOMjSskVl3rz6Wm7pWw"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-tech font-bold text-white border border-white/10">
              #2 Fast Pace
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1424] via-transparent to-transparent opacity-80" />
          </div>
          <div className="space-y-3 px-2">
            <div className="flex items-center justify-between">
              <h3 className="font-tech text-xl font-bold text-white group-hover:text-spiderCyber transition-colors">
                Free Fire
              </h3>
              <span
                className="text-xs font-bold font-tech text-spiderCyber px-2 py-0.5 rounded bg-spiderCyber/10 border border-spiderCyber/30"
                id="pct-ff"
              >
                {pctFf}%
              </span>
            </div>
            <p className="text-xs text-slate-400">
              High-speed survival battle royale with futuristic characters, pets, and rapid 10-minute skirmishes.
            </p>
            {/* Progress Bar */}
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-spiderCyber to-blue-500 h-full rounded-full transition-all duration-500"
                id="bar-ff"
                style={{ width: `${pctFf}%` }}
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-tech" id="count-ff">
                {votes.ff.toLocaleString()} votes
              </span>
              <button
                id="btn-vote-ff"
                className="px-5 py-2 rounded-xl bg-spiderCyber hover:bg-cyan-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-spiderCyber/30 flex items-center gap-1.5 cursor-pointer"
                onClick={() => handleVote('ff')}
              >
                <span>Vote</span>
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Game 3: Minecraft */}
        <div className="group relative bg-[#0e1424] rounded-3xl p-4 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 flex flex-col justify-between">
          <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-slate-900 mb-4">
            <img
              alt="Minecraft"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO1KBmf-kvKywchA87aru0f1AiTjdCc7k_IaujcY1_3CEBixQ0ppFxL_3AY9cxtVjBtmzpu0LE48w1AEqBArHudhIhWdsoKlyhdalVI6LJ129XZhxV9S79tYKKrbnDVf1qOidPNOiFnbDWwD79zlVkCildvmyA-wH9oXG9w8fpWWSv5sjXn2PNjOhfJxGBytwwS7hDL3wHmFvA9UI2PUHGSHNm4wi2Q5HvLxXz35LPAhUWqBDLFTzI2NSKW--2-DIajA"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-tech font-bold text-white border border-white/10">
              #3 Sandbox &amp; Build
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1424] via-transparent to-transparent opacity-80" />
          </div>
          <div className="space-y-3 px-2">
            <div className="flex items-center justify-between">
              <h3 className="font-tech text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                Minecraft
              </h3>
              <span
                className="text-xs font-bold font-tech text-emerald-400 px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/30"
                id="pct-mc"
              >
                {pctMc}%
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Endless sandbox creativity, mining, crafting, survival against Creepers, and infinite block worlds.
            </p>
            {/* Progress Bar */}
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-green-300 h-full rounded-full transition-all duration-500"
                id="bar-mc"
                style={{ width: `${pctMc}%` }}
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-tech" id="count-mc">
                {votes.mc.toLocaleString()} votes
              </span>
              <button
                id="btn-vote-mc"
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 cursor-pointer"
                onClick={() => handleVote('mc')}
              >
                <span>Vote</span>
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
