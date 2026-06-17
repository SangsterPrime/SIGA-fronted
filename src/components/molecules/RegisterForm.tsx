import { useState, type FormEvent, type FocusEvent } from 'react';
import TextField from '../atoms/TextField';
import PasswordField from '../atoms/PasswordField';
import type { RegisterData, RegistrableRole } from '../../lib/api';

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => Promise<void>;
  onTypingChange?: (typing: boolean) => void;
  onPeekChange?: (peeking: boolean) => void;
}

const ROLES: ReadonlyArray<readonly [RegistrableRole, string]> = [
  ['PASAJERO', 'Pasajero'],
  ['FUNCIONARIO', 'Funcionario'],
];

/** Formulario de registro manual (nombre + correo + contraseña + rol). Molécula del login. */
export default function RegisterForm({ onSubmit, onTypingChange, onPeekChange }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<RegistrableRole>('PASAJERO');
  const [employeeCode, setEmployeeCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit({
        name,
        email,
        password,
        role,
        ...(role === 'FUNCIONARIO' ? { employeeCode } : {}),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la cuenta.');
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
        id="register-name"
        label="Nombre"
        type="text"
        autoComplete="name"
        placeholder="Tu nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        id="register-email"
        label="Correo"
        type="email"
        autoComplete="email"
        placeholder="tucorreo@ejemplo.cl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PasswordField
        id="register-password"
        label="Contraseña"
        autoComplete="new-password"
        placeholder="Mínimo 8 caracteres"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onVisibleChange={onPeekChange}
        minLength={8}
        required
      />

      {/* Selector de rol */}
      <div className="space-y-1.5">
        <span className="block text-sm text-white/70">Tipo de cuenta</span>
        <div className="grid grid-cols-2 gap-1 p-1 rounded-full bg-white/5 border border-white/10">
          {ROLES.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setRole(key)}
              aria-pressed={role === key}
              className={`h-9 rounded-full text-sm font-medium transition-colors ${
                role === key ? 'bg-white text-gray-900' : 'text-white/60 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {role === 'FUNCIONARIO' && (
        <TextField
          id="register-employee-code"
          label="Código de funcionario"
          type="text"
          placeholder="Entregado por tu institución"
          value={employeeCode}
          onChange={(e) => setEmployeeCode(e.target.value)}
          required
        />
      )}

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
        {loading ? 'Creando cuenta…' : 'Crear cuenta'}
      </button>
    </form>
  );
}
