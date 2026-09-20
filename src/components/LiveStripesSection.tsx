import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus } from 'lucide-react';
import { StripeKey, StripeItem, StripeModalConfig } from '../types';

const natureQuotes = [
  'Morning rain dew across pine hills. Take 5 deep breaths now.',
  'Green leaf energy surrounds you. Unplug for a 2-minute stroll.',
  'Sunlight filtering through the mountain canopy. Stand tall.',
];
const musicQuotes = [
  '80 BPM Lo-Fi stream running. Plug in your soundstage.',
  'Bass reverb echoing in headphones. Let the rhythm reset your focus.',
  'Synthwave arpeggios spinning. Drop into the creative flow state.',
];
const foodQuotes = [
  'Time to hydrate and grab a hot meal. Fuel your engine!',
  'Crisp apples, warm broth, or herbal tea. Refresh your palate.',
  'Energy dips require smart fuel. Grab a bite and keep swinging.',
];
const chillsQuotes = [
  'Take off the cape. Stargaze and unwind your thoughts.',
  'Cold gentle wind beneath city lights. Zero hurry, zero stress.',
  'Breathe in the midnight calm. Tomorrow has fresh adventures.',
];

const modalConfigs: Record<StripeKey, StripeModalConfig> = {
  nature: {
    badge: 'Stripe 01 • Nature',
    badgeClass: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
    cardBorder: 'border-emerald-500/50 shadow-emerald-500/20',
    title: 'Add Your Dream Destination / Nature Spot',
    subtitle: 'Share the mountains, valleys, and wild sanctuaries on your bucket list.',
    input1Label: 'Destination Name',
    input1Placeholder: 'e.g. Manali Snow Peaks, Swiss Alps, Kedarnath',
    input2Label: 'Location / Vibe Notes',
    input2Placeholder: 'e.g. Frozen river trek, pine forest breeze, stargazing camp',
    btnLabel: 'Add Spot',
    btnClass: 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-500/30',
    itemPillClass: 'bg-emerald-950/70 border-emerald-500/30 text-emerald-300',
  },
  music: {
    badge: 'Stripe 02 • Music',
    badgeClass: 'bg-purple-500/20 text-purple-400 border border-purple-500/40',
    cardBorder: 'border-purple-500/50 shadow-purple-500/20',
    title: 'Add Your Top Anthem / Favorite Music',
    subtitle: 'Drop your favorite high-voltage soundtrack or chill headphone groove.',
    input1Label: 'Song Title',
    input1Placeholder: 'e.g. After Hours, Interstellar Theme, Nightcall',
    input2Label: 'Artist / Vibe',
    input2Placeholder: 'e.g. Synthwave bassline, dark synth, 3 AM late night drive',
    btnLabel: 'Add Track',
    btnClass: 'bg-purple-400 hover:bg-purple-300 text-slate-950 shadow-purple-500/30',
    itemPillClass: 'bg-purple-950/70 border-purple-500/30 text-purple-300',
  },
  food: {
    badge: 'Stripe 03 • Food',
    badgeClass: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
    cardBorder: 'border-amber-500/50 shadow-amber-500/20',
    title: 'Add Your Ultimate Comfort Food',
    subtitle: 'What is your go-to delicious treat or refueling gaming meal?',
    input1Label: 'Dish Name',
    input1Placeholder: 'e.g. Butter Chicken with Naan, Spicy Momos, Ramen Bowl',
    input2Label: 'Why You Love It / Craving',
    input2Placeholder: 'e.g. Extra spicy red chutney, molten cheese burst comfort',
    btnLabel: 'Add Food',
    btnClass: 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/30',
    itemPillClass: 'bg-amber-950/70 border-amber-500/30 text-amber-300',
  },
  chills: {
    badge: 'Stripe 04 • Chills',
    badgeClass: 'bg-spiderCyber/20 text-spiderCyber border border-spiderCyber/40',
    cardBorder: 'border-spiderCyber/50 shadow-spiderCyber/20',
    title: 'Add Your Chill Hobby / Relax Routine',
    subtitle: 'Tell us how you recharge your soul when taking off the superhero mask.',
    input1Label: 'Hobby / Activity Name',
    input1Placeholder: 'e.g. Midnight Rooftop Stargazing, Acoustic Guitar Sessions',
    input2Label: 'Chill Notes / Ritual',
    input2Placeholder: 'e.g. Rain patter against windows, cozy ambient lighting',
    btnLabel: 'Add Hobby',
    btnClass: 'bg-spiderCyber hover:bg-cyan-300 text-slate-950 shadow-spiderCyber/30',
    itemPillClass: 'bg-cyan-950/70 border-spiderCyber/30 text-cyan-300',
  },
};

export const LiveStripesSection: React.FC = () => {
  const [store, setStore] = useState<Record<StripeKey, StripeItem[]>>({
    nature: [
      { name: 'Manali Snow Peaks', note: 'Winter snow trek & campfire solace' },
      { name: 'Swiss Alps', note: 'Crisp glacial breeze & panoramic pine meadows' },
      { name: 'Kedarnath Sanctuary', note: 'Sacred Himalayan mist & starlit temple valley' },
    ],
    music: [
      { name: 'Starboy Synth Anthem', note: 'The Weeknd • Neon midnight driving vibes' },
      { name: 'Sweden - C418', note: 'Minecraft nostalgic piano echoes' },
      { name: 'Sunflower', note: 'Post Malone & Swae Lee • Spider-Verse swing flow' },
    ],
    food: [
      { name: 'Tokyo Tonkotsu Ramen', note: 'Rich smoky broth with soft-boiled ajitsuke egg' },
      { name: 'Ginger Masala Chai & Samosa', note: 'Crispy rain snack for energy boost' },
      { name: 'Crispy Loaded Cheesy Pizza', note: 'Late-night co-op battle royale feast' },
    ],
    chills: [
      { name: 'Midnight City Stargazing', note: 'Lying back with warm blanket under open sky' },
      { name: 'Lofi Beats & Freehand Sketching', note: 'Zero screen pressure, just pencil strokes' },
      { name: 'Rainy Afternoon Gaming', note: 'Exploring vast open-world maps with cup of coffee' },
    ],
  });

  const [tick, setTick] = useState<number>(0);
  const [activeModal, setActiveModal] = useState<StripeKey | null>(null);
  const [modalInput1, setModalInput1] = useState<string>('');
  const [modalInput2, setModalInput2] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const openModal = (category: StripeKey) => {
    setActiveModal(category);
    setModalInput1('');
    setModalInput2('');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModal || !modalInput1.trim()) return;

    const newItem: StripeItem = {
      name: modalInput1.trim(),
      note: modalInput2.trim() || 'Community favorite vibe',
    };

    setStore((prev) => ({
      ...prev,
      [activeModal]: [...prev[activeModal], newItem],
    }));

    closeModal();
  };

  const handleDeleteItem = (cat: StripeKey, idx: number) => {
    setStore((prev) => ({
      ...prev,
      [cat]: prev[cat].filter((_, i) => i !== idx),
    }));
  };

  const natureMsg = natureQuotes[tick % natureQuotes.length];
  const musicMsg = musicQuotes[tick % musicQuotes.length];
  const foodMsg = foodQuotes[tick % foodQuotes.length];
  const chillsMsg = chillsQuotes[tick % chillsQuotes.length];

  const currentConfig = activeModal ? modalConfigs[activeModal] : null;
  const currentModalItems = activeModal ? store[activeModal] : [];

  return (
    <section className="scroll-mt-24" id="reminders">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/10 pb-6 gap-4">
        <div>
          <span className="text-xs font-tech uppercase tracking-widest text-emerald-400 font-bold">
            Vibe Streams
          </span>
          <h2 className="text-3xl sm:text-4xl font-fun text-white mt-1">Live Moment Stripes</h2>
          <p className="text-slate-400 text-sm mt-1">
            Four dynamic interactive columns: Nature, Music, Food, and Chills. Tap any card or hit{' '}
            <span className="text-emerald-400 font-semibold">+ Add Yours</span> to share your vibes!
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-tech text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Live Broadcast Moments
        </div>
      </div>

      {/* 4 Vertical Stripes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 min-h-[520px]">
        {/* Stripe 1: NATURE */}
        <div
          onClick={() => openModal('nature')}
          className="group relative rounded-3xl bg-gradient-to-b from-emerald-950/40 via-[#071311] to-[#040908] border border-emerald-500/30 hover:border-emerald-400 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/25 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-emerald-400 text-[10px] font-tech uppercase tracking-widest font-bold">
                Stripe 01
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal('nature');
                }}
                className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 hover:bg-emerald-400 hover:text-slate-950 text-emerald-300 font-tech font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <span>+ Add Yours</span>
              </button>
            </div>
            <h3 className="font-fun text-4xl lg:text-5xl text-emerald-400 tracking-wider mb-1">NATURE</h3>
            <p className="text-xs text-emerald-200/60 font-sans">
              Breathe the wild mist. Forests, peaks, and pure green harmony.
            </p>
          </div>

          {/* Nature Illustration (SVG) */}
          <div className="my-4 flex justify-center group-hover:scale-110 transition-transform duration-500">
            <svg className="w-32 h-32 drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]" fill="none" viewBox="0 0 100 100">
              <polygon fill="#059669" points="50,15 20,70 80,70" />
              <polygon fill="#10b981" points="50,15 20,70 50,70" />
              <polygon fill="#047857" points="65,35 40,80 90,80" />
              <polygon fill="#065f46" points="35,38 15,82 55,82" />
              <circle cx="20" cy="25" fill="#34d399" opacity="0.6" r="7" />
              <path d="M0 90 Q 50 82 100 90 L 100 100 L 0 100 Z" fill="#064e3b" />
            </svg>
          </div>

          {/* Dynamic User Entries & Live Ticker */}
          <div className="space-y-2">
            <div
              className="bg-emerald-950/60 border border-emerald-500/25 rounded-2xl p-2.5 text-[11px] space-y-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between text-[9px] font-tech text-emerald-400 uppercase tracking-wider font-bold">
                <span>User Spots</span>
                <span className="text-emerald-300/60 text-[9px]">{store.nature.length} spots</span>
              </div>
              <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                {store.nature.slice(-3).map((item, i) => (
                  <div
                    key={i}
                    className="p-1.5 rounded-lg border text-[10px] bg-emerald-950/40 border-emerald-500/20 flex flex-col justify-between"
                  >
                    <div className="font-tech font-bold text-emerald-400 truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <div className="text-[9px] text-slate-400 truncate pl-2.5 font-sans">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Reminder Box */}
            <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-2xl p-3 text-xs">
              <div className="text-[10px] font-tech text-emerald-300 uppercase tracking-wide">Live Moment:</div>
              <div className="text-white font-medium mt-0.5 text-xs">{natureMsg}</div>
            </div>
          </div>
        </div>

        {/* Stripe 2: MUSIC */}
        <div
          onClick={() => openModal('music')}
          className="group relative rounded-3xl bg-gradient-to-b from-purple-950/40 via-[#0f091a] to-[#08040d] border border-purple-500/30 hover:border-purple-400 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-purple-400 text-[10px] font-tech uppercase tracking-widest font-bold">
                Stripe 02
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal('music');
                }}
                className="px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/50 hover:bg-purple-400 hover:text-slate-950 text-purple-300 font-tech font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all shadow-lg shadow-purple-500/20 cursor-pointer"
              >
                <span>+ Add Yours</span>
              </button>
            </div>
            <h3 className="font-fun text-4xl lg:text-5xl text-purple-400 tracking-wider mb-1">MUSIC</h3>
            <p className="text-xs text-purple-200/60 font-sans">
              Electric frequencies, synth pulses, and midnight headphones.
            </p>
          </div>

          {/* Music Illustration (SVG) */}
          <div className="my-4 flex justify-center group-hover:scale-110 transition-transform duration-500">
            <svg className="w-32 h-32 drop-shadow-[0_8px_16px_rgba(168,85,247,0.3)]" fill="none" viewBox="0 0 100 100">
              <path d="M25 55 C 25 30, 75 30, 75 55" stroke="#c084fc" strokeLinecap="round" strokeWidth="6" />
              <rect fill="#a855f7" height="24" rx="7" width="14" x="18" y="50" />
              <rect fill="#a855f7" height="24" rx="7" width="14" x="68" y="50" />
              <circle cx="50" cy="50" fill="#7e22ce" opacity="0.4" r="12" />
              <path
                d="M42 50 L42 50 M46 45 L46 55 M50 40 L50 60 M54 45 L54 55 M58 50 L58 50"
                stroke="#f3e8ff"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Dynamic User Entries & Live Ticker */}
          <div className="space-y-2">
            <div
              className="bg-purple-950/60 border border-purple-500/25 rounded-2xl p-2.5 text-[11px] space-y-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between text-[9px] font-tech text-purple-400 uppercase tracking-wider font-bold">
                <span>User Anthems</span>
                <span className="text-purple-300/60 text-[9px]">{store.music.length} tracks</span>
              </div>
              <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                {store.music.slice(-3).map((item, i) => (
                  <div
                    key={i}
                    className="p-1.5 rounded-lg border text-[10px] bg-purple-950/40 border-purple-500/20 flex flex-col justify-between"
                  >
                    <div className="font-tech font-bold text-purple-400 truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <div className="text-[9px] text-slate-400 truncate pl-2.5 font-sans">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Reminder Box */}
            <div className="bg-purple-900/30 border border-purple-500/30 rounded-2xl p-3 text-xs">
              <div className="text-[10px] font-tech text-purple-300 uppercase tracking-wide">Live Moment:</div>
              <div className="text-white font-medium mt-0.5 text-xs">{musicMsg}</div>
            </div>
          </div>
        </div>

        {/* Stripe 3: FOOD */}
        <div
          onClick={() => openModal('food')}
          className="group relative rounded-3xl bg-gradient-to-b from-amber-950/40 via-[#180e08] to-[#0d0703] border border-amber-500/30 hover:border-amber-400 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/25 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-amber-400 text-[10px] font-tech uppercase tracking-widest font-bold">
                Stripe 03
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal('food');
                }}
                className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 hover:bg-amber-400 hover:text-slate-950 text-amber-300 font-tech font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <span>+ Add Yours</span>
              </button>
            </div>
            <h3 className="font-fun text-4xl lg:text-5xl text-amber-400 tracking-wider mb-1">FOOD</h3>
            <p className="text-xs text-amber-200/60 font-sans">
              Warm ramen, hot chai, crunchy snacks, and delicious vitality.
            </p>
          </div>

          {/* Food Illustration (SVG) */}
          <div className="my-4 flex justify-center group-hover:scale-110 transition-transform duration-500">
            <svg className="w-32 h-32 drop-shadow-[0_8px_16px_rgba(245,158,11,0.3)]" fill="none" viewBox="0 0 100 100">
              <path d="M20 50 C 20 80, 80 80, 80 50 Z" fill="#d97706" />
              <ellipse cx="50" cy="50" fill="#f59e0b" rx="30" ry="10" />
              <path d="M40 38 Q 36 28 42 20" stroke="#fde68a" strokeLinecap="round" strokeWidth="3" />
              <path d="M50 35 Q 54 25 48 16" stroke="#fde68a" strokeLinecap="round" strokeWidth="3" />
              <path d="M60 38 Q 64 28 58 20" stroke="#fde68a" strokeLinecap="round" strokeWidth="3" />
              <line stroke="#78350f" strokeLinecap="round" strokeWidth="3" x1="28" x2="72" y1="42" y2="22" />
            </svg>
          </div>

          {/* Dynamic User Entries & Live Ticker */}
          <div className="space-y-2">
            <div
              className="bg-amber-950/60 border border-amber-500/25 rounded-2xl p-2.5 text-[11px] space-y-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between text-[9px] font-tech text-amber-400 uppercase tracking-wider font-bold">
                <span>Comfort Food</span>
                <span className="text-amber-300/60 text-[9px]">{store.food.length} dishes</span>
              </div>
              <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                {store.food.slice(-3).map((item, i) => (
                  <div
                    key={i}
                    className="p-1.5 rounded-lg border text-[10px] bg-amber-950/40 border-amber-500/20 flex flex-col justify-between"
                  >
                    <div className="font-tech font-bold text-amber-400 truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <div className="text-[9px] text-slate-400 truncate pl-2.5 font-sans">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Reminder Box */}
            <div className="bg-amber-900/30 border border-amber-500/30 rounded-2xl p-3 text-xs">
              <div className="text-[10px] font-tech text-amber-300 uppercase tracking-wide">Live Moment:</div>
              <div className="text-white font-medium mt-0.5 text-xs">{foodMsg}</div>
            </div>
          </div>
        </div>

        {/* Stripe 4: CHILLS */}
        <div
          onClick={() => openModal('chills')}
          className="group relative rounded-3xl bg-gradient-to-b from-cyan-950/40 via-[#07131a] to-[#030a0e] border border-spiderCyber/30 hover:border-spiderCyber p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-spiderCyber/25 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-spiderCyber/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-spiderCyber text-[10px] font-tech uppercase tracking-widest font-bold">
                Stripe 04
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal('chills');
                }}
                className="px-2.5 py-1 rounded-full bg-spiderCyber/20 border border-spiderCyber/50 hover:bg-spiderCyber hover:text-slate-950 text-cyan-200 font-tech font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all shadow-lg shadow-spiderCyber/20 cursor-pointer"
              >
                <span>+ Add Yours</span>
              </button>
            </div>
            <h3 className="font-fun text-4xl lg:text-5xl text-spiderCyber tracking-wider mb-1">CHILLS</h3>
            <p className="text-xs text-cyan-200/60 font-sans">
              Cool winds, sofa lounging, starry sky, zero stress vibes.
            </p>
          </div>

          {/* Chills Illustration (SVG) */}
          <div className="my-4 flex justify-center group-hover:scale-110 transition-transform duration-500">
            <svg className="w-32 h-32 drop-shadow-[0_8px_16px_rgba(0,242,254,0.3)]" fill="none" viewBox="0 0 100 100">
              <path d="M55 20 A 30 30 0 1 0 75 75 A 35 35 0 0 1 55 20 Z" fill="#22d3ee" />
              <circle cx="30" cy="30" fill="#e0f2fe" r="2.5" />
              <circle cx="20" cy="55" fill="#e0f2fe" r="2" />
              <circle cx="75" cy="25" fill="#a5f3fc" r="3" />
              <polygon fill="#f0fdfa" points="75,40 77,45 82,45 78,48 80,53 75,50 70,53 72,48 68,45 73,45" />
            </svg>
          </div>

          {/* Dynamic User Entries & Live Ticker */}
          <div className="space-y-2">
            <div
              className="bg-cyan-950/60 border border-spiderCyber/25 rounded-2xl p-2.5 text-[11px] space-y-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between text-[9px] font-tech text-spiderCyber uppercase tracking-wider font-bold">
                <span>Chill Hobbies</span>
                <span className="text-cyan-300/60 text-[9px]">{store.chills.length} rituals</span>
              </div>
              <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                {store.chills.slice(-3).map((item, i) => (
                  <div
                    key={i}
                    className="p-1.5 rounded-lg border text-[10px] bg-cyan-950/40 border-spiderCyber/20 flex flex-col justify-between"
                  >
                    <div className="font-tech font-bold text-spiderCyber truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <div className="text-[9px] text-slate-400 truncate pl-2.5 font-sans">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Reminder Box */}
            <div className="bg-cyan-900/30 border border-spiderCyber/30 rounded-2xl p-3 text-xs">
              <div className="text-[10px] font-tech text-spiderCyber uppercase tracking-wide">Live Moment:</div>
              <div className="text-white font-medium mt-0.5 text-xs">{chillsMsg}</div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Live Moment Stripes Cyberpunk Interactive Popup */}
      {activeModal && currentConfig && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300"
          id="stripeModalOverlay"
          onClick={closeModal}
        >
          <div
            className={`relative w-full max-w-lg bg-[#0b101c] border-2 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden transition-transform duration-300 scale-100 ${currentConfig.cardBorder}`}
            id="stripeModalCard"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              onClick={closeModal}
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category Tag & Heading */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-tech font-bold uppercase tracking-widest ${currentConfig.badgeClass}`}
                id="modalStripeBadge"
              >
                {currentConfig.badge}
              </span>
              <span className="text-xs text-slate-400 font-tech">COMMUNITY BROADCAST</span>
            </div>
            <h3 className="font-fun text-2xl sm:text-3xl text-white tracking-wide mb-1" id="modalStripeTitle">
              {currentConfig.title}
            </h3>
            <p className="text-xs text-slate-400 font-sans mb-6" id="modalStripeSubtitle">
              {currentConfig.subtitle}
            </p>

            {/* Form Inputs */}
            <form onSubmit={handleSubmitModal} className="space-y-4">
              <div>
                <label className="block text-xs font-tech font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  {currentConfig.input1Label}
                </label>
                <input
                  type="text"
                  required
                  value={modalInput1}
                  onChange={(e) => setModalInput1(e.target.value)}
                  placeholder={currentConfig.input1Placeholder}
                  className="w-full bg-[#070b14] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-tech font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  {currentConfig.input2Label}
                </label>
                <input
                  type="text"
                  required
                  value={modalInput2}
                  onChange={(e) => setModalInput2(e.target.value)}
                  placeholder={currentConfig.input2Placeholder}
                  className="w-full bg-[#070b14] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-xs font-tech text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer ${currentConfig.btnClass}`}
                >
                  {currentConfig.btnLabel}
                </button>
              </div>
            </form>

            {/* Modal Live Preview List */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="text-[10px] font-tech text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Currently Pinned to this Stripe:</span>
                <span className="text-white font-bold">{currentModalItems.length} items</span>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {currentModalItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded-xl border text-xs ${currentConfig.itemPillClass}`}
                  >
                    <div className="truncate pr-2">
                      <span className="font-tech font-bold">{item.name}</span>
                      <span className="text-[10px] text-slate-300 ml-1.5">• {item.note}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(activeModal, idx)}
                      className="text-slate-400 hover:text-red-400 p-1 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
