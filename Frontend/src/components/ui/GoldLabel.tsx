import React from 'react';

export const GoldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span className="inline-block text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#E8D8A8] bg-[#6B1E28] px-2.5 py-0.5 rounded border border-[#C9A227]/30">
      {children}
    </span>
  );
};
