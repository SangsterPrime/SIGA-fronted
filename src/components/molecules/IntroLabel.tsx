/** Etiqueta introductoria (dos líneas) sobre el typewriter. */
export default function IntroLabel() {
  return (
    <div
      className="pointer-events-none select-none mb-5 sm:mb-6"
      style={{
        fontSize: 'clamp(18px, 4vw, 26px)',
        lineHeight: 1.3,
        fontWeight: 400,
        // Texto nítido pero de menor énfasis que el typewriter (sin desenfoque).
        color: 'rgba(0,0,0,0.78)',
        textShadow: '0 1px 12px rgba(255,255,255,0.9)',
      }}
    >
      Hola, te presentamos a A.R.I.A,
      <br />
      el Asistente de Respuesta Inteligente Aduanera de SIGA
    </div>
  );
}
