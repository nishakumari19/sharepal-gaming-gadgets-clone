import React from 'react';
import { useRental } from '../context/RentalContext';

export const ChatButton: React.FC = () => {
  const { showToast } = useRental();

  return (
    <button
      type="button"
      onClick={() => showToast('Connecting to SharePal Bangalore WhatsApp Support (+91 91083 45678)...')}
      aria-label="Chat on WhatsApp with SharePal Bangalore"
      className="fixed bottom-6 right-6 z-35 w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-3 focus:ring-green-400 cursor-pointer"
    >
      <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.122-.524-1.782-.733-2.91-2.544-2.997-2.66-.088-.117-.723-.96-.723-1.83 0-.871.458-1.299.621-1.477.164-.177.359-.222.479-.222.12 0 .24 0 .346.006.111.005.26-.042.406.31.15.36.509 1.242.554 1.332.045.09.075.195.015.314-.06.12-.09.195-.18.3-.09.105-.188.234-.269.314-.09.09-.184.188-.079.368.105.18.468.772 1.004 1.25.69.615 1.272.806 1.452.896.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.049.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.099.84zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.63 0-3.15-.477-4.43-1.298l-.317-.202-2.964.777.791-2.89-.221-.351A7.95 7.95 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
      </svg>
    </button>
  );
};
