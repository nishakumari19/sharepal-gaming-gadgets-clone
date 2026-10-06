import React from 'react';
import { useRental } from '../context/RentalContext';

const TABS = [
  { id: 'photography', label: 'Photography' },
  { id: 'gaming', label: 'Gaming', active: true },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'entertainment', label: 'Entertainment' },
];

export const CategoryTabs: React.FC = () => {
  const { showToast } = useRental();

  return (
    <nav
      className="bg-white border-b border-slate-200 text-slate-600 text-sm font-medium sticky top-16 z-30 shadow-xs"
      aria-label="Category Navigation"
    >
      <div className="max-w-[1520px] mx-auto px-4 lg:px-8 flex justify-center gap-6 sm:gap-10 md:gap-14 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          if (tab.active) {
            return (
              <span
                key={tab.id}
                className="py-3 px-2.5 border-b-2 border-[#4B1D8F] text-[#4B1D8F] font-bold text-sm tracking-tight cursor-default whitespace-nowrap"
              >
                {tab.label}
              </span>
            );
          }

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => showToast(`Switching to ${tab.label} category (Bangalore catalog)`)}
              className="py-3 px-2.5 border-b-2 border-transparent text-slate-600 hover:text-purple-700 transition font-medium text-sm whitespace-nowrap focus:outline-none focus:text-purple-800"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
