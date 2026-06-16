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
