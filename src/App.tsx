/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GameVotingSection } from './components/GameVotingSection';
import { SpiderSwingGame } from './components/SpiderSwingGame';
import { GramophoneSection } from './components/GramophoneSection';
import { LiveStripesSection } from './components/LiveStripesSection';
import { ChronometerSection } from './components/ChronometerSection';
import { BuyCoffeeSection } from './components/BuyCoffeeSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative bg-[#070a12] text-slate-100 font-sans selection:bg-spiderRed selection:text-white antialiased overflow-x-hidden min-h-screen">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-spiderRed/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-spiderBlue/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-28">
        {/* SECTION 1: Top Kinetic Typography Hero */}
        <HeroSection />

        {/* SECTION 2: Community Game Voting */}
        <GameVotingSection />

        {/* SECTION 3: Spider Rooftop Swing 2D Arcade Game */}
        <SpiderSwingGame />

        {/* SECTION 4: Spinning Vinyl Gramophone & 7-Track Vault */}
        <GramophoneSection />

        {/* SECTION 5: Live Moment Stripes (4 Columns) with Interactive Modal */}
        <LiveStripesSection />

        {/* SECTION 6: Cosmic Lifetime Chronometer */}
        <ChronometerSection />

        {/* SECTION 7: Buy Me A Coffee (UPI & QR) */}
        <BuyCoffeeSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
