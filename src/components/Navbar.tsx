import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070a12]/80 border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-spiderRed to-spiderBlue flex items-center justify-center shadow-lg shadow-spiderRed/30">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
        <span className="font-fun text-xl tracking-wider text-white">
          ANSHU<span className="text-spiderRed">SPIDER</span>
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8 font-tech text-sm tracking-wide text-slate-300">
        <a className="hover:text-spiderRed transition-colors" href="#games">Games &amp; Vote</a>
        <a className="hover:text-spiderCyber transition-colors" href="#minigame">Spider Swing 2D</a>
        <a className="hover:text-amber-400 transition-colors" href="#music">Vinyl Gramophone</a>
        <a className="hover:text-emerald-400 transition-colors" href="#reminders">Live Stripes</a>
        <a className="hover:text-purple-400 transition-colors" href="#lifetimer">Chronograph</a>
      </nav>

      <div>
        <a
          id="btn-nav-buy-coffee"
          className="px-5 py-2.5 rounded-full font-tech font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-spiderRed via-pink-600 to-amber-500 text-white shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
          href="#coffee"
        >
          <span>Buy Me a Coffee</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
};
