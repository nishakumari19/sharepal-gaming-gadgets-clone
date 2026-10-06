import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/staticContent';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? FAQ_ITEMS : FAQ_ITEMS.slice(0, 5);

  const toggleItem = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <section
      className="mt-8 bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xs max-w-5xl mx-auto w-full"
      data-purpose="faq-accordion"
      aria-labelledby="faq-heading"
    >
      <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
        Frequently Asked Questions (FAQs)
      </h2>

      <div className="divide-y divide-slate-100">
        {displayedItems.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="faq-item py-4">
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between text-left gap-4 font-semibold text-base md:text-lg text-slate-800 hover:text-purple-700 transition focus:outline-none focus:text-purple-800"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-purple-700' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="faq-answer text-slate-600 text-sm md:text-base mt-2.5 leading-relaxed pr-6 animate-in fade-in duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm rounded-xl transition border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
        >
          {showAll ? "View less FAQ's" : "View more FAQ's"}
        </button>
      </div>
    </section>
  );
};
