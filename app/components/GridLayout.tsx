const BASE_COLUMNS = 7;
const DESKTOP_EXTRA_COLUMNS = 6;
const COLUMN_CLASS = "w-[1] bg-black/5 h-full";

export default function GridLayout() {
  return (
    <div
      className="fixed top-4 bottom-4 left-0 right-0 flex justify-between -z-10"
      aria-hidden
    >
      {Array.from({ length: BASE_COLUMNS }, (_, i) => (
        <div key={i} className={COLUMN_CLASS} />
      ))}
      {Array.from({ length: DESKTOP_EXTRA_COLUMNS }, (_, i) => (
        <div key={`md-${i}`} className={`${COLUMN_CLASS} hidden md:block`} />
      ))}
    </div>
  );
}
