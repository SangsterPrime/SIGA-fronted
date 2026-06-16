import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { TipoUsuario } from '../lib/api';

const TIPO_LABEL: Record<TipoUsuario, string> = {
  PASAJERO: 'Pasajero',
  FUNCIONARIO: 'Funcionario',
  ADMINISTRADOR: 'Administrador',
};

const MODULES: Record<TipoUsuario, { title: string; desc: string }[]> = {
  PASAJERO: [
    { title: 'Mis trámites', desc: 'Revisa el estado de tus declaraciones aduaneras.' },
    { title: 'Nueva declaración', desc: 'Inicia un trámite de ingreso o salida de bienes.' },
    { title: 'Mis documentos', desc: 'Sube y administra los documentos requeridos.' },
  ],
  FUNCIONARIO: [
    { title: 'Bandeja de revisión', desc: 'Trámites pendientes de validación según tu rol.' },
    { title: 'Vehículos', desc: 'Consulta y registra inspecciones de vehículos.' },
    { title: 'Historial', desc: 'Trazabilidad de estados por trámite.' },
  ],
  ADMINISTRADOR: [
    { title: 'Usuarios', desc: 'Gestiona cuentas, roles y estados de acceso.' },
    { title: 'Reportes', desc: 'Estadísticas e indicadores del sistema.' },
    { title: 'Configuración', desc: 'Parámetros generales de SIGA.' },
  ],
};

function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

/** Panel del usuario autenticado. Muestra los datos reales de /api/me. */
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
      <header className="flex items-center justify-between px-5 sm:px-8 py-5 border-b border-white/10">
        <span className="text-2xl font-playfair italic">SIGA</span>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm text-white/60">{user.correo}</span>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm rounded-full border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <p className="text-sm text-white/50 mb-2">Sistema Integrado de Gestión Aduanera</p>
        <h1 className="text-4xl sm:text-5xl font-playfair italic mb-6">
          Hola, {user.nombre.split(' ')[0]}
        </h1>

        <div className="flex flex-wrap gap-2 mb-12">
          <Chip>{TIPO_LABEL[user.tipoUsuario]}</Chip>
          {user.rolFuncionario && <Chip>{`Rol: ${user.rolFuncionario}`}</Chip>}
          <Chip>{`Cuenta: ${user.estadoCuenta}`}</Chip>
          <Chip>{user.dosFaHabilitado ? '2FA activado' : '2FA desactivado'}</Chip>
        </div>

        <h2 className="text-sm uppercase tracking-wide text-white/40 mb-4">
          Accesos rápidos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <div
              key={m.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">{m.title}</h3>
                <span className="text-[10px] uppercase tracking-wide text-[#e8702a]">
                  Próximamente
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
