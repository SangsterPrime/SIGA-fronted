import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'solid' | 'outline';

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200';

const variants: Record<Variant, string> = {
  // Píldora sólida: blanca → invierte a negro en hover.
  solid: 'bg-white text-black border border-black/10 hover:bg-black hover:text-white',
  // Píldora de contorno (negra para legibilidad sobre el video claro de SIGA).
  outline:
    'bg-transparent text-black border border-black/40 hover:bg-black hover:text-white gap-2 sm:gap-3',
};

/** Botón tipo "pill" reutilizable (acciones del hero). */
export default function PillButton({
  variant = 'solid',
  children,
  className = '',
  ...rest
}: PillButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
