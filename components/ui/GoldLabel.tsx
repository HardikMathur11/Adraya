import React from 'react';
import { clsx } from 'clsx';

interface GoldLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const GoldLabel: React.FC<GoldLabelProps> = ({ children, className }) => {
  return (
    <span
      className={clsx(
        'inline-block px-2.5 py-0.5 text-[11px] font-semibold tracking-widest uppercase text-[var(--color-wine)] bg-gradient-to-r from-[var(--color-gold-light)] via-[var(--color-gold)] to-[var(--color-gold-light)] rounded-[2px] shadow-sm',
        className
      )}
    >
      {children}
    </span>
  );
};
