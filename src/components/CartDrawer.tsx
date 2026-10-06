import React from 'react';
import { useRental } from '../context/RentalContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Calendar, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    rentalDates,
    setIsDateModalOpen,
    showToast,
  } = useRental();

  if (!isCartOpen) return null;

  const rentalDays = rentalDates.days > 0 ? rentalDates.days : 1;
  const hasDatesSelected = Boolean(rentalDates.deliveryDate && rentalDates.pickupDate && rentalDates.days > 0);

  const handleCheckout = () => {
    if (!hasDatesSelected) {
      showToast('Please select your rental dates before checkout.');
      setIsDateModalOpen(true);
      return;
    }

    showToast(`Order placed successfully! Confirmation sent to WhatsApp. Subtotal: ₹${cartTotal.toLocaleString()}`);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      {/* Drawer Container */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-purple-700" />
            <h2 id="cart-title" className="font-bold text-lg text-slate-900">
              Your Rental Cart
            </h2>
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Dates Alert / Reminder */}
          {!hasDatesSelected ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
              <Calendar className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold">Rental dates not selected.</span>
                <p className="mt-0.5 text-amber-800">
                  Select your Bangalore delivery and pickup dates to calculate the final rental price.
                </p>
                <button
                  type="button"
                  onClick={() => setIsDateModalOpen(true)}
                  className="mt-1.5 font-bold text-purple-700 hover:underline inline-block"
                >
                  Select Dates Now →
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 flex items-center justify-between text-xs text-purple-900">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="font-semibold">
                  Rental Period: {rentalDates.days} {rentalDates.days > 1 ? 'Days' : 'Day'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsDateModalOpen(true)}
                className="text-purple-700 font-bold hover:underline"
              >
                Change
              </button>
            </div>
          )}

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                🎮
              </div>
              <h3 className="text-base font-bold text-slate-800">Your cart is currently empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our catalog of PS5, Xbox Series X, Meta Quest VR and gaming accessories to get started.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-full transition shadow-xs"
              >
                Browse Gaming Gadgets
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 space-y-3">
              {cart.map((item) => {
                const itemDailyRate = Math.round(item.product.per_day_rent);
                const lineTotal = itemDailyRate * item.quantity * rentalDays;

                return (
                  <div key={item.product.id} className="pt-3 flex gap-3 items-center">
                    {/* Item Image */}
                    <div className="w-16 h-16 bg-slate-50 rounded-xl p-1.5 border border-slate-100 flex items-center justify-center shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate" title={item.product.name}>
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        ₹{itemDailyRate}/day × {rentalDays} {rentalDays > 1 ? 'days' : 'day'}
                      </div>
                      <div className="text-xs font-extrabold text-purple-900 mt-0.5">
                        ₹{lineTotal.toLocaleString()}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 rounded flex items-center justify-center bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition shadow-2xs"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-800 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 rounded flex items-center justify-center bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition shadow-2xs"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-slate-400 hover:text-red-500 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/70 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Doorstep Delivery & Return</span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Security Deposit</span>
                <span className="text-emerald-600 font-bold">₹0 (Zero Deposit)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Rental Duration</span>
                <span className="font-semibold text-slate-800">{rentalDays} Days</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                <span>Total Payable</span>
                <span className="text-purple-800 text-base">₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% verified gear with sanitization guarantee</span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full bg-[#5B21B6] hover:bg-[#4C1D95] text-white font-bold py-3 px-4 rounded-full shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
