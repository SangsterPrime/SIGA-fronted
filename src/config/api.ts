// En producción se deja vacío a propósito: el navegador llama a rutas relativas
// (mismo dominio Vercel) y los rewrites de `vercel.json` hacen de proxy hacia Render.
// Así la cookie de sesión OAuth2 viaja como first-party y `/api/me` no responde 401.
// En local, define `VITE_API_URL=http://localhost:8080` en `.env.local`.
export const API_URL = import.meta.env.VITE_API_URL || '';

export const GOOGLE_LOGIN_URL = `${API_URL}/oauth2/authorization/google`;
