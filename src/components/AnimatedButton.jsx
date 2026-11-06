import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function AnimatedButton({
  children,
  onClick,
  href,
  target,
  rel,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon = true,
  iconComponent: CustomIcon,
  className = '',
  disabled = false,
  type = 'button'
}) {
  const baseStyles = "relative inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 transform active:scale-95 group focus:outline-none focus:ring-2 focus:ring-dentist-500/50 disabled:opacity-50 disabled:pointer-events-none select-none overflow-hidden cursor-pointer";

  const sizeStyles = {
    sm: "py-2 px-3.5 text-xs gap-1.5",
    md: "py-3 px-5 text-xs sm:text-sm gap-2",
    lg: "py-3.5 px-7 text-sm sm:text-base gap-2.5",
  }[size] || "py-3 px-5 text-sm gap-2";

  const variantStyles = {
    primary: "bg-gradient-to-r from-dentist-600 via-dentist-600 to-dentist-700 text-white shadow-md shadow-dentist-600/25 hover:shadow-xl hover:shadow-dentist-600/35 hover:-translate-y-0.5 hover:from-dentist-700 hover:to-dentist-800",
    secondary: "bg-dentist-50 text-dentist-800 border border-dentist-200/80 hover:bg-dentist-100 hover:border-dentist-300 hover:-translate-y-0.5",
    outline: "bg-white text-slate-800 border border-slate-200/90 shadow-xs hover:border-dentist-500 hover:text-dentist-700 hover:shadow-md hover:-translate-y-0.5",
    whatsapp: "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/35 hover:-translate-y-0.5",
    ghost: "text-slate-600 hover:text-dentist-700 hover:bg-slate-100/80"
  }[variant] || "bg-dentist-600 text-white";

  const content = (
    <>
      {/* Subtle shine sheen effect on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

      {/* Button Text */}
      <span className="relative z-10 transition-transform duration-200 group-hover:scale-[1.01]">
        {children}
      </span>

      {/* Animated Arrow Icon */}
      {icon && (
        <span className="relative z-10 transform transition-transform duration-300 ease-out group-hover:translate-x-1.5 shrink-0">
          {CustomIcon ? (
            <CustomIcon className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        data-interactive="true"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      data-interactive="true"
    >
      {content}
    </button>
  );
}

