import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <section
      aria-label="Gaming Consoles Hero Banner"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3B0764] via-[#581C87] to-[#4C1D95] text-white p-6 sm:p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between min-h-[220px]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Left Hero Details */}
      <div className="z-10 max-w-xl text-center md:text-left space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Gaming Consoles
        </h1>
        <p className="text-purple-200 text-sm md:text-base leading-relaxed">
          Rent the latest gaming gadgets from{' '}
          <span className="text-white font-bold italic">SharePal</span>: PS5, Xbox, Oculus VR, Racing Wheel on rent.
        </p>

        {/* White Partner Logos Row */}
        <div className="pt-2 flex items-center justify-center md:justify-start gap-6 sm:gap-8 opacity-90 text-sm font-semibold tracking-wider">
          {/* XBOX Logo */}
          <div className="flex items-center gap-1.5 hover:text-green-400 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" fill="none" r="9" stroke="currentColor" strokeWidth="2" />
              <path d="M8 8l8 8M16 8L8 8" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="font-bold">XBOX</span>
          </div>

          {/* PS5 Logo */}
          <div className="flex items-center gap-1.5 hover:text-blue-300 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h4v16H4zm12 0h4v16h-4z" />
            </svg>
            <span className="font-bold">PS5</span>
          </div>

          {/* Meta Logo */}
          <div className="flex items-center gap-1.5 hover:text-sky-300 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4C7 4 3 8 3 13s4 8 9 8 9-3.5 9-8-4-9-9-9zm-1 11.5c-1.5 0-2.5-1-2.5-2.5s1-2.5 2.5-2.5 2.5 1 2.5 2.5-1 2.5-2.5 2.5z" />
            </svg>
            <span className="font-bold">Meta</span>
          </div>
        </div>
      </div>

      {/* Right Side Visual Cards */}
      <div className="hidden md:flex items-center gap-3.5 relative z-10 select-none mt-4 md:mt-0">
        {/* Xbox Card */}
        <div className="w-28 h-36 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 p-2.5 flex flex-col items-center justify-between text-center shadow-lg transform hover:-translate-y-1 transition duration-200">
          <span className="text-[11px] uppercase tracking-wider text-purple-200 font-semibold">Xbox Series</span>
          <div className="w-12 h-18 bg-slate-900 rounded-md my-1 border border-slate-700 flex flex-col items-center justify-center p-1">
            <div className="w-2 h-2 rounded-full bg-green-500 mb-1" />
            <div className="w-8 h-1 bg-slate-800 rounded" />
          </div>
          <span className="text-[10px] text-purple-300 font-medium">Fast 120 FPS</span>
        </div>

        {/* PS5 Center Card */}
        <div className="w-32 h-44 bg-white/15 rounded-xl backdrop-blur-md border border-white/30 p-2.5 flex flex-col items-center justify-between text-center shadow-2xl scale-105 transform hover:-translate-y-1 transition duration-200 ring-1 ring-white/30">
          <div className="bg-[#B6F500] text-slate-900 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
            Most Popular
          </div>
          <div className="w-14 h-24 bg-white rounded-lg shadow-inner my-1 flex flex-col items-center justify-center text-slate-900 font-bold text-xs border border-slate-200">
            <span className="text-blue-600 font-black">PS5</span>
            <div className="w-8 h-0.5 bg-blue-500 my-1 rounded" />
            <span className="text-[8px] text-slate-500 font-mono">4K HDR</span>
          </div>
          <span className="text-[11px] font-bold text-white tracking-wide">PlayStation 5</span>
        </div>

        {/* Meta Quest Card */}
        <div className="w-28 h-36 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 p-2.5 flex flex-col items-center justify-between text-center shadow-lg transform hover:-translate-y-1 transition duration-200">
          <span className="text-[11px] uppercase tracking-wider text-purple-200 font-semibold">Meta Quest 3</span>
          <div className="w-16 h-10 bg-slate-100 rounded-full my-auto border border-slate-300 flex items-center justify-center gap-1 shadow-inner">
            <div className="w-3 h-3 rounded-full bg-slate-900" />
            <div className="w-3 h-3 rounded-full bg-slate-900" />
          </div>
          <span className="text-[10px] text-purple-300 font-medium">Spatial Audio</span>
        </div>
      </div>
    </section>
  );
};
