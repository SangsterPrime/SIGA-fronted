// Capa de acceso al backend SIGA (Spring Boot + Google OAuth2 por sesión/cookie).
// El login se delega al backend: se redirige el navegador a /oauth2/authorization/google
// y, al volver, el backend deja una cookie de sesión que viaja con `credentials: 'include'`.

export const API_BASE: string =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

/** URL a la que redirigir para iniciar sesión con Google. */
export const GOOGLE_LOGIN_URL = `${API_BASE}/oauth2/authorization/google`;

export type TipoUsuario = 'PASAJERO' | 'FUNCIONARIO' | 'ADMINISTRADOR';
export type RolFuncionario = 'ADUANAS' | 'PDI' | 'SAG';

export interface Usuario {
  id: number;
  rut: string;
  nombre: string;
  correo: string;
  tipoUsuario: TipoUsuario;
  rolFuncionario: RolFuncionario | null;
  estadoCuenta: string;
  dosFaHabilitado: boolean;
  fechaCreacion: string;
}

/** Devuelve el usuario autenticado, o `null` si no hay sesión activa. */
export async function fetchMe(): Promise<Usuario | null> {
  try {
    const res = await fetch(`${API_BASE}/api/me`, { credentials: 'include' });
    if (!res.ok) return null;
    return (await res.json()) as Usuario;
  } catch {
    // Backend apagado o CORS: tratamos como "no autenticado" sin romper la UI.
    return null;
  }
}

/** Cierra la sesión en el backend (logout por defecto de Spring Security). */
export async function logout(): Promise<void> {
  try {
    await fetch(`${API_BASE}/logout`, { method: 'POST', credentials: 'include' });
  } catch {
    /* no-op */
  }
}
