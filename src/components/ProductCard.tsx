import React, { useState } from 'react';
import { Product } from '../types';
import { useRental } from '../context/RentalContext';
import { Star, Heart, Check, BellRing } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&auto=format&fit=crop&q=80';

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    rentalDates,
    setIsDateModalOpen,
    addToCart,
    toggleWishlist,
    isWishlisted,
    votes,
    voteProduct,
    hasVoted,
    showToast,
  } = useRental();

  const [imgSrc, setImgSrc] = useState(product.image);
  const [hasError, setHasError] = useState(false);

  const isLiked = isWishlisted(product.id);
  const userVoted = hasVoted(product.id);
  const isVoteToLaunch = product.tag === 'Vote to Launch';
  const hasDatesSelected = Boolean(rentalDates.deliveryDate && rentalDates.pickupDate && rentalDates.days > 0);

  const displayPricePerDay = Math.round(product.per_day_rent);
  const totalPriceForDays = hasDatesSelected ? displayPricePerDay * rentalDates.days : null;

  // Total votes (base + local votes)
  const baseVotes = product.votes || (isVoteToLaunch ? product.booked_count || 10000 : 10000);
  const currentVotes = baseVotes + (votes[String(product.id)] || 0);

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (product.out_of_stock) {
      showToast(`We will notify you when ${product.name} is restocked!`);
      return;
    }

    if (isVoteToLaunch) {
      if (!userVoted) {
        voteProduct(product.id);
      } else {
        showToast('You have already voted for this product!');
      }
      return;
    }

    if (!hasDatesSelected) {
      showToast('Please select your rental dates first.');
      setIsDateModalOpen(true);
    } else {
      addToCart(product);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article
      className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col p-3.5 relative group product-card ${
        product.out_of_stock
          ? 'border-slate-200 opacity-75'
          : isVoteToLaunch
          ? 'border-purple-200 hover:border-purple-400 hover:shadow-xl hover:-translate-y-1'
          : 'border-slate-200 hover:border-purple-300 hover:shadow-xl hover:-translate-y-1'
      }`}
      data-in-stock={!product.out_of_stock}
    >
      {/* Product Image Frame */}
      <div
        className={`relative bg-slate-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center p-3 mb-3 border border-slate-100 ${
          product.out_of_stock ? 'grayscale bg-slate-100/80' : isVoteToLaunch ? 'bg-purple-50/40' : ''
        }`}
      >
        {/* Tag Badges */}
        {product.out_of_stock ? (
          <span className="absolute top-2.5 left-2.5 bg-slate-800 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs z-10">
            Sold Out
          </span>
        ) : product.tag === 'Trending' ? (
          <span className="absolute top-2.5 left-2.5 border border-orange-500 text-orange-600 bg-orange-50/90 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-2xs z-10">
            Trending
          </span>
        ) : product.tag === 'New' ? (
          <span className="absolute top-2.5 left-2.5 border border-blue-600 text-blue-600 bg-blue-50/90 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-2xs z-10">
            New
          </span>
        ) : isVoteToLaunch ? (
          <span className="absolute top-2.5 left-2.5 border border-purple-600 text-purple-700 bg-purple-50 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-2xs z-10">
            Vote to Launch
          </span>
        ) : null}

        {/* Wishlist Heart Icon */}
        {!product.out_of_stock && (
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all duration-200 z-10 active:scale-90 ${
              isLiked
                ? 'opacity-100 text-red-500 ring-1 ring-red-200'
                : 'opacity-80 sm:opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500'
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform duration-200 ${
                isLiked ? 'fill-red-500 stroke-red-500 scale-110' : ''
              }`}
            />
          </button>
        )}

        {/* Product Image */}
        <img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          onError={() => {
            if (!hasError) {
              setHasError(true);
              setImgSrc(FALLBACK_IMAGE);
            }
          }}
          className={`object-contain max-h-full max-w-full transition-transform duration-300 ${
            product.out_of_stock ? '' : 'group-hover:scale-105'
          }`}
        />
      </div>

      {/* Product Title (2-line clamp) */}
      <h3
        className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 min-h-[38px] tracking-tight"
        title={product.name}
      >
        {product.name}
      </h3>

      {/* Rating & Booking Meta */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5 mb-2.5">
        {isVoteToLaunch ? (
          <span className="text-purple-700 font-semibold flex items-center gap-1 text-[11px]">
            <span>🗳️</span> {currentVotes.toLocaleString()}+ votes
          </span>
        ) : (
          <>
            {product.rating > 0 && (
              <span className="inline-flex items-center gap-0.5 text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{product.rating.toFixed(1)}</span>
              </span>
            )}
            {product.booked_count > 0 && (
              <span className="text-slate-400">({product.booked_count} booked)</span>
            )}
          </>
        )}
      </div>

      {/* Price & Action Row */}
      <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          {isVoteToLaunch ? (
            <span className="text-[11px] text-slate-400 block font-medium">Expected Daily Rent</span>
          ) : hasDatesSelected && totalPriceForDays ? (
            <span className="text-[11px] text-purple-700 font-semibold block">
              ₹{totalPriceForDays.toLocaleString()} for {rentalDates.days} {rentalDates.days > 1 ? 'days' : 'day'}
            </span>
          ) : (
            <span className="text-[11px] text-slate-400 block font-medium">Select Dates to view price</span>
          )}

          <div className="flex items-baseline gap-0.5">
            <span
              className={`text-base font-extrabold tracking-tight ${
                product.out_of_stock ? 'text-slate-400 line-through' : 'text-slate-900'
              }`}
            >
              ₹{displayPricePerDay}
            </span>
            <span className="text-xs font-normal text-slate-500">/day</span>
          </div>
        </div>

        {/* Action Button: '+' or 'Sold out' or 'Vote' */}
        {product.out_of_stock ? (
          <button
            type="button"
            onClick={handleActionClick}
            className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition flex items-center gap-1 focus:outline-none"
            aria-label="Notify when in stock"
          >
            <BellRing className="w-3 h-3" />
            <span>Notify me</span>
          </button>
        ) : isVoteToLaunch ? (
          <button
            type="button"
            onClick={handleActionClick}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition flex items-center gap-1 active:scale-95 ${
              userVoted
                ? 'bg-purple-700 text-white border-2 border-purple-700'
                : 'border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white'
            }`}
          >
            {userVoted ? (
              <>
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Voted</span>
              </>
            ) : (
              <span>Vote</span>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleActionClick}
            aria-label={`Rent ${product.name}`}
            className="w-8 h-8 rounded-full border border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center font-bold text-lg transition duration-200 shadow-xs active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            +
          </button>
        )}
      </div>
    </article>
  );
};
