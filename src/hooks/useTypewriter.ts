import { useEffect, useState } from 'react';

/**
 * Revela un texto carácter a carácter tras un retardo inicial.
 * @param text   Texto completo a escribir.
 * @param speed  Milisegundos por carácter (def. 38).
 * @param startDelay Retardo antes de empezar a escribir (def. 600).
 */
export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      // Reset diferido (dentro del callback, no en el cuerpo del efecto).
      setDisplayed('');
      setDone(false);
      interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
