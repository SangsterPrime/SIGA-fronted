import { useRef, useState, type MouseEventHandler, type PropsWithChildren } from 'react';

interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
  /** Color del foco que sigue al cursor (rgba). Por defecto, naranja SIGA. */
  spotlightColor?: string;
}

/**
 * Tarjeta con un foco radial que sigue al cursor (adaptado de ReactBits al tema oscuro
 * de SIGA). El rect se lee en el handler de mouse, no en render. Átomo de superficies.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(232,112,42,0.22)',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
