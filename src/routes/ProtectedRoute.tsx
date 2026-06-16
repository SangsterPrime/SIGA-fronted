import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/atoms/Spinner';

/** Restringe el acceso a usuarios autenticados; si no, redirige al login. */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0f] text-white">
        <Spinner label="Verificando sesión…" />
      </div>
    );
  }

  if (!user) return <Navigate to="/ingresar" replace />;

  return <>{children}</>;
}
