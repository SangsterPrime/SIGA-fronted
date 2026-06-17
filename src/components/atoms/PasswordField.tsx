import { useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  id: string;
  /** Notifica si la contraseña está visible (para la animación de "espiar" de los personajes). */
  onVisibleChange?: (visible: boolean) => void;
}

/** Campo de contraseña con toggle mostrar/ocultar. Átomo de formularios de auth. */
export default function PasswordField({
  label,
  id,
  className = '',
  onVisibleChange,
  ...rest
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  const toggle = () => {
    const next = !show;
    setShow(next);
    onVisibleChange?.(next);
  };

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm text-white/70">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          className={`w-full h-11 rounded-xl bg-white/5 border border-white/15 pl-4 pr-11 text-[15px] text-white placeholder-white/30 outline-none transition-colors focus:border-white/50 focus:bg-white/10 ${className}`}
          {...rest}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
        >
          {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
    </div>
  );
}
