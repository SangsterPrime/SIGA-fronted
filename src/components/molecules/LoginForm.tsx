import { useState, type FormEvent, type FocusEvent } from 'react';
import TextField from '../atoms/TextField';
import PasswordField from '../atoms/PasswordField';
import type { LoginData } from '../../lib/api';

interface LoginFormProps {
  onSubmit: (data: LoginData) => Promise<void>;
  onTypingChange?: (typing: boolean) => void;
  onPeekChange?: (peeking: boolean) => void;
}

/** Formulario de inicio de sesión manual (email + contraseña). Molécula del login. */
export default function LoginForm({ onSubmit, onTypingChange, onPeekChange }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLFormElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) onTypingChange?.(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={() => onTypingChange?.(true)}
      onBlur={handleBlur}
      className="space-y-4"
      noValidate
    >
      <TextField
        id="login-email"
        label="Correo"
        type="email"
        autoComplete="email"
        placeholder="tucorreo@ejemplo.cl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PasswordField
        id="login-password"
        label="Contraseña"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onVisibleChange={onPeekChange}
        required
      />

      {error && (
        <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-11 rounded-full bg-[#e8702a] text-white font-semibold transition-colors hover:bg-[#d8631f] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Ingresando…' : 'Iniciar sesión'}
      </button>
    </form>
  );
}
