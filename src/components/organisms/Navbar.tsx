import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../atoms/Logo';
import Hamburger from '../atoms/Hamburger';
import NavLinks, { type NavLink } from '../molecules/NavLinks';
import MobileMenu from '../molecules/MobileMenu';
import { useAuth } from '../../context/AuthContext';

const LINKS: NavLink[] = [
  { label: 'Explorar', to: '/explorar' },
  { label: 'Pasajeros', to: '/ingresar' },
  { label: 'Funcionarios', to: '/ingresar' },
  { label: 'Ayuda', to: '/ingresar' },
];

/** Barra de navegación clara del hero principal (estilo "Mainframe"). */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const ctaLabel = user ? 'Mi panel' : 'Ingresar';
  const ctaTo = user ? '/inicio' : '/ingresar';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5">
        <Logo />
        <NavLinks links={LINKS} />
        <Link
          to={ctaTo}
          className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          {ctaLabel}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <Hamburger open={open} />
        </button>
      </nav>

      <MobileMenu
        open={open}
        links={LINKS}
        ctaLabel={ctaLabel}
        ctaTo={ctaTo}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
