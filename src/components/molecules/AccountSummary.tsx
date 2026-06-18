import type { TipoUsuario, Usuario } from '../../lib/api';

const TIPO_LABEL: Record<TipoUsuario, string> = {
  PASAJERO: 'Pasajero',
  FUNCIONARIO: 'Funcionario',
  ADMINISTRADOR: 'Administrador',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });
}

/** Resumen de los datos reales de la cuenta (de /api/me). Molécula del dashboard. */
export default function AccountSummary({ user }: { user: Usuario }) {
  const rows: Array<[string, string]> = [
    ['Correo', user.correo],
    ['RUT', user.rut || '—'],
    ['Tipo de cuenta', TIPO_LABEL[user.tipoUsuario]],
    ...(user.rolFuncionario ? ([['Rol funcionario', user.rolFuncionario]] as Array<[string, string]>) : []),
    ['Estado', user.estadoCuenta === 'ACTIVA' ? 'Activa' : 'Deshabilitada'],
    ['Verificación 2FA', user.dosFaHabilitado ? 'Activada' : 'Desactivada'],
    ['Miembro desde', formatDate(user.fechaCreacion)],
  ];

  return (
    <dl className="divide-y divide-white/5">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between gap-4 py-2.5">
          <dt className="text-sm text-white/45">{label}</dt>
          <dd className="text-right text-sm font-medium text-white/85">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
