import type { ReactNode } from 'react';
import Navbar from '../organisms/Navbar';
import ScrubVideoBackground from '../organisms/ScrubVideoBackground';

/**
 * Layout del hero principal: video de fondo (scrub) + navbar claro + slot de
 * contenido alineado abajo en móvil y centrado en escritorio.
 */
export default function HeroTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrubVideoBackground />
      <Navbar />
      <main className="relative z-[1] h-dvh flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
        {/* Wash para asegurar contraste del texto negro sobre el video.
            En móvil el texto va abajo → degradado vertical fuerte;
            en escritorio va a la izquierda → degradado horizontal. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/95 via-white/55 to-white/10 md:bg-gradient-to-r md:from-white/85 md:via-white/40 md:to-transparent" />
        <div className="max-w-xl relative z-10">{children}</div>
      </main>
    </>
  );
}
