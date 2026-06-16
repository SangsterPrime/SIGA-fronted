/** Icono de menú de 3 barras que se transforma en "X" al abrir. */
export default function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col gap-[5px]">
      <span
        className={`w-6 h-[2px] bg-black transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`}
      />
      <span
        className={`w-6 h-[2px] bg-black transition-all duration-300 ${open ? 'opacity-0' : ''}`}
      />
      <span
        className={`w-6 h-[2px] bg-black transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}
      />
    </span>
  );
}
