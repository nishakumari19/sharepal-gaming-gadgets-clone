import React from 'react';
import { useRental } from '../context/RentalContext';
import { ArrowUpRight } from 'lucide-react';

export const GearBanner: React.FC = () => {
  const { showToast } = useRental();

  return (
    <div
      className="col-span-full rounded-2xl bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#1E3A8A] text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md my-2 border border-indigo-500/20 relative overflow-hidden"
      data-purpose="promo-rent-gear"
    >
      <div className="space-y-2 text-center md:text-left z-10">
        <span className="text-slate-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">
          Got gear you don't use anymore?
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Rent Out Your Gear on SharePal
        </h2>
        <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
          Monetize your idle PlayStation, Xbox, camera or VR gear with guaranteed safety and verified borrowers in Bangalore.
        </p>
      </div>

      <div className="shrink-0 z-10 w-full md:w-auto flex justify-center md:justify-end">
        <button
          type="button"
          onClick={() => showToast('Opening Gear Listing flow on SharePal')}
          className="w-full sm:w-auto bg-[#B6F500] hover:bg-[#a3db00] text-slate-900 font-extrabold px-6 py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-lime-300 cursor-pointer"
        >
          <span>Earn With Us</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
