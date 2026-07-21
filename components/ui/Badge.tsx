import React from 'react';
import { clsx } from 'clsx';
import { ShieldCheck, Sparkles, Award } from 'lucide-react';

export interface BadgeProps {
  variant?: 'verified' | 'limited' | 'in-progress' | 'quality-check' | 'ready-to-ship' | 'default';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className }) => {
  const baseClasses =
    'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full transition-colors';

  const variants = {
    verified: 'bg-[var(--color-emerald)]/10 text-[var(--color-emerald)] border border-[var(--color-emerald)]/30',
    limited: 'bg-[var(--color-gold)]/15 text-[var(--color-wine)] border border-[var(--color-gold)]/40',
    // Custom Heritage Status Badges (Strictly taupe, gold, emerald - NO default red/yellow/green)
    'in-progress': 'bg-[var(--color-taupe)]/20 text-[var(--color-charcoal)] border border-[var(--color-taupe)]/40',
    'quality-check': 'bg-[var(--color-gold)]/20 text-[var(--color-wine)] border border-[var(--color-gold)]/50',
    'ready-to-ship': 'bg-[var(--color-emerald)]/15 text-[var(--color-emerald)] border border-[var(--color-emerald)]/40',
    default: 'bg-[var(--color-cream)] text-[var(--color-charcoal)] border border-[var(--color-taupe)]/30',
  };

  return (
    <span className={clsx(baseClasses, variants[variant], className)}>
      {variant === 'verified' && <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-emerald)]" />}
      {variant === 'limited' && <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold)]" />}
      {variant === 'quality-check' && <Award className="w-3.5 h-3.5 text-[var(--color-gold)]" />}
      {children}
    </span>
  );
};
