// A candle drawn with SVG. The flame is dim normally,
// and lights up + flickers when the mouse is on the card (group-hover).
function CandleIcon({ className = 'h-12 w-9' }) {
  return (
    <svg viewBox="0 0 24 32" fill="none" className={className} aria-hidden="true">
      {/* soft glow behind the flame */}
      <circle
        cx="12" cy="9" r="8" fill="#ffd36b"
        className="opacity-0 transition-opacity duration-500 group-hover:opacity-60 group-focus-visible:opacity-60"
      />

      {/* the flame (outer + inner) */}
      <g
        style={{ transformBox: 'fill-box' }}
        className="origin-bottom scale-75 opacity-25 transition duration-500
                   group-hover:scale-100 group-hover:opacity-100 group-hover:animate-flicker
                   group-focus-visible:scale-100 group-focus-visible:opacity-100 motion-reduce:animate-none"
      >
        <path d="M12 2 C14.5 5 16 7 16 9.5 A4 4 0 0 1 8 9.5 C8 7 9.5 5 12 2 Z" fill="#ffb52e" />
        <path d="M12 6.5 C13.3 8 14 9 14 10 A2 2 0 0 1 10 10 C10 9 10.7 8 12 6.5 Z" fill="#fff3b0" />
      </g>

      {/* wick, candle body, base */}
      <line x1="12" y1="13.5" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="8" y="16" width="8" height="13" rx="1.5" fill="#fff7ea" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5.5" y1="29.5" x2="18.5" y2="29.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default CandleIcon