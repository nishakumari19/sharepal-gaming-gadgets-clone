import React from 'react';

export const Breadcrumb: React.FC = () => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-[1520px] mx-auto w-full text-xs text-slate-400 py-2 flex items-center gap-1.5"
    >
      <a href="#" className="hover:text-purple-700 hover:underline transition">
        Bangalore
      </a>
      <span aria-hidden="true">&gt;</span>
      <span className="text-slate-600 font-semibold">Gaming gadgets on rent</span>
    </nav>
  );
};
