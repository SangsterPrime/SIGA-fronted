/** Cursor parpadeante que acompaña al texto del typewriter mientras escribe. */
export default function BlinkingCursor() {
  return (
    <span
      className="tw-cursor inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px]"
      aria-hidden
    />
  );
}
