export default function IcoGauge({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 6a6 6 0 0 1 6 6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M12 12 16.5 7.5" strokeWidth="1.8" />
      <path d="M2 12h2M20 12h2M12 2v2M6.34 6.34l1.42 1.42M17.66 6.34l-1.42 1.42" />
    </svg>
  );
}
