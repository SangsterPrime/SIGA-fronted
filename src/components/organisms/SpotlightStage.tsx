import { Link } from 'react-router-dom';
import { useSpotlight } from '../../hooks/useSpotlight';
import RevealLayer from './RevealLayer';

// Imagen base (capas de roca → metáfora de "capas de control" aduanero).
const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
// Imagen revelada por el spotlight.
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

/** Escena spotlight: imagen base + capa revelada que sigue al cursor. */
export default function SpotlightStage() {
  const { x, y } = useSpotlight();

  return (
    <section
      className="relative w-full overflow-hidden h-screen bg-black"
      style={{ height: '100dvh' }}
    >
      {/* Imagen base con leve zoom-out (Ken Burns) */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      {/* Capa revelada por el spotlight */}
      <RevealLayer image={BG_IMAGE_2} cursorX={x} cursorY={y} />

      {/* Scrims oscuros para asegurar contraste del texto blanco. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] z-40 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] z-40 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Encabezado */}
      <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
        <h1
          className="text-white leading-[0.95]"
          style={{ textShadow: '0 2px 28px rgba(0,0,0,0.55)' }}
        >
          <span
            className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
            style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
          >
            Cada paso
          </span>
          <span
            className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
            style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
          >
            queda registrado
          </span>
        </h1>
      </div>

      {/* Párrafo inferior izquierdo */}
      <div
        className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.7s' }}
      >
        <p
          className="text-sm text-white/90 leading-relaxed"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}
        >
          SIGA traza cada etapa de un trámite aduanero —Aduanas, PDI y SAG— para
          que ningún control quede fuera del registro.
        </p>
      </div>

      {/* Bloque inferior derecho */}
      <div
        className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.85s' }}
      >
        <p
          className="text-xs sm:text-sm text-white/90 leading-relaxed"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}
        >
          Pasa el cursor o desliza el dedo para descubrir cómo cada capa de
          control se conecta en una sola plataforma trazable.
        </p>
        <Link
          to="/ingresar"
          className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 pointer-events-auto"
        >
          Comenzar ahora
        </Link>
      </div>
    </section>
  );
}
