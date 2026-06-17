import { useEffect, useRef, useState } from 'react';

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  /** Mirada forzada (override del seguimiento de mouse), p. ej. al espiar la contraseña. */
  forceLookX?: number;
  forceLookY?: number;
}

/** Pupila simple (sin esclerótica) que sigue el cursor. Átomo de los personajes del login. */
export default function Pupil({
  size = 12,
  maxDistance = 5,
  pupilColor = '#2D2D2D',
  forceLookX,
  forceLookY,
}: PupilProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const forced = forceLookX !== undefined && forceLookY !== undefined;

  useEffect(() => {
    if (forced) return;
    let frame = 0;
    let mx = 0;
    let my = 0;
    const handle = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = mx - (rect.left + rect.width / 2);
        const dy = my - (rect.top + rect.height / 2);
        const distance = Math.min(Math.hypot(dx, dy), maxDistance);
        const angle = Math.atan2(dy, dx);
        setOffset({ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance });
      });
    };
    window.addEventListener('mousemove', handle);
    return () => {
      window.removeEventListener('mousemove', handle);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [forced, maxDistance]);

  const x = forceLookX !== undefined ? forceLookX : offset.x;
  const y = forceLookY !== undefined ? forceLookY : offset.y;

  return (
    <div
      ref={ref}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
}
