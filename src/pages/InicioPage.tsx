import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Bell,
  Car,
  FilePlus2,
  FileText,
  FolderOpen,
  Globe,
  History,
  Inbox,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { TipoUsuario } from '../lib/api';
import HeroVideoBackground from '../components/organisms/HeroVideoBackground';
import QuickAccessCard from '../components/molecules/QuickAccessCard';
import AccountSummary from '../components/molecules/AccountSummary';
import TramiteFlow from '../components/molecules/TramiteFlow';

const TIPO_LABEL: Record<TipoUsuario, string> = {
  PASAJERO: 'Pasajero',
  FUNCIONARIO: 'Funcionario',
  ADMINISTRADOR: 'Administrador',
};

interface ModuleItem {
  title: string;
  desc: string;
  icon: LucideIcon;
}

// Accesos por rol, alineados con los requisitos funcionales (RF-001…RF-010).
const MODULES: Record<TipoUsuario, ModuleItem[]> = {
  PASAJERO: [
    { title: 'Nueva declaración', desc: 'Inicia un trámite de menores, vehículo o declaración SAG.', icon: FilePlus2 },
    { title: 'Mis trámites', desc: 'Consulta el estado y el folio de tus trámites en curso.', icon: FileText },
    { title: 'Mis documentos', desc: 'Sube y administra cédulas, pasaportes y autorizaciones.', icon: FolderOpen },
    { title: 'Notificaciones', desc: 'Avisos por correo/SMS ante cada cambio de estado.', icon: Bell },
  ],
  FUNCIONARIO: [
    { title: 'Bandeja de revisión', desc: 'Trámites pendientes de fiscalización según tu rol.', icon: Inbox },
    { title: 'Validación Aduana Arg.', desc: 'Verifica el cruce con el sistema argentino.', icon: Globe },
    { title: 'Vehículos', desc: 'Inspección y registro de formularios de vehículos.', icon: Car },
    { title: 'Trazabilidad', desc: 'Historial completo de estados por trámite.', icon: History },
  ],
  ADMINISTRADOR: [
    { title: 'Usuarios', desc: 'Gestiona cuentas, roles y estados de acceso.', icon: Users },
    { title: 'Reportes', desc: 'Informes de ingresos, egresos y consolidados.', icon: BarChart3 },
    { title: 'Notificaciones', desc: 'Supervisa los avisos enviados a los usuarios.', icon: Bell },
    { title: 'Configuración', desc: 'Parámetros generales del sistema SIGA.', icon: Settings },
  ],
};

function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur-sm">
      {children}
    </span>
  );
}

/** Dashboard del usuario autenticado: hero con video + accesos por rol + datos de /api/me. */
export default function InicioPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // ProtectedRoute garantiza que `user` existe aquí.
  if (!user) return null;

  const handleLogout = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  const modules = MODULES[user.tipoUsuario];

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      {/* HERO con video de fondo */}
      <section className="relative h-[60vh] min-h-[440px] w-full overflow-hidden">
        <HeroVideoBackground />
        {/* Scrims para contraste del texto */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/40 to-[#0b0b0f]/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b0b0f]/70 via-transparent to-transparent" />

        {/* Barra superior */}
        <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
          <span className="text-2xl font-playfair italic">SIGA</span>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-white/70 sm:inline">{user.correo}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Saludo */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="mb-1 text-sm text-white/60">Sistema Integrado de Gestión Aduanera</p>
            <h1 className="mb-4 text-4xl font-playfair italic sm:text-6xl">
              Hola, {user.nombre.split(' ')[0]}
            </h1>
            <div className="flex flex-wrap gap-2">
              <Chip>{TIPO_LABEL[user.tipoUsuario]}</Chip>
              {user.rolFuncionario && <Chip>{`Rol: ${user.rolFuncionario}`}</Chip>}
              <Chip>{`Cuenta: ${user.estadoCuenta === 'ACTIVA' ? 'Activa' : 'Deshabilitada'}`}</Chip>
              <Chip>{user.dosFaHabilitado ? '2FA activado' : '2FA desactivado'}</Chip>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <main className="mx-auto max-w-6xl space-y-14 px-5 py-12 sm:px-8 sm:py-16">
        <section>
          <h2 className="mb-4 text-sm uppercase tracking-wide text-white/40">Accesos rápidos</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m) => (
              <QuickAccessCard key={m.title} icon={m.icon} title={m.title} desc={m.desc} />
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-4 text-sm uppercase tracking-wide text-white/40">Tu cuenta</h2>
            <AccountSummary user={user} />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
            <h2 className="mb-2 text-sm uppercase tracking-wide text-white/40">Ciclo de un trámite</h2>
            <p className="mb-6 text-sm leading-relaxed text-white/55">
              Cada trámite avanza por estos estados; cada cambio queda registrado para su
              trazabilidad y dispara una notificación al pasajero.
            </p>
            <TramiteFlow />
          </div>
        </section>
      </main>
    </div>
  );
}
