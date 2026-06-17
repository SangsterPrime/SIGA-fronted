import type { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

/** Campo de texto etiquetado con estilo SIGA (tema oscuro). Átomo de formularios de auth. */
export default function TextField({ label, id, className = '', ...rest }: TextFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm text-white/70">
        {label}
      </label>
      <input
        id={id}
        className={`w-full h-11 rounded-xl bg-white/5 border border-white/15 px-4 text-[15px] text-white placeholder-white/30 outline-none transition-colors focus:border-white/50 focus:bg-white/10 ${className}`}
        {...rest}
      />
    </div>
  );
}
