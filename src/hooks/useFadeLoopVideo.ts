import { useEffect, useRef } from 'react';

const FADE_MS = 250; // duración del fade-in / fade-out
const FADE_OUT_LEAD = 0.55; // segundos restantes para iniciar el fade-out

/**
 * Controla un <video> con un sistema de fundido propio basado en requestAnimationFrame
 * (sin transiciones CSS):
 *  - fade-in de 250 ms al cargar / al reiniciar el loop;
 *  - fade-out de 250 ms cuando faltan 0.55 s para el final;
 *  - `fadingOutRef` evita re-disparar el fade-out por múltiples eventos `timeupdate`;
 *  - en `ended`: opacity 0 → espera 100 ms → currentTime 0 → play → fade-in;
 *  - cada nuevo fundido cancela los frames en curso para que no compitan.
 *
 * El <video> NO debe llevar el atributo `loop` (el reinicio se gestiona en `ended`).
 */
export function useFadeLoopVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef(0);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const cancelFade = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const fade = (to: number) => {
      cancelFade(); // cada nuevo fundido cancela el anterior
      const from = Number(v.style.opacity || '0');
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / FADE_MS);
        v.style.opacity = String(from + (to - from) * p);
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
        else rafRef.current = 0;
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const startPlayback = () => {
      fadingOutRef.current = false;
      v.style.opacity = '0';
      v.play().catch(() => {
        /* Autoplay bloqueado: queda en el primer frame con opacity 0. */
      });
      fade(1);
    };

    const onLoaded = () => startPlayback();

    const onTimeUpdate = () => {
      if (!v.duration) return;
      if (v.duration - v.currentTime <= FADE_OUT_LEAD && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fade(0);
      }
    };

    const onEnded = () => {
      cancelFade();
      v.style.opacity = '0';
      setTimeout(() => {
        v.currentTime = 0;
        startPlayback();
      }, 100);
    };

    v.addEventListener('loadeddata', onLoaded);
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('ended', onEnded);
    if (v.readyState >= 2) onLoaded();

    return () => {
      cancelFade();
      v.removeEventListener('loadeddata', onLoaded);
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  return videoRef;
}
