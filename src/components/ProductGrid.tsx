import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { ProductCard } from './ProductCard';
import { PartnerBanner } from './PartnerBanner';
import { GearBanner } from './GearBanner';

export const ProductGrid: React.FC = () => {
  const { filteredProducts, totalFilteredCount } = useRental();
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < totalFilteredCount;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 12, totalFilteredCount));
      setIsLoadingMore(false);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-4 shadow-xs">
          <div className="text-4xl mb-3">🎮</div>
          <h3 className="text-lg font-bold text-slate-800">No gaming gadgets found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            We couldn't find any products matching your current filters. Try resetting the filters or searching for something else.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5" id="productGrid">
          {displayedProducts.map((product, index) => {
            return (
              <React.Fragment key={product.id}>
                {/* Product Card */}
                <ProductCard product={product} />

                {/* Banner 1: Injected after first row of products (after index 3) */}
                {index === 3 && <PartnerBanner />}

                {/* Banner 2: Injected after second row of products (after index 7) */}
                {index === 7 && <GearBanner />}
              </React.Fragment>
            );
          })}

          {/* Skeleton Loaders during load more */}
          {isLoadingMore &&
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-col gap-3 animate-pulse shadow-xs"
              >
                <div className="aspect-square bg-slate-100 rounded-xl" />
                <div className="h-4 bg-slate-100 rounded w-5/6" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="h-5 bg-slate-100 rounded w-16" />
                  <div className="w-8 h-8 rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Pagination / Show More */}
      {totalFilteredCount > 0 && (
        <div className="flex flex-col items-center justify-center gap-2 pt-4 pb-2" data-purpose="pagination">
          <span className="text-xs text-slate-500 font-medium">
            Showing {Math.min(visibleCount, totalFilteredCount)} of {totalFilteredCount} results
          </span>

          {hasMore && (
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="mt-1 px-8 py-2.5 bg-white border border-slate-300 hover:border-purple-600 text-slate-700 hover:text-purple-700 font-semibold text-sm rounded-full shadow-xs hover:shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              {isLoadingMore ? 'Loading products...' : 'Show More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
