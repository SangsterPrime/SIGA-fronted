import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PillButton from '../atoms/PillButton';
import { CopyIcon, CheckIcon } from '../atoms/icons';

const CONTACT_EMAIL = 'soporte@siga.cl';

const ACTIONS = [
  { label: 'Iniciar un trámite', to: '/ingresar' },
  { label: 'Soy pasajero', to: '/ingresar' },
  { label: 'Soy funcionario', to: '/ingresar' },
  { label: 'Cómo funciona', to: '/explorar' },
];

/**
 * Píldoras de acción del hero. Aparecen con fade-in + slide-up 400 ms tras
 * cargar (independiente del typewriter). La última copia el correo de contacto.
 */
export default function ActionPills() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* Clipboard no disponible (contexto inseguro): se ignora. */
    }
  };

  return (
    <div
      className="flex flex-wrap gap-y-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {ACTIONS.map((a) => (
        <PillButton key={a.label} onClick={() => navigate(a.to)}>
          {a.label}
        </PillButton>
      ))}

      <PillButton
        variant="outline"
        onClick={copyEmail}
        aria-label={`Copiar correo de contacto ${CONTACT_EMAIL}`}
      >
        <span>
          Contacto:{' '}
          <span className="underline underline-offset-1">{CONTACT_EMAIL}</span>
        </span>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </PillButton>
    </div>
  );
}
