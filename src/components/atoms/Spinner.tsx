/** Indicador de carga que hereda el color del contenedor (sirve en claro/oscuro). */
export default function Spinner({ label = 'Cargando…' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3" role="status" aria-live="polite">
      <span
        className="w-4 h-4 rounded-full border-2 animate-spin"
        style={{ borderColor: 'currentColor', borderTopColor: 'transparent', opacity: 0.7 }}
      />
      <span className="text-sm opacity-70">{label}</span>
    </div>
  );
}
