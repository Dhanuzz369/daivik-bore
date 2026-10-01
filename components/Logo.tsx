type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function DaivikMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 52 52"
      role="img"
      aria-label="Daivik Borewells mark"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6v40h11c12.4 0 21-8.1 21-20S35.4 6 23 6H12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path d="M21 9v27" stroke="currentColor" strokeWidth="2.4" />
      <path d="M17.5 15h7M17.5 21h7M17.5 27h7" stroke="currentColor" strokeWidth="1.6" />
      <path d="m17.5 36 3.5 7 3.5-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M29 36c2.2-2.6 4.5-2.6 6.7 0s4.5 2.6 6.8 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M29 41c2.2-2.6 4.5-2.6 6.7 0s4.5 2.6 6.8 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <span className={className ? `logo ${className}` : "logo"}>
      <span className="logo-mark"><DaivikMark /></span>
      {!compact && (
        <span className="logo-type">
          <strong>Daivik</strong>
          <small>Borewells</small>
        </span>
      )}
    </span>
  );
}
