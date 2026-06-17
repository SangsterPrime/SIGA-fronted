# SIGA · Frontend

Frontend del **Sistema Integrado de Gestión Aduanera (SIGA)**. Experiencia inmersiva
(landing con video controlado por mouse + sección spotlight) e inicio de sesión vía
Google OAuth2 contra el backend Spring Boot.

## Stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **react-router-dom 7** · **lucide-react**
- Organización **Atomic Design**

## Scripts

```bash
pnpm install
pnpm dev      # servidor de desarrollo en http://localhost:5173
pnpm build    # build de producción
pnpm lint     # ESLint (TS + react-hooks)
pnpm preview  # previsualizar el build
```

> **Importante:** ejecuta el dev server en el puerto **5173**. El backend solo
> permite CORS y el redirect de OAuth2 hacia `http://localhost:5173`.
> Si el puerto está ocupado: `pnpm dev -- --port 5173 --strictPort`.

## Variables de entorno

Copia `.env.example` a `.env.local`:

```
VITE_API_URL=http://localhost:8080   # URL local del backend SIGA
```

En producción **no** se define `VITE_API_URL`: debe quedar vacía o eliminada en
Vercel. Así `API_URL` queda en `''` y el navegador consume rutas relativas del
mismo dominio (`siga-fronted.vercel.app`). Los *rewrites* de `vercel.json` hacen
de proxy hacia Render para `/api/*`, `/oauth2/*`, `/login/oauth2/*`, `/actuator/*`
y `/logout`. De este modo la cookie de sesión OAuth2 viaja como *first-party* y
`GET /api/me` deja de responder 401.

> Si `VITE_API_URL` sigue apuntando a Render en Vercel, el proxy se omite y vuelve
> el problema de sesión. Tras cambiar variables de entorno en Vercel, redeploya
> para que el build tome el nuevo valor.

## Rutas

| Ruta         | Descripción                                                        |
|--------------|--------------------------------------------------------------------|
| `/`          | Landing inmersiva: video de fondo con *scrub* por mouse, intro A.R.I.A (typewriter) y píldoras de acción. |
| `/explorar`  | Sección *spotlight*: revela una segunda imagen con una máscara circular que sigue al cursor. |
| `/ingresar`  | Login con Google (delegado al backend).                            |
| `/inicio`    | Panel del usuario autenticado (protegido). Muestra datos de `/api/me`. |

## Autenticación

Login basado en sesión (cookie) del backend:

1. `/ingresar` → el botón redirige a `GET {API_URL}/oauth2/authorization/google`
   (en producción, ruta relativa `/oauth2/...` proxyeada por Vercel hacia Render).
2. Google autentica y el backend redirige de vuelta al frontend.
3. `AuthProvider` consulta `GET {API_URL}/api/me` con `credentials: 'include'`.
4. Las rutas protegidas usan `<ProtectedRoute>`.

## Estructura (Atomic Design)

```
src/
├─ components/
│  ├─ atoms/        Logo, PillButton, Hamburger, BlinkingCursor, Spinner, AnimatedGrid, icons
│  ├─ molecules/    NavLinks, IntroLabel, Typewriter, ActionPills, MobileMenu
│  ├─ organisms/    Navbar, GlassNav, ScrubVideoBackground, RevealLayer, SpotlightStage
│  └─ templates/    HeroTemplate, SpotlightTemplate, AuthTemplate
├─ pages/           LandingPage, ExplorarPage, LoginPage, InicioPage
├─ routes/          AppRoutes, ProtectedRoute
├─ hooks/           useTypewriter, useScrubVideo, useSpotlight
├─ context/         AuthContext
├─ lib/             api.ts (cliente del backend)
└─ styles/          global.css + estilos por nivel (keyframes)
```
