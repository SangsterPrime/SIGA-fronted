import { Link } from 'react-router-dom';
import type { NavLink } from './NavLinks';

interface MobileMenuProps {
  open: boolean;
  links: NavLink[];
  ctaLabel: string;
  ctaTo: string;
  onClose: () => void;
}

/** Overlay de navegación a pantalla completa para móvil (estilo hero claro). */
export default function MobileMenu({
  open,
  links,
  ctaLabel,
  ctaTo,
  onClose,
}: MobileMenuProps) {
  return (
    <div
      className="fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-opacity duration-300"
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      aria-hidden={!open}
    >
      {links.map((l) => (
        <Link
          key={l.label}
          to={l.to}
          onClick={onClose}
          className="text-[32px] font-medium text-black"
        >
          {l.label}
        </Link>
      ))}
      <Link
        to={ctaTo}
        onClick={onClose}
        className="text-[32px] font-medium text-black underline underline-offset-2"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
