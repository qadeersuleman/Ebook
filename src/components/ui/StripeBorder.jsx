// Decorative multi-colour stripe inspired by truck art borders.
const COLORS = ['bg-gold-500', 'bg-truck-500', 'bg-tile-500', 'bg-plum-500', 'bg-pk-500'];

export default function StripeBorder({ className = 'h-2' }) {
  return (
    <div className={`flex ${className}`} aria-hidden="true">
      {COLORS.map((color) => (
        <span key={color} className={`flex-1 ${color}`} />
      ))}
    </div>
  );
}
