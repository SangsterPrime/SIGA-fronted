import { useEffect, useRef, useState, type RefObject } from 'react';
import EyeBall from '../atoms/EyeBall';
import Pupil from '../atoms/Pupil';
import { useRandomBlink } from '../../hooks/useRandomBlink';

interface AnimatedCharactersProps {
  /** El usuario está escribiendo en el formulario: los personajes se inclinan hacia él. */
  isTyping?: boolean;
  /** La contraseña está visible: los personajes miran hacia otro lado (y el morado espía). */
  peeking?: boolean;
}

interface FacePosition {
  faceX: number;
  faceY: number;
  bodySkew: number;
}

const ZERO: FacePosition = { faceX: 0, faceY: 0, bodySkew: 0 };

interface Positions {
  purple: FacePosition;
  black: FacePosition;
  yellow: FacePosition;
  orange: FacePosition;
}

const ZERO_POSITIONS: Positions = { purple: ZERO, black: ZERO, yellow: ZERO, orange: ZERO };

/**
 * Cuatro personajes que siguen el cursor con la mirada, parpadean al azar y reaccionan al
 * formulario (se inclinan al escribir; miran hacia otro lado cuando la contraseña es visible,
 * con el morado "espiando" de reojo). Organismo decorativo del login de SIGA.
 */
export default function AnimatedCharacters({ isTyping = false, peeking = false }: AnimatedCharactersProps) {
  const [positions, setPositions] = useState<Positions>(ZERO_POSITIONS);
  const [purplePeek, setPurplePeek] = useState(false);

  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  const purpleBlink = useRandomBlink();
  const blackBlink = useRandomBlink();

  // Posición de cuerpo/cara por personaje, calculada en el handler (no en render) y con rAF.
  useEffect(() => {
    let frame = 0;
    let mx = 0;
    let my = 0;
    const face = (ref: RefObject<HTMLDivElement | null>): FacePosition => {
      const el = ref.current;
      if (!el) return ZERO;
      const rect = el.getBoundingClientRect();
      const dx = mx - (rect.left + rect.width / 2);
      const dy = my - (rect.top + rect.height / 3); // zona de la "cabeza"
      return {
        faceX: Math.max(-15, Math.min(15, dx / 20)),
        faceY: Math.max(-10, Math.min(10, dy / 30)),
        bodySkew: Math.max(-6, Math.min(6, -dx / 120)),
      };
    };
    const handle = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setPositions({
          purple: face(purpleRef),
          black: face(blackRef),
          yellow: face(yellowRef),
          orange: face(orangeRef),
        });
      });
    };
    window.addEventListener('mousemove', handle);
    return () => {
      window.removeEventListener('mousemove', handle);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Cuando la contraseña es visible, el morado espía de reojo cada cierto tiempo.
  useEffect(() => {
    if (!peeking) return;
    let hide: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setPurplePeek(true);
      hide = setTimeout(() => setPurplePeek(false), 800);
    }, 2200);
    return () => {
      clearInterval(interval);
      clearTimeout(hide);
    };
  }, [peeking]);

  const { purple, black, yellow, orange } = positions;

  // Inclinación del cuerpo: recto al espiar, inclinado hacia el form al escribir.
  const lean = (skew: number) =>
    peeking ? 'skewX(0deg)' : isTyping ? `skewX(${skew - 4}deg) translateX(18px)` : `skewX(${skew}deg)`;

  // Mirada forzada cuando la contraseña es visible (todos miran hacia otro lado).
  const awayLook = peeking ? { forceLookX: -4, forceLookY: -4 } : {};
  const purpleLook = peeking
    ? purplePeek
      ? { forceLookX: 4, forceLookY: 5 } // espía hacia el campo
      : { forceLookX: -4, forceLookY: -4 }
    : {};

  return (
    <div className="relative" style={{ width: '550px', height: '400px' }}>
      {/* Morado — capa trasera */}
      <div
        ref={purpleRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: '70px',
          width: '180px',
          height: '400px',
          backgroundColor: '#6C3FF5',
          borderRadius: '10px 10px 0 0',
          zIndex: 1,
          transform: lean(purple.bodySkew),
          transformOrigin: 'bottom center',
        }}
      >
        <div
          className="absolute flex gap-8 transition-all duration-700 ease-in-out"
          style={{ left: `${45 + purple.faceX}px`, top: `${40 + purple.faceY}px` }}
        >
          <EyeBall size={18} pupilSize={7} maxDistance={5} isBlinking={purpleBlink} {...purpleLook} />
          <EyeBall size={18} pupilSize={7} maxDistance={5} isBlinking={purpleBlink} {...purpleLook} />
        </div>
      </div>

      {/* Negro — capa media */}
      <div
        ref={blackRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: '240px',
          width: '120px',
          height: '310px',
          backgroundColor: '#2D2D2D',
          borderRadius: '8px 8px 0 0',
          zIndex: 2,
          transform: lean(black.bodySkew),
          transformOrigin: 'bottom center',
        }}
      >
        <div
          className="absolute flex gap-6 transition-all duration-700 ease-in-out"
          style={{ left: `${26 + black.faceX}px`, top: `${32 + black.faceY}px` }}
        >
          <EyeBall size={16} pupilSize={6} maxDistance={4} isBlinking={blackBlink} {...awayLook} />
          <EyeBall size={16} pupilSize={6} maxDistance={4} isBlinking={blackBlink} {...awayLook} />
        </div>
      </div>

      {/* Naranjo — semicírculo frontal izquierdo (solo pupilas) */}
      <div
        ref={orangeRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: '0px',
          width: '240px',
          height: '200px',
          zIndex: 3,
          backgroundColor: '#FF9B6B',
          borderRadius: '120px 120px 0 0',
          transform: peeking ? 'skewX(0deg)' : `skewX(${orange.bodySkew}deg)`,
          transformOrigin: 'bottom center',
        }}
      >
        <div
          className="absolute flex gap-8 transition-all duration-200 ease-out"
          style={{ left: `${82 + orange.faceX}px`, top: `${90 + orange.faceY}px` }}
        >
          <Pupil size={12} maxDistance={5} {...awayLook} />
          <Pupil size={12} maxDistance={5} {...awayLook} />
        </div>
      </div>

      {/* Amarillo — frontal derecho (pupilas + boca) */}
      <div
        ref={yellowRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: '310px',
          width: '140px',
          height: '230px',
          backgroundColor: '#E8D754',
          borderRadius: '70px 70px 0 0',
          zIndex: 4,
          transform: peeking ? 'skewX(0deg)' : `skewX(${yellow.bodySkew}deg)`,
          transformOrigin: 'bottom center',
        }}
      >
        <div
          className="absolute flex gap-6 transition-all duration-200 ease-out"
          style={{ left: `${52 + yellow.faceX}px`, top: `${40 + yellow.faceY}px` }}
        >
          <Pupil size={12} maxDistance={5} {...awayLook} />
          <Pupil size={12} maxDistance={5} {...awayLook} />
        </div>
        <div
          className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
          style={{ left: `${40 + yellow.faceX}px`, top: `${88 + yellow.faceY}px` }}
        />
      </div>
    </div>
  );
}
