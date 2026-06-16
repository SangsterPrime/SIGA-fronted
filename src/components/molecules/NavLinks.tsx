import { Link } from 'react-router-dom';

export interface NavLink {
  label: string;
  to: string;
}

/** Lista de enlaces separados por comas (nav de escritorio del hero). */
export default function NavLinks({ links }: { links: NavLink[] }) {
  return (
    <div className="hidden md:flex text-[23px] text-black">
      {links.map((l, i) => (
        <span key={l.label}>
          <Link to={l.to} className="hover:opacity-60 transition-opacity">
            {l.label}
          </Link>
          {i < links.length - 1 && <span aria-hidden>{', '}</span>}
        </span>
      ))}
    </div>
  );
}
