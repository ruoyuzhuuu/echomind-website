'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'icon';
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-from)] disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'px-6 py-3 rounded-full font-semibold text-sm text-black gradient-bg hover:brightness-110 active:scale-[0.98]',
    ghost: 'px-4 py-2 rounded-lg border border-[var(--border)] text-text hover:shadow-glow active:scale-[0.98]',
    icon: 'w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border)] hover:shadow-glow active:scale-[0.98]',
  };

  return (
    <motion.button
      whileHover={{ scale: variant === 'primary' ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
}
