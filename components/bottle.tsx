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
      className="w-28 h-16 absolute cursor-pointer select-none z-50"
    >
      <svg viewBox="0 0 100 200" className="w-full h-full">
        <rect
          x="42"
          y="5"
          width="16"
          height="10"
          rx="2"
          className="fill-gray-400"
        />
        <rect
          x="42"
          y="15"
          width="16"
          height="30"
          rx="2"
          className="fill-gray-300"
        />
        <rect
          x="25"
          y="43"
          width="50"
          height="130"
          rx="10"
          className="fill-gray-200"
        />
        <rect
          x="30"
          y="55"
          width="40"
          height="70"
          rx="8"
          className="fill-gray-300"
        />
      </svg>
    </button>
  );
}
