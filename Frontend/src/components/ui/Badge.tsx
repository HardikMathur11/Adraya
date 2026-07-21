import React from 'react';

interface BadgeProps {
  variant?: 'verified' | 'quality-check' | 'in-progress' | 'default';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children }) => {
  const styles = {
    verified: 'bg-[#0B3D2E]/20 text-[#0B3D2E] border-[#0B3D2E]/40',
    'quality-check': 'bg-[#B5651D]/20 text-[#B5651D] border-[#B5651D]/40',
    'in-progress': 'bg-[#8A7A68]/20 text-[#8A7A68] border-[#8A7A68]/40',
    default: 'bg-[#C9A227]/20 text-[#3F0F17] border-[#C9A227]/40',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider border ${styles[variant]}`}
    >
      {children}
    </span>
  );
};
