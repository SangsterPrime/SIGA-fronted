/** Etiqueta introductoria desenfocada (dos líneas) sobre el typewriter. */
export default function IntroLabel() {
  return (
    <div
      className="pointer-events-none select-none mb-5 sm:mb-6"
      style={{
        fontSize: 'clamp(18px, 4vw, 26px)',
        lineHeight: 1.3,
        fontWeight: 400,
        color: '#000',
        // Enfoque suave (no totalmente borroso) + halo para que se entienda.
        filter: 'blur(1.5px)',
        textShadow: '0 1px 12px rgba(255,255,255,0.9)',
      }}
    >
      Hola, te presentamos a A.R.I.A,
      <br />
      el Asistente de Respuesta Inteligente Aduanera de SIGA
    </div>
  );
}
