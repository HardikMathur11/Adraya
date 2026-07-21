import React from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const sizes = {
    sm: 'px-4 py-2 text-xs font-semibold rounded-[4px]',
    md: 'px-6 py-3 text-xs font-semibold rounded-[4px]',
    lg: 'px-8 py-4 text-sm font-semibold rounded-[6px]',
  };

  const variants = {
    primary:
      'bg-[var(--color-oxblood)] text-[var(--color-ivory)] border border-[var(--color-gold)]/40 hover:bg-[var(--color-wine)] hover:border-[var(--color-gold)] shadow-md hover:shadow-lg',
    secondary:
      'bg-transparent text-[var(--color-wine)] border border-[var(--color-wine)]/60 hover:bg-[var(--color-wine)] hover:text-[var(--color-ivory)]',
    gold:
      'bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] text-[var(--color-wine)] font-bold border border-[var(--color-gold-light)] hover:brightness-105 shadow-md',
    ghost:
      'bg-transparent text-[var(--color-charcoal)] hover:text-[var(--color-oxblood)] hover:bg-[var(--color-cream)]',
  };

  return (
    <button className={clsx(baseClasses, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
