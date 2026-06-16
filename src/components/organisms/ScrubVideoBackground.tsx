import { useScrubVideo } from '../../hooks/useScrubVideo';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

/**
 * Video de fondo a pantalla completa controlado por scrub de mouse.
 * No reproduce solo: el movimiento horizontal del cursor avanza/retrocede.
 */
export default function ScrubVideoBackground() {
  const { videoRef, onSeeked } = useScrubVideo();

  return (
    <video
      ref={videoRef}
      onSeeked={onSeeked}
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 w-full h-full object-cover"
      style={{ zIndex: 0, objectPosition: '70% center' }}
      src={VIDEO_URL}
    />
  );
}
