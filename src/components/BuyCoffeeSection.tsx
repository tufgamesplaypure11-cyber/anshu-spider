import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const BuyCoffeeSection: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const upiId = 'anshuspider@upi';

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    });
  };

  return (
    <section className="scroll-mt-24 pb-12" id="coffee">
      <div className="bg-gradient-to-tr from-[#1b1016] via-[#120a1c] to-[#0e1424] border-2 border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-tech text-xs uppercase font-bold">
              ☕ Creator Support
            </div>
            <h2 className="font-fun text-4xl sm:text-5xl text-white">Buy Me a Coffee</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Enjoying the games, Spider-Man 2D swing simulator, and vinyl vibes? Support Anshu Spider to fuel more game mods, server hosting, and high-adrenaline creative projects!
            </p>

            {/* UPI Container Box */}
            <div className="bg-black/60 border border-white/15 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="text-xs font-tech text-slate-400 uppercase tracking-wider">Direct UPI ID / VPA:</div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full bg-[#080d18] border border-amber-500/40 px-4 py-3 rounded-xl font-tech text-amber-300 text-sm sm:text-base font-bold flex items-center justify-between">
                  <span id="upi-id-text">{upiId}</span>
                  <span className="text-[11px] text-emerald-400 font-normal">Verified Creator</span>
                </div>
                <button
                  id="btn-copy-upi"
                  onClick={copyUPI}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span id="copy-btn-text">{copied ? 'Copied! ✓' : 'Copy UPI'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 font-tech">
                Accepted on Google Pay, PhonePe, Paytm, BHIM &amp; all major banking apps.
              </p>
            </div>
          </div>

          {/* QR Simulation Card */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-5 rounded-3xl shadow-2xl border-4 border-amber-500/40 relative group">
              {/* 2D SVG QR Code */}
              <svg className="w-48 h-48 sm:w-52 sm:h-52 text-slate-950" fill="currentColor" viewBox="0 0 100 100">
                {/* Outer Markers */}
                <rect fill="black" height="26" rx="3" width="26" x="5" y="5" />
                <rect fill="white" height="18" rx="2" width="18" x="9" y="9" />
                <rect fill="black" height="10" width="10" x="13" y="13" />

                <rect fill="black" height="26" rx="3" width="26" x="69" y="5" />
                <rect fill="white" height="18" rx="2" width="18" x="73" y="9" />
                <rect fill="black" height="10" width="10" x="77" y="13" />

                <rect fill="black" height="26" rx="3" width="26" x="5" y="69" />
                <rect fill="white" height="18" rx="2" width="18" x="9" y="73" />
                <rect fill="black" height="10" width="10" x="13" y="77" />

                {/* QR Grid Noise */}
                <rect height="6" width="6" x="36" y="8" />
                <rect height="5" width="8" x="46" y="14" />
                <rect height="12" width="5" x="58" y="8" />
                <rect height="6" width="14" x="36" y="24" />
                <rect height="6" width="12" x="8" y="36" />
                <rect height="12" width="6" x="24" y="42" />
                <rect fill="#ff2a5f" height="28" rx="4" width="28" x="36" y="36" />

                {/* Spider Logo Center in QR */}
                <circle cx="50" cy="50" fill="white" r="10" />
                <circle cx="50" cy="50" fill="#ff2a5f" r="6" />

                <rect height="8" width="10" x="68" y="36" />
                <rect height="6" width="10" x="82" y="48" />
                <rect height="6" width="8" x="68" y="58" />
                <rect height="12" width="8" x="36" y="68" />
                <rect height="6" width="16" x="48" y="78" />
                <rect height="12" width="8" x="68" y="74" />
                <rect height="8" width="12" x="80" y="70" />
              </svg>
              <div className="mt-2 text-slate-800 font-tech font-bold text-xs uppercase tracking-wider">
                Scan with any UPI App
              </div>
            </div>
            <div className="mt-4 text-xs font-tech text-amber-400">
              ⚡ Instant settlement • 100% Creator Fund
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
