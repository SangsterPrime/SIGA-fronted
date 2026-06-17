import { useCallback, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Check } from 'lucide-react';

interface WelcomeCelebrationProps {
  nombre?: string;
  onContinue: () => void;
}

/**
 * Pantalla de bienvenida con confetti tras crear la cuenta. Estilo SIGA (tema oscuro).
 * El botón "Continuar al dashboard" delega la navegación en {@code onContinue}.
 */
export default function WelcomeCelebration({ nombre, onContinue }: WelcomeCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const canvasRef = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
    void myConfetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#e8702a', '#6C3FF5', '#E8D754', '#FF9B6B', '#ffffff'],
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0b0f] text-white p-6">
      {showConfetti && (
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 10 }} />
      )}

      <div className="relative z-20 w-full max-w-md text-center space-y-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 border border-green-400/30">
          <Check className="h-8 w-8 text-green-400" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-playfair italic">¡Tu cuenta ha sido creada!</h1>
          <p className="text-white/60 leading-relaxed">
            {nombre ? `Bienvenido/a, ${nombre}. ` : 'Bienvenido/a a SIGA. '}
            Tu cuenta quedó lista para gestionar trámites, revisiones y reportes.
          </p>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="group w-full h-12 inline-flex items-center justify-center gap-2 rounded-full bg-[#e8702a] text-white font-semibold transition-colors hover:bg-[#d8631f]"
        >
          Continuar al dashboard
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
