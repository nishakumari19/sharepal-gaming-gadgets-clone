import React, { useState, useEffect, useMemo } from 'react';
import { useRental } from '../context/RentalContext';
import { formatDateFull, calculateRentalPeriod } from '../utils/dateUtils';
import {
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  Sparkles,
} from 'lucide-react';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isBefore,
  isSameDay,
  isAfter,
  parseISO,
  startOfDay,
  addDays,
} from 'date-fns';

export const DateModal: React.FC = () => {
  const { isDateModalOpen, setIsDateModalOpen, rentalDates, setRentalDates, showToast } =
    useRental();

  // Selected dates in the modal
  const [modalStart, setModalStart] = useState<string | null>(rentalDates.deliveryDate);
  const [modalEnd, setModalEnd] = useState<string | null>(rentalDates.pickupDate);
  const [isSelectingPickup, setIsSelectingPickup] = useState(false);

  // Calendar base month (defaults to current month)
  const [baseMonth, setBaseMonth] = useState<Date>(() => {
    return startOfMonth(new Date());
  });

  // Keep in sync when modal opens
  useEffect(() => {
    if (isDateModalOpen) {
      if (rentalDates.deliveryDate && rentalDates.pickupDate) {
        setModalStart(rentalDates.deliveryDate);
        setModalEnd(rentalDates.pickupDate);
        try {
          const d = parseISO(rentalDates.deliveryDate);
          setBaseMonth(startOfMonth(d));
        } catch {
          // ignore
        }
      } else {
        const today = new Date();
        const start = addDays(today, 1);
        const end = addDays(today, 4);
        setModalStart(format(start, 'yyyy-MM-dd'));
        setModalEnd(format(end, 'yyyy-MM-dd'));
        setBaseMonth(startOfMonth(start));
      }
      setIsSelectingPickup(false);
    }
  }, [isDateModalOpen, rentalDates]);

  // Two side-by-side months
  const month1 = baseMonth;
  const month2 = useMemo(() => addMonths(baseMonth, 1), [baseMonth]);

  const handlePrevMonth = () => {
    setBaseMonth((curr) => subMonths(curr, 1));
  };

  const handleNextMonth = () => {
    setBaseMonth((curr) => addMonths(curr, 1));
  };

  // Day click logic
  const handleDayClick = (dayStr: string) => {
    if (!modalStart || isSelectingPickup === false) {
      setModalStart(dayStr);
      setModalEnd(null);
      setIsSelectingPickup(true);
    } else {
      // We are selecting pickup date
      const s = parseISO(modalStart);
      const e = parseISO(dayStr);

      if (isBefore(e, s)) {
        // Clicked before start: reset start
        setModalStart(dayStr);
        setModalEnd(null);
        setIsSelectingPickup(true);
      } else if (isSameDay(e, s)) {
        // Same day: minimum rental is next day
        setModalEnd(null);
        showToast('Pickup date must be after delivery date.');
      } else {
        setModalEnd(dayStr);
        setIsSelectingPickup(false);
      }
    }
  };

  const { days, chargeableText, isValidRange } = useMemo(() => {
    return calculateRentalPeriod(modalStart, modalEnd);
  }, [modalStart, modalEnd]);

  const handleContinue = () => {
    if (!modalStart || !modalEnd || !isValidRange) {
      showToast('Please select valid delivery and pickup dates.');
      return;
    }

    setRentalDates(modalStart, modalEnd);
    setIsDateModalOpen(false);
    showToast(`Rental dates confirmed: ${formatDateFull(modalStart)} - ${formatDateFull(modalEnd)} (${days} Days)`);
  };

  if (!isDateModalOpen) return null;

  // Calendar rendering helper for a given month
  const renderCalendarMonth = (monthDate: Date) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const daysList = eachDayOfInterval({ start: startDate, end: monthEnd });
    // Fill to 35 or 42 grid cells for clean layout
    const allCells = eachDayOfInterval({ start: startDate, end: endDate });

    const today = startOfDay(new Date());

    return (
      <div className="flex flex-col">
        {/* Day Header */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 mb-2">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-y-1 text-xs text-center">
          {allCells.map((day) => {
            const dayStr = format(day, 'yyyy-MM-dd');
            const isCurrentMonth = day.getMonth() === monthDate.getMonth();
            const isPast = isBefore(day, today);

            const isStart = modalStart === dayStr;
            const isEnd = modalEnd === dayStr;
            const isInRange =
              modalStart && modalEnd && isAfter(day, parseISO(modalStart)) && isBefore(day, parseISO(modalEnd));

            if (!isCurrentMonth) {
              return (
                <div
                  key={dayStr}
                  className="h-9 flex items-center justify-center text-gray-300 font-medium select-none"
                >
                  {format(day, 'd')}
                </div>
              );
            }

            if (isPast) {
              return (
                <button
                  key={dayStr}
                  type="button"
                  disabled
                  className="h-9 flex items-center justify-center text-gray-300 cursor-not-allowed select-none"
                >
                  {format(day, 'd')}
                </button>
              );
            }

            // Active button classes
            let cellStyle =
              'h-9 flex items-center justify-center font-medium transition-colors cursor-pointer select-none ';

            if (isStart && isEnd) {
              cellStyle += 'text-white bg-[#5B21B6] font-bold rounded-full shadow-sm z-10';
            } else if (isStart) {
              cellStyle += 'text-white bg-[#5B21B6] font-bold rounded-l-full shadow-sm relative z-10';
            } else if (isEnd) {
              cellStyle += 'text-white bg-[#5B21B6] font-bold rounded-r-full shadow-sm relative z-10';
            } else if (isInRange) {
              cellStyle += 'text-purple-950 bg-[#EDE9FE] font-semibold relative z-0';
            } else {
              cellStyle += 'text-gray-800 hover:bg-purple-100 rounded-full';
            }

            return (
              <button
                key={dayStr}
                type="button"
                onClick={() => handleDayClick(dayStr)}
                className={cellStyle}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-[4px] transition-opacity duration-300 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Main Date Picker Modal Card */}
      <div className="relative w-full max-w-[1140px] max-h-[95vh] overflow-y-auto bg-white rounded-[28px] sm:rounded-[32px] shadow-2xl p-5 sm:p-8 md:p-9 border border-gray-100 transform transition-all duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsDateModalOpen(false)}
          aria-label="Close modal"
          className="absolute top-5 right-5 sm:top-7 sm:right-7 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="mb-5 sm:mb-6">
          <h2 id="modal-title" className="text-[26px] sm:text-[32px] font-extrabold text-[#111827] tracking-tight leading-none">
            Select your Dates
          </h2>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT COLUMN: Inputs & Calculations */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* Delivery & Pickup display fields */}
            <div className="grid grid-cols-2 gap-3">
              {/* Delivery Input */}
              <div className="flex flex-col">
                <label className="text-[13px] font-semibold text-gray-700 mb-1.5 flex items-center">
                  Delivery Date <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div
                  onClick={() => setIsSelectingPickup(false)}
                  className={`h-12 px-3.5 border rounded-2xl flex items-center gap-2.5 bg-white text-xs sm:text-[13px] font-medium cursor-pointer shadow-xs transition ${
                    !isSelectingPickup ? 'border-purple-600 ring-2 ring-purple-100' : 'border-gray-200 hover:border-indigo-400'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-purple-700 shrink-0" />
                  <span className="truncate font-semibold text-gray-800">
                    {modalStart ? formatDateFull(modalStart) : 'Select date'}
                  </span>
                </div>
              </div>

              {/* Pickup Input */}
              <div className="flex flex-col">
                <label className="text-[13px] font-semibold text-gray-700 mb-1.5 flex items-center">
                  Pickup Date <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div
                  onClick={() => setIsSelectingPickup(true)}
                  className={`h-12 px-3.5 border rounded-2xl flex items-center gap-2.5 bg-white text-xs sm:text-[13px] font-medium cursor-pointer shadow-xs transition ${
                    isSelectingPickup ? 'border-purple-600 ring-2 ring-purple-100' : 'border-gray-200 hover:border-indigo-400'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-purple-700 shrink-0" />
                  <span className="truncate font-semibold text-gray-800">
                    {modalEnd ? formatDateFull(modalEnd) : 'Select date'}
                  </span>
                </div>
              </div>
            </div>

            {/* Same-Day Delivery Disclaimer */}
            <div className="bg-[#EEF4FF] rounded-2xl p-3.5 flex items-start gap-3 border border-blue-100">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                <Info className="w-3.5 h-3.5" />
              </div>
              <p className="text-[12.5px] leading-relaxed text-blue-900">
                <span className="font-bold">Same-day delivery</span> between <span className="font-bold">5PM and 11PM</span>. For future dates, you can select a specific time slot available at checkout. We pickup between <span className="font-bold">9AM to 1PM</span>.
              </p>
            </div>

            {/* Rental Period Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs">
              <span className="block text-xs font-medium text-gray-500 mb-1">Your Rental Period:</span>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-[44px] font-extrabold text-gray-900 leading-none">
                    {String(days).padStart(2, '0')}
                  </span>
                  <span className="text-base font-semibold text-gray-600">Day</span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-medium text-gray-500 block">Chargeable Period:</span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 mt-0.5 justify-end">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>{chargeableText}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save More With Us Banner */}
            <div className="bg-[#0b1638] rounded-2xl p-4 text-white relative overflow-hidden shadow-md">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-5 h-5 text-[#CEFF00]" />
                <h3 className="text-[#CEFF00] italic font-black text-base sm:text-lg tracking-wide uppercase">
                  Save more with us!
                </h3>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                Longer rental periods mean bigger savings—enjoy discounts of up to 12%. We don't charge you for delivery and pickup days!
              </p>
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={!isValidRange}
              className={`w-full font-bold py-3.5 px-6 rounded-full shadow-lg transition-all duration-200 text-center text-base cursor-pointer ${
                isValidRange
                  ? 'bg-[#5B21B6] hover:bg-[#4C1D95] text-white shadow-indigo-600/20 active:scale-[0.99]'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>

          {/* RIGHT COLUMN: Interactive Calendar (Dual-month on desktop, single on mobile) */}
          <div className="lg:col-span-7 bg-[#FBFBFE] rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-inner">
            {/* Month Switcher Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous Month"
                className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-black transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 text-center gap-2">
                <span className="font-bold text-gray-800 text-[15px]">
                  {format(month1, 'MMMM yyyy')}
                </span>
                <span className="hidden md:inline font-bold text-gray-800 text-[15px]">
                  {format(month2, 'MMMM yyyy')}
                </span>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next Month"
                className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-black transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Dual Calendars Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Month 1 */}
              <div>{renderCalendarMonth(month1)}</div>

              {/* Month 2 (Desktop only) */}
              <div className="hidden md:block">{renderCalendarMonth(month2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
