export function ProductImage({
  color, emoji, className = "", size = "text-6xl",
}: { color: string; emoji: string; className?: string; size?: string }) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
      style={{ background: color }}
      aria-hidden="true"
    >
      <span className={`${size} drop-shadow-sm`}>{emoji}</span>
    </div>
  );
}