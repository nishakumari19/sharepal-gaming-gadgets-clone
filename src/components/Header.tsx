import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { formatDateFull } from '../utils/dateUtils';
import { useScrollPosition } from '../hooks/useScrollPosition';
import {
  MapPin,
  Calendar,
  Check,
  Search,
  ShoppingCart,
  User,
  Heart,
  ChevronDown,
  X,
} from 'lucide-react';

const CITIES = ['Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Goa'];

export const Header: React.FC = () => {
  const {
    rentalDates,
    setIsDateModalOpen,
    setIsCartOpen,
    cartItemCount,
    wishlist,
    filters,
    setSearchQuery,
    showToast,
  } = useRental();

  const scrollY = useScrollPosition();
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const hasDatesSelected = Boolean(rentalDates.deliveryDate && rentalDates.pickupDate);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
    showToast(`Location set to ${city}`);
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-[#4B1D8F] text-white transition-shadow duration-200 ${
        scrollY > 10 ? 'shadow-lg' : 'shadow-md'
      }`}
    >
      <div className="max-w-[1520px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-3 md:gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-white font-extrabold text-2xl tracking-tight select-none focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg"
            aria-label="SharePal Home"
          >
            <span className="bg-[#00D1FF] text-[#4B1D8F] px-2.5 py-0.5 rounded-lg italic font-black shadow-inner">
              Share
            </span>
            <span className="text-white tracking-normal font-bold">Pal</span>
          </a>
        </div>

        {/* Center Pill Selector Cluster */}
        <div className="hidden md:flex items-center bg-white text-slate-700 rounded-full p-1 shadow-sm text-xs md:text-sm border border-purple-200 relative">
          {/* City Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 hover:text-purple-700 border-r border-slate-200 font-medium transition rounded-l-full focus:outline-none focus:ring-1 focus:ring-purple-500"
              aria-expanded={isCityDropdownOpen}
              aria-label="Select delivery city"
            >
              <MapPin className="w-3.5 h-3.5 text-purple-700 shrink-0" />
              <span>{selectedCity}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {/* City Dropdown Menu */}
            {isCityDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Select Delivery City
                </div>
                {CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-purple-50 hover:text-purple-700 transition ${
                      selectedCity === city ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <Check className="w-3.5 h-3.5 text-purple-700" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Delivery Date */}
          <button
            type="button"
            onClick={() => setIsDateModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 hover:text-purple-700 border-r border-slate-200 transition focus:outline-none focus:ring-1 focus:ring-purple-500"
            aria-label="Select Delivery Date"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span className="text-xs text-slate-500 font-medium hidden lg:inline">Delivery:</span>
            <span className="font-semibold text-slate-800 text-xs">
              {rentalDates.deliveryDate ? formatDateFull(rentalDates.deliveryDate) : 'Delivery Date'}
            </span>
          </button>

          {/* Pickup Date */}
          <button
            type="button"
            onClick={() => setIsDateModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 hover:text-purple-700 transition focus:outline-none focus:ring-1 focus:ring-purple-500"
            aria-label="Select Pickup Date"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span className="text-xs text-slate-500 font-medium hidden lg:inline">Pickup:</span>
            <span className="font-semibold text-slate-800 text-xs">
              {rentalDates.pickupDate ? formatDateFull(rentalDates.pickupDate) : 'Pickup Date'}
            </span>
          </button>

          {/* Dark Navy Select / Change Button */}
          <button
            type="button"
            onClick={() => setIsDateModalOpen(true)}
            className="bg-[#0B1B4D] hover:bg-slate-900 text-white rounded-full px-3.5 py-1.5 flex items-center gap-1.5 font-semibold text-xs ml-1 transition shadow-sm active:scale-95"
            aria-label={hasDatesSelected ? 'Modify chosen dates' : 'Open date picker'}
          >
            <Check className="w-3.5 h-3.5 text-[#B6F500]" />
            <span>{hasDatesSelected ? `${rentalDates.days}D Selected` : 'Select'}</span>
          </button>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search bar or icon */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-white/10 rounded-full px-3 py-1 border border-white/20">
                <Search className="w-4 h-4 text-purple-200 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search PS5, Xbox, VR..."
                  value={filters.searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-transparent border-none text-white text-xs placeholder:text-purple-200/70 focus:outline-none focus:ring-0 w-32 sm:w-48"
                />
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-1 hover:text-purple-200 transition"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search gaming gear"
                className="p-2 hover:bg-purple-800/60 rounded-full transition text-slate-100 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist indicator (if any items) */}
          {wishlist.length > 0 && (
            <button
              type="button"
              onClick={() => showToast(`You have ${wishlist.length} item(s) in wishlist`)}
              aria-label="Wishlist"
              className="p-2 hover:bg-purple-800/60 rounded-full transition relative text-slate-100 hidden sm:block focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <Heart className="w-5 h-5 fill-red-400 text-red-400" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            </button>
          )}

          {/* Shopping Cart with count badge */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Shopping Cart"
            className="p-2 hover:bg-purple-800/60 rounded-full transition relative text-slate-100 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 ? (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold rounded-full h-4 min-w-4 px-1 flex items-center justify-center ring-2 ring-[#4B1D8F]">
                {cartItemCount}
              </span>
            ) : (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-300 rounded-full ring-2 ring-[#4B1D8F]"></span>
            )}
          </button>

          {/* User Login */}
          <button
            type="button"
            onClick={() => showToast('User login feature available soon!')}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium hover:bg-purple-800/60 py-1.5 px-2.5 sm:px-3 rounded-full transition focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline">Hi, Login</span>
          </button>
        </div>
      </div>

      {/* Mobile Date Bar for screens below md */}
      <div className="md:hidden px-4 pb-2.5 pt-0">
        <button
          type="button"
          onClick={() => setIsDateModalOpen(true)}
          className="w-full bg-white text-slate-800 rounded-full py-2 px-3 text-xs font-semibold flex items-center justify-between shadow-sm border border-purple-200"
        >
          <div className="flex items-center gap-1.5 text-purple-800">
            <Calendar className="w-3.5 h-3.5" />
            <span className="truncate max-w-[210px]">
              {hasDatesSelected
                ? `${formatDateFull(rentalDates.deliveryDate)} → ${formatDateFull(
                    rentalDates.pickupDate
                  )} (${rentalDates.days}D)`
                : 'Tap to select Bangalore rental dates'}
            </span>
          </div>
          <span className="bg-[#0B1B4D] text-[#B6F500] px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            {hasDatesSelected ? 'Edit' : 'Select'}
          </span>
        </button>
      </div>
    </header>
  );
};
