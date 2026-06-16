import { useCallback, useEffect, useRef } from 'react';

const SENSITIVITY = 0.8;

/**
 * Controla un <video> haciéndolo avanzar/retroceder con el movimiento
 * horizontal del cursor (desktop) o del dedo (móvil). El video NO reproduce
 * solo: cada desplazamiento del puntero mueve `currentTime`.
 *
 * Devuelve la ref para el <video> y el handler `onSeeked`, que encadena el
 * siguiente seek para evitar el "seek flooding" (saturar el decodificador).
 */
export function useScrubVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef(0);
  const seekingRef = useRef(false);
  const prevXRef = useRef<number | null>(null);

  const doSeek = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    if (Math.abs(v.currentTime - targetTimeRef.current) < 0.001) {
      seekingRef.current = false;
      return;
    }
    seekingRef.current = true;
    v.currentTime = targetTimeRef.current;
  }, []);

  const onSeeked = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    // Si el objetivo se movió mientras buscábamos, encadenamos otro seek.
    if (Math.abs(v.currentTime - targetTimeRef.current) > 0.01) {
      v.currentTime = targetTimeRef.current;
    } else {
      seekingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const apply = (clientX: number) => {
      const v = videoRef.current;
      if (!v || !v.duration) {
        prevXRef.current = clientX;
        return;
      }
      if (prevXRef.current === null) {
        prevXRef.current = clientX;
        return;
      }

      const delta = clientX - prevXRef.current;
      prevXRef.current = clientX;

      const offset = (delta / window.innerWidth) * SENSITIVITY * v.duration;
      let target = targetTimeRef.current + offset;
      target = Math.max(0, Math.min(v.duration, target));
      targetTimeRef.current = target;

      if (!seekingRef.current) doSeek();
    };

    const onMouse = (e: MouseEvent) => apply(e.clientX);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) apply(t.clientX);
    };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [doSeek]);

  return { videoRef, onSeeked };
}
