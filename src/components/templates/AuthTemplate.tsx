import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AnimatedGrid from '../atoms/AnimatedGrid';

/** Layout oscuro y centrado para autenticación (login). */
export default function AuthTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b0f] text-white relative overflow-hidden">
      {/* Cuadrícula animada de fondo. */}
      <AnimatedGrid className="absolute inset-0 w-full h-full" />
      {/* Acento de luz cálida (marca SIGA). */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(232,112,42,0.25), transparent 60%)' }}
      />
      <header className="relative z-10 p-5 sm:p-8">
        <Link to="/" className="text-2xl font-playfair italic" aria-label="SIGA — inicio">
          SIGA
        </Link>
      </header>
      <main className="relative z-10 flex-1 flex items-center justify-center px-5 pb-16">
        {children}
      </main>
    </div>
  );
}
