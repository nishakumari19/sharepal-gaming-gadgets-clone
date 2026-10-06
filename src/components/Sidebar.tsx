import React from 'react';
import { useRental } from '../context/RentalContext';
import { LayoutGrid, Gamepad2, Disc3, Glasses } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  shortName: string;
  iconType: 'all' | 'gta' | 'ps5' | 'xbox' | 'vr';
}

const CATEGORIES: CategoryItem[] = [
  { id: 'All', name: 'All', shortName: 'All', iconType: 'all' },
  { id: 'GTA VI', name: 'GTA VI', shortName: 'GTA VI', iconType: 'gta' },
  { id: 'PS5 Console', name: 'PS5\nConsole', shortName: 'PS5', iconType: 'ps5' },
  { id: 'Xbox Console', name: 'Xbox\nConsole', shortName: 'Xbox', iconType: 'xbox' },
  { id: 'VR', name: 'VR', shortName: 'VR Headset', iconType: 'vr' },
];

export const Sidebar: React.FC = () => {
  const { filters, setCategory } = useRental();

  const renderIcon = (type: CategoryItem['iconType'], isActive: boolean) => {
    switch (type) {
      case 'all':
        return <LayoutGrid className={`w-6 h-6 ${isActive ? 'text-purple-700' : 'text-slate-700'}`} />;
      case 'gta':
        return (
          <div className="bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 text-[9px] font-black text-white px-1.5 py-0.5 rounded leading-tight text-center tracking-tighter shadow-xs">
            GTA VI
          </div>
        );
      case 'ps5':
        return <Gamepad2 className={`w-6 h-6 ${isActive ? 'text-purple-700' : 'text-slate-700'}`} />;
      case 'xbox':
        return <Disc3 className={`w-6 h-6 ${isActive ? 'text-purple-700' : 'text-slate-700'}`} />;
      case 'vr':
        return <Glasses className={`w-6 h-6 ${isActive ? 'text-purple-700' : 'text-slate-700'}`} />;
    }
  };

  return (
    <>
      {/* Desktop Vertical Sticky Sidebar */}
      <aside
        className="hidden lg:flex flex-col items-center bg-white py-4 px-2 rounded-2xl border border-slate-200 shadow-xs sticky top-32 w-24 shrink-0 gap-4"
        aria-label="Filter by category"
      >
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`flex flex-col items-center gap-1.5 group text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-xl p-1 ${
                isActive ? 'text-purple-700' : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition duration-200 group-hover:scale-105 shadow-xs ${
                  isActive
                    ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 group-hover:border-purple-300'
                }`}
              >
                {renderIcon(cat.iconType, isActive)}
              </div>
              <span className="text-center leading-3 whitespace-pre-line text-[11px]">
                {cat.name}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Mobile / Tablet Horizontal Category Chip Row */}
      <div className="lg:hidden w-full overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-semibold shrink-0 transition ${
                  isActive
                    ? 'bg-purple-700 border-purple-700 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300'
                }`}
              >
                <div className="scale-75 shrink-0">
                  {renderIcon(cat.iconType, isActive)}
                </div>
                <span>{cat.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
