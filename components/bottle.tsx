"use client";

interface BottleProps {
  topPercent: number;
  duration: number;
  delay: number;
  scale?: number;
  onBottleClick: () => void;
}

export function Bottle({
  topPercent,
  duration,
  delay,
  scale = 1,
  onBottleClick,
}: BottleProps) {
  const style: React.CSSProperties = {
    position: "absolute",
    top: `${topPercent}%`,
    transform: `scale(${scale})`,
    animation: `drift-left ${duration}s linear ${delay}s infinite`,
  };

  return (
    <button
      onClick={onBottleClick}
      aria-label="Click to open message"
      style={style}
      className="absolute cursor-pointer select-none z-50"
    >
      <svg viewBox="0 0 120 60" className="w-28 h-16 drop-shadow-lg">
        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M10 30 Q20 10, 40 10 L80 10 Q100 10, 110 30 Q100 50, 80 50 L40 50 Q20 50, 10 30 Z"
          fill="url(#glass)"
          stroke="#60a5fa"
          strokeWidth="2"
        />
        <rect x="45" y="0" width="30" height="12" rx="4" fill="#93c5fd" />
        <rect x="48" y="-5" width="24" height="8" rx="2" fill="#92400e" />
        <rect
          x="35"
          y="25"
          width="50"
          height="10"
          rx="2"
          fill="#fef9c3"
          opacity="0.9"
        />
        <ellipse cx="40" cy="25" rx="8" ry="15" fill="white" opacity="0.2" />
      </svg>
    </button>
  );
}
