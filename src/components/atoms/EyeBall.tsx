import { useEffect, useRef, useState } from 'react';

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  /** Mirada forzada (override del seguimiento de mouse). */
  forceLookX?: number;
  forceLookY?: number;
}

/** Ojo con esclerótica + pupila que sigue el cursor y parpadea. Átomo de los personajes. */
export default function EyeBall({
  size = 18,
  pupilSize = 7,
  maxDistance = 5,
  eyeColor = 'white',
  pupilColor = '#2D2D2D',
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) {
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
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${x}px, ${y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
}
