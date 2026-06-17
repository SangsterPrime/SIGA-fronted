import { useEffect, useState } from 'react';

/**
 * Parpadeo aleatorio para los personajes del login. Devuelve `true` durante ~150 ms
 * cada 3–7 s. Cada instancia lleva su propio ritmo, así los personajes no parpadean a la vez.
 */
export function useRandomBlink(): boolean {
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>;
    let closeTimeout: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay = Math.random() * 4000 + 3000; // 3–7 s
      blinkTimeout = setTimeout(() => {
        setBlinking(true);
        closeTimeout = setTimeout(() => {
          setBlinking(false);
          schedule();
        }, 150);
      }, delay);
    };

    schedule();
    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(closeTimeout);
    };
  }, []);

  return blinking;
}
