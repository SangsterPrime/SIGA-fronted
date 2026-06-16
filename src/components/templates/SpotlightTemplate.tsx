import type { ReactNode } from 'react';
import GlassNav from '../organisms/GlassNav';

/** Layout de la sección spotlight (oscura, tipografía Inter + Playfair). */
export default function SpotlightTemplate({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <GlassNav />
      {children}
    </div>
  );
}
