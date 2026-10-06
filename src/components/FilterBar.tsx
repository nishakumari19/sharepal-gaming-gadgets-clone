import React from 'react';
import { useRental } from '../context/RentalContext';
import { SortOption } from '../types';
import { Sparkles, Flame, Check } from 'lucide-react';

interface FilterBarProps {
  totalCount?: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({ totalCount }) => {
  const { filters, setSort, setTagFilter, setInStockOnly, resetFilters, totalFilteredCount } = useRental();
  const countToDisplay = totalCount !== undefined ? totalCount : totalFilteredCount;

  const sortOptions: { id: SortOption; label: string }[] = [
    { id: 'popular', label: 'Popular' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'rating', label: 'Rating 4.0+' },
  ];

  const hasActiveFilters =
    filters.tag !== '' || filters.inStockOnly || filters.sort !== 'popular' || filters.searchQuery !== '';

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
      {/* Title & Live Count */}
      <div className="flex flex-wrap items-baseline gap-2.5">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Gaming Gadgets On Rent
        </h2>
        <span className="text-xs md:text-sm text-slate-500 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full">
          Total items: {countToDisplay} items
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-purple-700 hover:text-purple-900 underline font-medium cursor-pointer ml-1"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Controls: Sort, Tag Chips & In-Stock Switch */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs md:text-sm">
        {/* Sort Segmented Buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-0.5 overflow-x-auto max-w-full">
          {sortOptions.map((opt) => {
            const isSelected = filters.sort === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSort(opt.id)}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition focus:outline-none focus:ring-1 focus:ring-purple-400 ${
                  isSelected
                    ? 'bg-white font-bold text-purple-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Tag Filters (Trending / New) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setTagFilter('Trending')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
              filters.tag === 'Trending'
                ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Trending</span>
            {filters.tag === 'Trending' && <Check className="w-3 h-3 text-orange-600 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={() => setTagFilter('New')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
              filters.tag === 'New'
                ? 'bg-blue-50 border-blue-600 text-blue-600 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>New</span>
            {filters.tag === 'New' && <Check className="w-3 h-3 text-blue-600 ml-0.5" />}
          </button>
        </div>

        {/* In Stock Only Switch */}
        <label className="flex items-center gap-2 cursor-pointer ml-auto xl:ml-2 select-none">
          <span className="text-slate-600 font-medium text-xs whitespace-nowrap">In stock only</span>
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              id="stockToggle"
              checked={filters.inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
          </div>
        </label>
      </div>
    </div>
  );
};
