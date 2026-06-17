import { GOOGLE_LOGIN_URL } from '../../config/api';

/** Logo oficial de Google (multicolor). */
function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.85.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95L3.97 7.28C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

/**
 * Botón real de "Continuar con Google": redirige a {@code GOOGLE_LOGIN_URL} (delegado al
 * backend SIGA, sesión por cookie). Se mantiene tal cual el flujo OAuth2 existente.
 */
export default function GoogleButton({ label = 'Continuar con Google' }: { label?: string }) {
  return (
    <a
      href={GOOGLE_LOGIN_URL}
      className="w-full inline-flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold rounded-full px-6 py-3 hover:bg-gray-100 transition-colors"
    >
      <GoogleGlyph />
      {label}
    </a>
  );
}
