import { useCallback, useEffect, useState } from 'react';
import FaultyTerminal from '../atoms/FaultyTerminal';

const SEEN_KEY = 'siga_intro_seen';
const HOLD_MS = 3400; // tiempo visible antes del fade-out
const FADE_MS = 700; // duración del fade-out

/**
 * Intro a pantalla completa al abrir el sitio: acrónimo SIGA + nombre completo
 * sobre un fondo "FaultyTerminal". Se muestra una vez por sesión y se puede
 * saltar tocando/clic. Respeta prefers-reduced-motion (se omite el terminal).
 */
export default function IntroSplash() {
  const [visible, setVisible] = useState(
    () => typeof window !== 'undefined' && !sessionStorage.getItem(SEEN_KEY),
  );
  const [leaving, setLeaving] = useState(false);

  const dismiss = useCallback(() => {
    setLeaving(true);
    sessionStorage.setItem(SEEN_KEY, '1');
    window.setTimeout(() => setVisible(false), FADE_MS);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(dismiss, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [visible, dismiss]);

  if (!visible) return null;

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      onClick={dismiss}
      role="button"
      tabIndex={0}
      aria-label="Saltar introducción"
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center cursor-pointer transition-opacity ease-out"
      style={{ opacity: leaving ? 0 : 1, transitionDuration: `${FADE_MS}ms` }}
    >
      {/* Fondo FaultyTerminal (se omite si el usuario pide menos movimiento). */}
      {!reduced && (
        <div className="absolute inset-0">
          <FaultyTerminal
            scale={1.6}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={0.5}
            scanlineIntensity={0.6}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            curvature={0.12}
            tint="#e8702a"
            mouseReact
            mouseStrength={0.4}
            pageLoadAnimation
            brightness={0.72}
          />
        </div>
      )}

      {/* Viñeta para asegurar contraste del texto. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.78))]" />

      <div className="relative z-10 text-center px-6 select-none">
        <h1
          className="text-white font-playfair italic text-6xl sm:text-8xl tracking-tight hero-anim hero-reveal"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.7)', animationDelay: '0.1s' }}
        >
          SIGA
        </h1>
        <p
          className="mt-3 sm:mt-4 text-white/90 text-sm sm:text-xl tracking-[0.2em] uppercase hero-anim hero-fade"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.85)', animationDelay: '0.5s' }}
        >
          Sistema Integrado de Gestión Aduanera
        </p>
        <p className="mt-8 text-white/45 text-xs tracking-wider">toca para entrar</p>
      </div>
    </div>
  );
}
