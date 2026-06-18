// Camino feliz del ciclo de vida de un trámite (estados reales del dominio SIGA).
const STEPS = ['Borrador', 'Pendiente', 'En revisión', 'Validación externa', 'Aprobado'];

/** Línea de tiempo del ciclo de un trámite aduanero. Molécula informativa del dashboard. */
export default function TramiteFlow() {
  return (
    <ol className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-0">
      {STEPS.map((step, i) => (
        <li key={step} className="flex items-center gap-3 sm:flex-1">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#e8702a]/40 bg-[#e8702a]/10 text-xs font-medium text-[#e8702a]">
            {i + 1}
          </span>
          <span className="whitespace-nowrap text-sm text-white/70">{step}</span>
          {i < STEPS.length - 1 && <span className="mx-3 hidden h-px flex-1 bg-white/10 sm:block" />}
        </li>
      ))}
    </ol>
  );
}
