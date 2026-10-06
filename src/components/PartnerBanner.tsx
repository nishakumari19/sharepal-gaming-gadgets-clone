import React from 'react';
import { useRental } from '../context/RentalContext';
import { ArrowUpRight, Calendar, Gift, Tag, RefreshCw } from 'lucide-react';

export const PartnerBanner: React.FC = () => {
  const { showToast } = useRental();

  return (
    <div
      className="col-span-full bg-[#0B1B4D] rounded-2xl p-6 md:p-8 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md my-2 border border-blue-900/40 relative overflow-hidden"
      data-purpose="promo-asset-partner"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-4 max-w-2xl z-10 w-full">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Become an <span className="text-[#B6F500]">Asset Partner.</span> Earn Monthly.
        </h2>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Earning Benefits */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15 shadow-inner">
            <div className="text-[11px] uppercase text-slate-300 font-bold tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B6F500]" />
              Earning Benefits
            </div>
            <div className="text-sm font-medium flex items-center gap-2 mb-1.5 text-slate-100">
              <Calendar className="w-4 h-4 text-[#B6F500] shrink-0" />
              <span>Monthly Earnings from rental assets</span>
            </div>
            <div className="text-sm font-medium flex items-center gap-2 text-slate-100">
              <Gift className="w-4 h-4 text-[#B6F500] shrink-0" />
              <span>Upto ₹10,000 Instant Wallet credits</span>
            </div>
          </div>

          {/* Rental Benefits */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15 shadow-inner">
            <div className="text-[11px] uppercase text-slate-300 font-bold tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B6F500]" />
              Rental Benefits
            </div>
            <div className="text-sm font-medium flex items-center gap-2 mb-1.5 text-slate-100">
              <Tag className="w-4 h-4 text-[#B6F500] shrink-0" />
              <span>10% Off exclusive discount when you rent</span>
            </div>
            <div className="text-sm font-medium flex items-center gap-2 text-slate-100">
              <RefreshCw className="w-4 h-4 text-[#B6F500] shrink-0" />
              <span>Get 10% Cashback on every order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="shrink-0 z-10 w-full lg:w-auto flex justify-start lg:justify-end">
        <button
          type="button"
          onClick={() => showToast('Opening Asset Partner Application form')}
          className="w-full lg:w-auto bg-[#B6F500] hover:bg-[#a3db00] text-slate-900 font-extrabold px-6 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-lime-300 cursor-pointer"
        >
          <span>Know More</span>
          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
