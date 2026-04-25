import { useState } from "react";

const COLORS = ["#58cc02", "#1cb0f6", "#ffc800", "#ce82ff", "#ff4b4b", "#ff9600", "#ff69b4"];

export function Confetti() {
  const [dots] = useState(() => Array.from({ length: 45 }, (_, index) => ({
    id: index,
    left: Math.random() * 100,
    color: COLORS[index % COLORS.length],
    delay: Math.random() * 0.8,
    dur: 1.4 + Math.random() * 0.9,
    size: 7 + Math.random() * 9,
  })));

  return (
    <div className="confetti-layer">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="confetti-dot"
          style={{
            left: `${dot.left}%`,
            width: dot.size,
            height: dot.size,
            background: dot.color,
            borderRadius: dot.size > 12 ? "3px" : "50%",
            animation: `cfFall ${dot.dur}s ${dot.delay}s linear forwards`,
          }}
        />
      ))}
    </div>
  );
}
