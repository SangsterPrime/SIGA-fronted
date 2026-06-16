import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ExplorarPage from '../pages/ExplorarPage';
import LoginPage from '../pages/LoginPage';
import InicioPage from '../pages/InicioPage';
import ProtectedRoute from './ProtectedRoute';

/** Mapa de rutas de la aplicación. */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/explorar" element={<ExplorarPage />} />
      <Route path="/ingresar" element={<LoginPage />} />
      <Route
        path="/inicio"
        element={
          <ProtectedRoute>
            <InicioPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
