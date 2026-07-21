import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans uppercase font-bold tracking-[0.15em] transition-all duration-300 rounded-[6px] focus:outline-none cursor-pointer';

  const variants = {
    primary:
      'bg-[#6B1E28] text-[#F7F1E6] border border-[#C9A227]/40 hover:bg-[#3F0F17] hover:border-[#C9A227] shadow-md hover:shadow-lg',
    secondary:
      'bg-[#F7F1E6] text-[#6B1E28] border border-[#6B1E28]/40 hover:bg-[#FBF7EF] hover:border-[#6B1E28]',
    gold:
      'bg-[#C9A227] text-[#3F0F17] border border-[#3F0F17]/30 hover:bg-[#E8D8A8] shadow-md font-bold',
    outline:
      'bg-transparent text-[#F7F1E6] border border-[#C9A227]/60 hover:border-[#C9A227] hover:text-[#C9A227]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-7 py-3 text-xs sm:text-sm',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};
