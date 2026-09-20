import React, { useState, useEffect, useCallback } from 'react';

export const ChronometerSection: React.FC = () => {
  const [dob, setDob] = useState<string>('2002-08-15');
  const [years, setYears] = useState<number>(24);
  const [months, setMonths] = useState<number>(289);
  const [days, setDays] = useState<number>(8802);
  const [seconds, setSeconds] = useState<number>(760518886);

  const calculateJourney = useCallback(() => {
    if (!dob) return;
    const birth = new Date(dob);
    const now = new Date();
    const diffMs = now.getTime() - birth.getTime();

    if (diffMs < 0) return;

    const totalSecs = Math.floor(diffMs / 1000);
    const totalD = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalM = Math.floor(totalD / 30.4375);
    const totalY = Math.floor(totalD / 365.25);

    setYears(totalY);
    setMonths(totalM);
    setDays(totalD);
    setSeconds(totalSecs);
  }, [dob]);

  // Initial calculation and live second ticker
  useEffect(() => {
    calculateJourney();
    const interval = setInterval(() => {
      if (!dob) return;
      const birth = new Date(dob);
      const now = new Date();
      const diffMs = now.getTime() - birth.getTime();
      if (diffMs > 0) {
        setSeconds(Math.floor(diffMs / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateJourney, dob]);

  return (
    <section className="scroll-mt-24" id="lifetimer">
      <div className="bg-gradient-to-r from-[#0c101d] via-[#101728] to-[#0c101d] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-tech uppercase tracking-widest text-spiderCyber font-bold">
            Chronos Machine
          </span>
          <h2 className="text-3xl sm:text-5xl font-fun text-white">Your Lifetime Cosmic Counter</h2>
          <p className="text-slate-400 text-sm">
            Enter your date of birth to reveal your exact live lifetime journey down to the running second.
          </p>

          {/* Input Birthday Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <label className="text-xs font-tech text-slate-300" htmlFor="user-dob">
              Choose Birth Date:
            </label>
            <input
              id="user-dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="bg-[#080d1a] border border-spiderCyber/40 text-white font-tech text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-spiderCyber"
            />
            <button
              id="btn-calc-journey"
              onClick={calculateJourney}
              className="px-6 py-2.5 rounded-xl bg-spiderCyber hover:bg-cyan-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-transform active:scale-95 shadow-lg shadow-spiderCyber/20 cursor-pointer"
            >
              Calculate Journey
            </button>
          </div>
        </div>

        {/* Big Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10">
          {/* Years */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-5 text-center relative overflow-hidden">
            <div className="text-xs font-tech uppercase text-slate-400 tracking-wider">Years Lived</div>
            <div className="font-fun text-4xl sm:text-6xl text-spiderRed mt-2" id="chrono-years">
              {years}
            </div>
            <div className="text-[11px] font-tech text-slate-500 mt-1">Orbits Around Sun</div>
          </div>

          {/* Months */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-5 text-center relative overflow-hidden">
            <div className="text-xs font-tech uppercase text-slate-400 tracking-wider">Total Months</div>
            <div className="font-fun text-4xl sm:text-6xl text-amber-400 mt-2" id="chrono-months">
              {months.toLocaleString()}
            </div>
            <div className="text-[11px] font-tech text-slate-500 mt-1">Lunar Phases</div>
          </div>

          {/* Days */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-5 text-center relative overflow-hidden">
            <div className="text-xs font-tech uppercase text-slate-400 tracking-wider">Total Days</div>
            <div className="font-fun text-4xl sm:text-6xl text-emerald-400 mt-2" id="chrono-days">
              {days.toLocaleString()}
            </div>
            <div className="text-[11px] font-tech text-slate-500 mt-1">Sunrises Experienced</div>
          </div>

          {/* Live Seconds */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-5 text-center relative overflow-hidden">
            <div className="text-xs font-tech uppercase text-slate-400 tracking-wider">Live Seconds</div>
            <div className="font-fun text-3xl sm:text-5xl text-spiderCyber mt-2 truncate" id="chrono-seconds">
              {seconds.toLocaleString()}
            </div>
            <div className="text-[11px] font-tech text-cyan-400/80 mt-1 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" /> Ticking Live
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
