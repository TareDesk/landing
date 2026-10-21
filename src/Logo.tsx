/** TareDesk wordmark. Rendered as a CSS mask so it follows the text color (works in dark mode). */
export function Logo({ className = 'h-6' }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="TareDesk"
      className={`inline-block aspect-[6.667/1] bg-current ${className}`}
      style={{
        WebkitMaskImage: 'url(/logo.png)',
        maskImage: 'url(/logo.png)',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'left center',
        maskPosition: 'left center',
      }}
    />
  );
}
