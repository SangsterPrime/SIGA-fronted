import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedCharacters from '../components/organisms/AnimatedCharacters';
import WelcomeCelebration from '../components/organisms/WelcomeCelebration';
import AuthTabs, { type AuthTab } from '../components/molecules/AuthTabs';
import LoginForm from '../components/molecules/LoginForm';
import RegisterForm from '../components/molecules/RegisterForm';
import GoogleButton from '../components/atoms/GoogleButton';
import { loginManual, registrar, type LoginData, type RegisterData } from '../lib/api';
import { useAuth } from '../context/AuthContext';

/**
 * Login de SIGA con dos métodos reales: Google OAuth2 y registro/login manual (correo +
 * contraseña), con animación de personajes. Tras crear cuenta muestra una bienvenida.
 */
export default function LoginPage() {
  const { user, loading, refresh } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<AuthTab>('login');
  const [isTyping, setIsTyping] = useState(false);
  const [peeking, setPeeking] = useState(false);
  const [justRegistered, setJustRegistered] = useState(false);
  const [registeredName, setRegisteredName] = useState<string>();

  // Si ya hay sesión activa, ir al panel (salvo que estemos mostrando la bienvenida).
  useEffect(() => {
    if (!loading && user && !justRegistered) navigate('/inicio', { replace: true });
  }, [user, loading, justRegistered, navigate]);

  const handleLogin = async (data: LoginData) => {
    await loginManual(data); // lanza error -> lo muestra el formulario
    await refresh(); // carga el usuario; el efecto de arriba redirige a /inicio
  };

  const handleRegister = async (data: RegisterData) => {
    const res = await registrar(data); // lanza error -> lo muestra el formulario
    setRegisteredName(res.user.name);
    setJustRegistered(true); // suprime el redirect automático para mostrar la bienvenida
    await refresh();
  };

  if (justRegistered) {
    return <WelcomeCelebration nombre={registeredName} onContinue={() => navigate('/inicio', { replace: true })} />;
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#0b0b0f] text-white">
      {/* Panel izquierdo: personajes animados (oculto en móvil) */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14141c] via-[#0b0b0f] to-[#0b0b0f]" />
        <div
          className="pointer-events-none absolute -top-32 left-1/3 w-[560px] h-[560px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(232,112,42,0.18), transparent 60%)' }}
        />

        <div className="relative z-10">
          <Link to="/" className="text-2xl font-playfair italic" aria-label="SIGA — inicio">
            SIGA
          </Link>
        </div>

        <div className="relative z-10 flex items-end justify-center h-[440px]">
          <AnimatedCharacters isTyping={isTyping} peeking={peeking} />
        </div>

        <p className="relative z-10 text-sm text-white/40">Sistema Integrado de Gestión Aduanera</p>
      </div>

      {/* Panel derecho: info SIGA + autenticación */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Link to="/" className="text-2xl font-playfair italic" aria-label="SIGA — inicio">
              SIGA
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl font-playfair italic mb-2">Ingresar a SIGA</h1>
          <p className="text-white/60 text-sm mb-8 leading-relaxed">
            Sistema Integrado de Gestión Aduanera. Accede con tu cuenta de Google o con tu
            correo para gestionar trámites, revisiones y reportes.
          </p>

          <div className="mb-6">
            <AuthTabs active={tab} onChange={setTab} />
          </div>

          {tab === 'login' ? (
            <LoginForm onSubmit={handleLogin} onTypingChange={setIsTyping} onPeekChange={setPeeking} />
          ) : (
            <RegisterForm onSubmit={handleRegister} onTypingChange={setIsTyping} onPeekChange={setPeeking} />
          )}

          <div className="flex items-center gap-3 my-6">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/40">o continúa con</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <GoogleButton />

          <p className="text-white/40 text-xs mt-6 leading-relaxed">
            Tu sesión se gestiona de forma segura en el backend. Las contraseñas se guardan
            cifradas (BCrypt); nunca en texto plano.
          </p>
        </div>
      </div>
    </div>
  );
}
