import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverEffect = true }) => {
  return (
    <div
      className={clsx(
        'bg-[var(--color-cream)] border border-[var(--color-gold)]/20 rounded-[var(--radius-card)] overflow-hidden shadow-fabric transition-all duration-300',
        hoverEffect && 'hover:-translate-y-1 hover:border-[var(--color-gold)]/50 hover:shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
};
