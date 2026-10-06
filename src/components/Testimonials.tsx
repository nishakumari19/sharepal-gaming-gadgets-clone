import React, { useRef } from 'react';
import { TESTIMONIALS } from '../data/staticContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 max-w-[1520px] mx-auto w-full" data-purpose="social-proof" aria-labelledby="testimonials-heading">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Served more than <span className="text-orange-500">1 Lakh Orders</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Real customer verified reviews from Bangalore and across India on Google Reviews
          </p>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Previous testimonials"
            className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Next testimonials"
            className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Testimonials Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {TESTIMONIALS.map((review) => (
          <div
            key={review.id}
            className="min-w-[280px] sm:min-w-[340px] md:min-w-[360px] max-w-[360px] bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between snap-start"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-black text-[#4285F4] text-lg select-none">G</span>
                <div className="text-amber-400 text-sm font-bold tracking-tight">★★★★★</div>
                <span className="text-[11px] text-slate-400 font-medium ml-auto">Verified Google Review</span>
              </div>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium line-clamp-4">
                {review.quote}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100">
              <div
                className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center select-none shadow-2xs ${review.avatarBgColor}`}
              >
                {review.initials}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">{review.name}</div>
                <div className="text-[11px] text-slate-400">{review.cityAndCategory}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
