import { useFadeLoopVideo } from '../../hooks/useFadeLoopVideo';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4';

/**
 * Fondo de video del hero del dashboard. El video ocupa 115% del contenedor, centrado
 * horizontalmente y anclado arriba (`object-top`), con el sistema de fundido de
 * {@link useFadeLoopVideo} (loop con fade-in/out por JS, sin transiciones CSS).
 */
export default function HeroVideoBackground() {
  const videoRef = useFadeLoopVideo();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute left-1/2 top-0 max-w-none -translate-x-1/2 object-cover object-top"
        style={{ width: '115%', height: '115%', opacity: 0 }}
        src={VIDEO_URL}
      />
    </div>
  );
}
