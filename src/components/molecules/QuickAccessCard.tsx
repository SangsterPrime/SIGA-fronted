import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import SpotlightCard from '../atoms/SpotlightCard';

interface QuickAccessCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  /** Marca de funcionalidad aún no disponible. */
  soon?: boolean;
}

/** Tarjeta de acceso rápido (icono + título + descripción) con foco al cursor. */
export default function QuickAccessCard({ icon: Icon, title, desc, soon = true }: QuickAccessCardProps) {
  return (
    <SpotlightCard className="group h-full p-5 transition-colors hover:border-white/20">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-xl border border-[#e8702a]/25 bg-[#e8702a]/15">
          <Icon className="size-5 text-[#e8702a]" />
        </span>
        {soon ? (
          <span className="text-[10px] uppercase tracking-wide text-white/35">Pronto</span>
        ) : (
          <ArrowUpRight className="size-4 text-white/25 transition-colors group-hover:text-white/70" />
        )}
      </div>
      <h3 className="mb-1 text-lg font-medium">{title}</h3>
      <p className="text-sm leading-relaxed text-white/55">{desc}</p>
    </SpotlightCard>
  );
}
