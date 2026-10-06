import React, { useState, useEffect, useRef } from 'react';

export const Stats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-12 border-t border-b border-slate-200 max-w-[1520px] mx-auto w-full my-6"
      data-purpose="impact-metrics"
      aria-label="Impact and Sustainability Statistics"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Stat 1 */}
        <div className="space-y-1.5 transform transition-all duration-700">
          <div className="text-4xl md:text-5xl font-black text-[#0066FF] tracking-tight">
            {isVisible ? '250Cr+' : '0Cr+'}
          </div>
          <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
            Saved Together
          </div>
          <p className="text-[11px] text-slate-400">By sharing instead of buying outright</p>
        </div>

        {/* Stat 2 */}
        <div className="space-y-1.5 transform transition-all duration-700 delay-100">
          <div className="text-4xl md:text-5xl font-black text-[#0066FF] tracking-tight">
            {isVisible ? '4.5M Kg' : '0M Kg'}
          </div>
          <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
            CO2E Emissions Saved
          </div>
          <p className="text-[11px] text-slate-400">Lower e-waste & circular economy impact</p>
        </div>

        {/* Stat 3 */}
        <div className="space-y-1.5 transform transition-all duration-700 delay-200">
          <div className="text-4xl md:text-5xl font-black text-[#0066FF] tracking-tight">
            {isVisible ? '100K+' : '0K+'}
          </div>
          <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
            Products In Circulation
          </div>
          <p className="text-[11px] text-slate-400">Delivered across Bangalore & India</p>
        </div>
      </div>
    </section>
  );
};
