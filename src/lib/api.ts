// Capa de acceso al backend SIGA (Spring Boot + Google OAuth2 por sesión/cookie).
// El login se delega al backend: se redirige el navegador a /oauth2/authorization/google
// y, al volver, el backend deja una cookie de sesión que viaja con `credentials: 'include'`.

import { API_URL } from '../config/api';

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

// Rol auto-registrable desde el formulario (ADMINISTRADOR no se permite en el backend).
export type RegistrableRole = 'PASAJERO' | 'FUNCIONARIO';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: RegistrableRole;
  /** Requerido por el backend solo cuando role === 'FUNCIONARIO'. */
  employeeCode?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

/** Usuario mínimo que devuelven /auth/register y /auth/login (sin passwordHash). */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: TipoUsuario;
  provider: 'LOCAL' | 'GOOGLE';
}

/** Respuesta unificada de autenticación manual del backend (AuthResponse). */
export interface AuthResponse {
  token: string;
  user: AuthUser;
}

/** Forma del cuerpo de error que devuelve el backend (GlobalExceptionHandler). */
interface ErrorBody {
  message?: string;
  fieldErrors?: Record<string, string>;
}

/** Extrae un mensaje legible de una respuesta de error del backend. */
async function parseError(res: Response, fallback: string): Promise<Error> {
  try {
    const body = (await res.json()) as ErrorBody;
    const fieldMsg = body.fieldErrors ? Object.values(body.fieldErrors)[0] : undefined;
    return new Error(body.message || fieldMsg || fallback);
  } catch {
    return new Error(fallback);
  }
}

/** Registro manual. Crea la cuenta y deja la sesión iniciada (cookie). */
export async function registrar(data: RegisterData): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw await parseError(res, 'No se pudo crear la cuenta. Intenta nuevamente.');
  }
  return (await res.json()) as AuthResponse;
}

/** Login manual (correo + contraseña). Deja la sesión iniciada (cookie). */
export async function loginManual(data: LoginData): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw await parseError(res, 'Correo o contraseña incorrectos.');
  }
  return (await res.json()) as AuthResponse;
}

/** Devuelve el usuario autenticado, o `null` si no hay sesión activa. */
export async function fetchMe(): Promise<Usuario | null> {
  try {
    const res = await fetch(`${API_URL}/api/me`, { credentials: 'include' });
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
    await fetch(`${API_URL}/logout`, { method: 'POST', credentials: 'include' });
  } catch {
    /* no-op */
  }
}
