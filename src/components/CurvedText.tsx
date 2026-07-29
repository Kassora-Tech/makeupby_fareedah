interface CurvedTextProps {
  text: string;
  id: string;
  className?: string;
}

// Decorative arc of tracked uppercase text, wrapped around a circular path.
// Purely ornamental — marked aria-hidden so it never reaches screen readers.
export default function CurvedText({ text, id, className = "" }: CurvedTextProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path id={id} d="M 15,100 A 85,85 0 1,1 185,100" fill="none" />
      <text fontSize="10.5" letterSpacing="3" fill="currentColor">
        <textPath href={`#${id}`} startOffset="2%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
