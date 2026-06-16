import { useEffect, useRef } from 'react';

interface AnimatedGridProps {
  /** Velocidad de desplazamiento en px/frame. */
  speed?: number;
  /** Tamaño de celda en px. */
  squareSize?: number;
  className?: string;
}

/**
 * Fondo de cuadrícula animada (canvas, sin dependencias externas).
 * Inspirado en el componente "Squares" de reactbits — implementación propia
 * porque el servidor MCP de reactbits sólo devuelve un placeholder.
 */
export default function AnimatedGrid({
  speed = 0.4,
  squareSize = 44,
  className = '',
}: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let offset = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const s = squareSize * dpr;

      ctx.clearRect(0, 0, w, h);
      offset = (offset + speed * dpr) % s;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.beginPath();
      for (let x = -s + offset; x < w; x += s) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = -s + offset; y < h; y += s) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [speed, squareSize]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
