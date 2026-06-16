import SpotlightTemplate from '../components/templates/SpotlightTemplate';
import SpotlightStage from '../components/organisms/SpotlightStage';

/** Página "Explorar": sección spotlight que revela una segunda imagen. */
export default function ExplorarPage() {
  return (
    <SpotlightTemplate>
      <SpotlightStage />
    </SpotlightTemplate>
  );
}
