import { useTypewriter } from '../../hooks/useTypewriter';
import BlinkingCursor from '../atoms/BlinkingCursor';

/** Texto que se escribe carácter a carácter con cursor parpadeante. */
export default function Typewriter({ text }: { text: string }) {
  const { displayed, done } = useTypewriter(text);

  return (
    <p
      className="text-black mb-5 sm:mb-6"
      style={{
        fontSize: 'clamp(18px, 4vw, 26px)',
        lineHeight: 1.35,
        fontWeight: 400,
        minHeight: 54,
        // Halo claro: mantiene legible el texto negro sobre cuadros oscuros del video.
        textShadow: '0 1px 14px rgba(255,255,255,0.9), 0 0 2px rgba(255,255,255,0.9)',
      }}
      aria-label={text}
    >
      <span aria-hidden>{displayed}</span>
      {!done && <BlinkingCursor />}
    </p>
  );
}
