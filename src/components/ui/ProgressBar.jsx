export default function ProgressBar({
  value,
  label,
  trackClassName = 'bg-sand',
  barClassName = 'bg-pk-500',
}) {
  const safeValue = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-2.5 w-full overflow-hidden rounded-full ${trackClassName}`}
    >
      <div className={`h-full rounded-full transition-all ${barClassName}`} style={{ width: `${safeValue}%` }} />
    </div>
  );
}
