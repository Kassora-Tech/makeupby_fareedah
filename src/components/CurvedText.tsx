interface CurvedTextProps {
  text: string;
  id: string;
  className?: string;
}

// Decorative arc of tracked uppercase text, wrapped around a circular path.
// Purely ornamental — marked aria-hidden so it never reaches screen readers.
//
// The arc is a semicircle of radius 78, so the usable path is ~245 units. Type is
// sized so the label fits inside that: anything longer than the path is silently
// truncated by the browser, and glyphs near the ends can fall outside the viewBox.
// If the label in content.ts gets much longer, drop the font size or tracking.
export default function CurvedText({ text, id, className = "" }: CurvedTextProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path id={id} d="M 22,100 A 78,78 0 1,1 178,100" fill="none" />
      <text fontSize="9.5" letterSpacing="2" fill="currentColor">
        <textPath href={`#${id}`} startOffset="4%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
