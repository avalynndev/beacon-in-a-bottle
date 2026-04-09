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
      className="
        w-28 h-16
        rounded-xl
        bg-blue-100
        border-2 border-blue-400
        shadow-lg
        cursor-pointer
        hover:opacity-80
        transition-opacity
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-400
        focus-visible:ring-offset-2
        select-none
        z-900
      "
    >
      <div className="w-full h-full flex items-center justify-center text-sm font-medium ">
        Message
      </div>
    </button>
  );
}
