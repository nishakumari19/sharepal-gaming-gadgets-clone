import React from 'react';
import { useRental } from '../context/RentalContext';
import { CheckCircle } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useRental();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 right-4 sm:right-8 z-60 bg-[#0B1B4D] text-white px-4 py-3 rounded-2xl shadow-2xl border border-purple-500/30 flex items-center gap-2.5 max-w-sm animate-in fade-in slide-in-from-top-3 duration-200"
    >
      <CheckCircle className="w-4 h-4 text-[#B6F500] shrink-0" />
      <span className="text-xs font-semibold leading-tight">{toastMessage}</span>
    </div>
  );
};
