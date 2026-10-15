import type { CSSProperties } from "react";

const COLORS = ["#c56b78", "#f0c14d", "#6f9178", "#c9b3dc", "#f4b7c4", "#e7a3ad"];
const PIECES = 26;

export function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: PIECES }, (_, i) => {
        const angle = (i / PIECES) * Math.PI * 2;
        const dist = 80 + ((i * 37) % 80);
        const style = {
          "--dx": `${Math.cos(angle) * dist}px`,
          "--dy": `${Math.sin(angle) * dist - 50}px`,
          "--rot": `${(i * 67) % 360}deg`,
          background: COLORS[i % COLORS.length],
          width: i % 3 === 0 ? 7 : 9,
          height: i % 3 === 0 ? 7 : 13,
          borderRadius: i % 3 === 0 ? 999 : 2,
          animationDelay: `${(i % 4) * 0.03}s`,
        } as CSSProperties;
        return <i key={i} style={style} />;
      })}
    </div>
  );
}
