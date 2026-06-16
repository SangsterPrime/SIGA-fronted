import HeroTemplate from '../components/templates/HeroTemplate';
import IntroLabel from '../components/molecules/IntroLabel';
import Typewriter from '../components/molecules/Typewriter';
import ActionPills from '../components/molecules/ActionPills';

const TYPEWRITER_TEXT =
  'Bienvenido a SIGA. Tus trámites aduaneros, sin filas ni papeleo. ¿Qué necesitas hacer hoy?';

/** Landing principal: hero inmersivo con video controlado por el mouse. */
export default function LandingPage() {
  return (
    <HeroTemplate>
      <IntroLabel />
      <Typewriter text={TYPEWRITER_TEXT} />
      <ActionPills />
    </HeroTemplate>
  );
}
