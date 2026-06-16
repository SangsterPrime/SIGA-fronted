import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import IntroSplash from './components/organisms/IntroSplash';

/** Raíz de la app: intro de bienvenida + sesión (auth) + enrutamiento. */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <IntroSplash />
    </AuthProvider>
  );
}
