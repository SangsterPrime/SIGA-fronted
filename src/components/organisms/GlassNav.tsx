import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PILL_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Explorar', to: '/explorar' },
  { label: 'Trámites', to: '/ingresar' },
  { label: 'Pasajeros', to: '/ingresar' },
  { label: 'Ayuda', to: '/ingresar' },
];

// Enlace activo por defecto (la página actual es "Explorar").
const ACTIVE_INDEX = 1;

/** Navegación translúcida (texto blanco) sobre la sección spotlight oscura. */
export default function GlassNav() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const ctaLabel = user ? 'Mi panel' : 'Ingresar';
  const ctaTo = user ? '/inicio' : '/ingresar';

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
      {/* Logo + wordmark */}
      <Link to="/" className="flex items-center gap-2" aria-label="SIGA — inicio">
        <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" aria-hidden>
          <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
        </svg>
        <span className="text-white text-2xl font-playfair italic">SIGA</span>
      </Link>

      {/* Píldora central (escritorio) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
        {PILL_LINKS.map((l, i) => (
          <Link
            key={l.label}
            to={l.to}
            className={
              i === ACTIVE_INDEX
                ? 'text-white bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium'
                : 'text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium'
            }
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* CTA derecha (escritorio) */}
      <Link
        to={ctaTo}
        className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
      >
        {ctaLabel}
      </Link>

      {/* Hamburguesa (móvil) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="md:hidden text-white"
        aria-label="Abrir menú"
        aria-expanded={open}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Panel móvil */}
      {open && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-black/80 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex flex-col gap-1">
          {PILL_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-white/85 hover:bg-white/10 rounded-lg px-4 py-2.5 text-base font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to={ctaTo}
            onClick={() => setOpen(false)}
            className="mt-1 bg-white text-gray-900 text-center font-semibold rounded-full px-4 py-2.5"
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </nav>
  );
}
