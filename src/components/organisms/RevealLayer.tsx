const SPOTLIGHT_R = 260;

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
}

/**
 * Capa que revela una segunda imagen a través de una máscara circular suave que sigue al
 * cursor (o el dedo en móvil). La máscara es un `radial-gradient` de CSS posicionado en el
 * cursor: barato y fluido también en móvil (antes se regeneraba un PNG con canvas.toDataURL()
 * en cada frame, lo que provocaba jank en celulares).
 */
export default function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
  const mask = `radial-gradient(circle ${SPOTLIGHT_R}px at ${cursorX}px ${cursorY}px, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, rgba(255,255,255,0) 100%)`;

  return (
    <div
      className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
      style={{
        backgroundImage: `url(${image})`,
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
    />
  );
}
