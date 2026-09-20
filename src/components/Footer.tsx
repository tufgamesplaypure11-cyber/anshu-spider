import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050810] py-8 text-center text-xs font-tech text-slate-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-fun text-white text-sm">ANSHU SPIDER</span>
          <span>• Gaming, Web-Swinging &amp; Cosmic Vibes</span>
        </div>
        <div>
          Crafted with passion for interactive web gaming.
        </div>
      </div>
    </footer>
  );
};
