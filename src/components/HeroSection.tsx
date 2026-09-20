import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="text-center pt-8 pb-4 relative">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-spiderRed/40 bg-spiderRed/10 text-spiderRed text-xs font-tech font-bold tracking-widest uppercase mb-6 shadow-inner">
        <span className="w-2 h-2 rounded-full bg-spiderRed animate-ping" />
        Interactive Gaming &amp; Creative Realm
      </div>

      {/* Kinetic Video-style Typography */}
      <div className="relative py-6">
        <h1 className="font-fun text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none animate-text-video uppercase select-none">
          ANSHU SPIDER
        </h1>
        <div className="absolute -top-4 -right-2 sm:right-16 md:right-32 font-marker text-spiderCyber text-lg sm:text-2xl transform rotate-12 float-anim drop-shadow-[0_2px_10px_rgba(0,242,254,0.6)]">
          ★ Play &amp; Swing!
        </div>
      </div>

      <p className="max-w-2xl mx-auto mt-4 text-slate-400 text-sm sm:text-base font-sans">
        Step into the high-octane gaming arena. Vote for your top battle titles, swing across skyscrapers in real-time, spin your custom 7-track vinyl, and track your life's cosmic timeline.
      </p>
    </section>
  );
};
