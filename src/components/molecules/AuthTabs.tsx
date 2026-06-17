export type AuthTab = 'login' | 'register';

interface AuthTabsProps {
  active: AuthTab;
  onChange: (tab: AuthTab) => void;
}

const TABS: ReadonlyArray<readonly [AuthTab, string]> = [
  ['login', 'Iniciar sesión'],
  ['register', 'Crear cuenta'],
];

/** Switch entre iniciar sesión y crear cuenta. Molécula del login. */
export default function AuthTabs({ active, onChange }: AuthTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-1 p-1 rounded-full bg-white/5 border border-white/10">
      {TABS.map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          aria-pressed={active === key}
          className={`h-10 rounded-full text-sm font-medium transition-colors ${
            active === key ? 'bg-white text-gray-900' : 'text-white/60 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
