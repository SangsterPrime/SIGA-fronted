import { Link } from 'react-router-dom';

/** Wordmark de SIGA (texto display + asterisco decorativo) para el hero claro. */
export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="SIGA — inicio">
      <span
        className="text-[21px] sm:text-[26px] tracking-tight text-black"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        SIGA®
      </span>
      <span
        className="text-[25px] sm:text-[30px] text-black select-none"
        style={{ letterSpacing: '-0.02em' }}
        aria-hidden
      >
        ✳︎
      </span>
    </Link>
  );
}
