import { useEffect, useRef, useState } from 'react';

const initialPoint = () => ({ x: window.innerWidth / 2, y: window.innerHeight * 0.4 });

/**
 * Sigue el cursor (o el dedo en móvil) con suavizado para el efecto spotlight.
 * Arranca centrado para que el spotlight sea visible de inmediato en cualquier
 * dispositivo, y luego sigue el puntero/touch con un lerp del 10% por frame.
 */
export function useSpotlight() {
  const mouse = useRef(initialPoint());
  const smooth = useRef(initialPoint());
  const rafRef = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState(initialPoint);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) mouse.current = { x: t.clientX, y: t.clientY };
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return cursorPos;
}
