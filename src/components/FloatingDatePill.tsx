import React from 'react';
import { useRental } from '../context/RentalContext';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { Calendar } from 'lucide-react';

export const FloatingDatePill: React.FC = () => {
  const { rentalDates, setIsDateModalOpen } = useRental();
  const scrollY = useScrollPosition();

  // Hidden if dates are already chosen OR if user hasn't scrolled past the top (threshold ~300px)
  const hasDatesChosen = Boolean(rentalDates.deliveryDate && rentalDates.pickupDate && rentalDates.days > 0);
  const shouldShow = scrollY > 300 && !hasDatesChosen;

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-35 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        type="button"
        onClick={() => setIsDateModalOpen(true)}
        className="bg-[#0B1B4D] hover:bg-slate-900 border-2 border-[#B6F500] text-white px-5 sm:px-6 py-2.5 rounded-full flex items-center gap-2.5 font-bold text-xs sm:text-sm tracking-wide shadow-2xl active:scale-95 transition cursor-pointer"
        aria-label="Select rental dates to view prices"
      >
        <Calendar className="w-4 h-4 text-[#B6F500] shrink-0" />
        <span className="whitespace-nowrap">Select rental dates to view prices</span>
      </button>
    </div>
  );
};
