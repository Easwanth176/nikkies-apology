import type { CSSProperties, ReactNode } from "react";

export type Pose = "wave" | "sorry" | "highfive" | "hug";
type Mood = "smile" | "soft" | "laugh" | "happy";

const INK = "#4a2c32";
const HAIR = "#3b2328";
const SKIN_A = "#f6d3bf";
const SKIN_B = "#e9bf9f";
const SHIRT_A = "#c9b3dc";
const SHIRT_B = "#b5525e";

/** Two cartoon friends: Nikkie (bow, lilac) on the left, you (red tee) on the right. */
export function Friends({
  pose,
  bubble,
  className = "",
}: {
  pose: Pose;
  bubble?: string;
  className?: string;
}) {
  const hug = pose === "hug";
  const ax = hug ? 12 : 0;
  const bx = hug ? -12 : 0;
  const moodA: Mood = hug ? "happy" : pose === "highfive" ? "laugh" : "smile";
  const moodB: Mood =
    hug ? "happy" : pose === "highfive" ? "laugh" : pose === "sorry" ? "soft" : "smile";

  return (
    <svg
      viewBox="0 0 200 140"
      className={`pals ${className}`}
      role="img"
      aria-label={LABELS[pose]}
    >
      <ellipse cx={62 + ax} cy="137" rx="26" ry="3" fill="rgba(74,44,50,0.1)" />
      <ellipse cx={138 + bx} cy="137" rx="26" ry="3" fill="rgba(74,44,50,0.1)" />

      <g transform={`translate(${ax} 0)`}>
        <circle cx="87" cy="52" r="10" fill={HAIR} />
        <path d="M40 135 Q40 92 62 90 Q84 92 84 135Z" fill={SHIRT_A} />
        <circle cx="62" cy="62" r="22" fill={SKIN_A} />
        <path
          d="M39 64 Q38 38 62 38 Q86 38 85 62 Q80 50 68 48 Q60 56 46 54 Q41 58 39 64Z"
          fill={HAIR}
        />
        <path d="M82 40 l-9 -5.5 v11z M82 40 l9 -5.5 v11z" fill="#c56b78" />
        <circle cx="82" cy="40" r="2.4" fill="#a85260" />
        <Face cx={62} cy={64} mood={moodA} delay={0} />
      </g>

      <g transform={`translate(${bx} 0)`}>
        <path d="M116 135 Q116 92 138 90 Q160 92 160 135Z" fill={SHIRT_B} />
        <circle cx="138" cy="62" r="22" fill={SKIN_B} />
        <path
          d="M115 62 Q112 36 138 35 Q164 36 161 60 Q157 50 150 52 Q147 44 139 48 Q131 43 127 51 Q120 49 115 62Z"
          fill={HAIR}
        />
        <path d="M133 37 Q137 26 145 34" stroke={HAIR} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <Face cx={138} cy={64} mood={moodB} delay={1.3} />
        {pose === "sorry" ? (
          <path className="sweat" d="M163 46 q3 5 0 7 q-3 -2 0 -7z" fill="#9cc3e6" />
        ) : null}
      </g>

      {pose === "highfive" ? (
        <g className="pop">
          <path
            fill="#f0c14d"
            d="M100 54l3 8 8.5.4-6.7 5.3 2.4 8.2-7.2-4.8-7.2 4.8 2.4-8.2-6.7-5.3 8.5-.4z"
          />
          <path stroke="#f0c14d" strokeWidth="2" strokeLinecap="round" d="M100 46v-5M88 52l-4-3M112 52l4-3" />
        </g>
      ) : null}

      <Arms pose={pose} ax={ax} bx={bx} />

      {hug ? (
        <g fill="#c56b78">
          <Heart x={92} y={46} className="float-heart" />
          <Heart x={104} y={40} className="float-heart float-heart-2" />
          <Heart x={98} y={50} className="float-heart float-heart-3" />
        </g>
      ) : null}

      {bubble ? <Bubble text={bubble} /> : null}
    </svg>
  );
}

const LABELS: Record<Pose, string> = {
  wave: "Two cartoon friends waving hello",
  sorry: "A cartoon friend offering a flower and saying sorry",
  highfive: "Two cartoon friends high-fiving",
  hug: "Two cartoon friends hugging, with little hearts",
};

function Arms({ pose, ax, bx }: { pose: Pose; ax: number; bx: number }) {
  const a = { skin: SKIN_A, sleeve: SHIRT_A };
  const b = { skin: SKIN_B, sleeve: SHIRT_B };

  switch (pose) {
    case "wave":
      return (
        <>
          <Arm x={44} y={98} side="l" {...a} from={125} to={152} dur={0.55} />
          <Arm x={80} y={98} side="r" {...a} from={0} />
          <Arm x={120} y={98} side="l" {...b} from={0} />
          <Arm x={156} y={98} side="r" {...b} from={-125} to={-152} dur={0.55} delay={0.25} />
        </>
      );
    case "sorry":
      return (
        <>
          <Arm x={44} y={98} side="l" {...a} from={0} />
          <Arm x={80} y={98} side="r" {...a} from={-8} to={-42} dur={1.6} />
          <Arm x={120} y={98} side="l" {...b} from={78} to={86} dur={1.2}>
            <g transform="translate(112 125)">
              <path d="M0 0 L-2 -9" stroke="#6f9178" strokeWidth="2" />
              <g fill="#f4b7c4">
                <circle cx="-2" cy="-14" r="3" />
                <circle cx="2" cy="-11" r="3" />
                <circle cx="-6" cy="-11" r="3" />
                <circle cx="0" cy="-7" r="3" />
                <circle cx="-5" cy="-7" r="3" />
              </g>
              <circle cx="-2" cy="-10" r="2.2" fill="#e7b15a" />
            </g>
          </Arm>
          <Arm x={156} y={98} side="r" {...b} from={0} />
        </>
      );
    case "highfive":
      return (
        <>
          <Arm x={44} y={98} side="l" {...a} from={0} />
          <Arm x={80} y={98} side="r" {...a} from={-20} to={-125} dur={0.8} />
          <Arm x={120} y={98} side="l" {...b} from={20} to={125} dur={0.8} />
          <Arm x={156} y={98} side="r" {...b} from={0} />
        </>
      );
    case "hug":
      return (
        <>
          <Arm x={44 + ax} y={98} side="l" {...a} from={0} />
          <Arm x={120 + bx} y={98} side="l" {...b} from={72} />
          <Arm x={80 + ax} y={98} side="r" {...a} from={-72} />
          <Arm x={156 + bx} y={98} side="r" {...b} from={0} />
        </>
      );
  }
}

function Arm({
  x,
  y,
  side,
  skin,
  sleeve,
  from,
  to = from,
  dur = 1.2,
  delay = 0,
  children,
}: {
  x: number;
  y: number;
  side: "l" | "r";
  skin: string;
  sleeve: string;
  from: number;
  to?: number;
  dur?: number;
  delay?: number;
  children?: ReactNode;
}) {
  const dx = side === "l" ? -8 : 8;
  const style = {
    transformOrigin: `${x}px ${y}px`,
    "--from": `${from}deg`,
    "--to": `${to}deg`,
    animationDuration: `${dur}s`,
    animationDelay: `${delay}s`,
  } as CSSProperties;

  return (
    <g className={from === to ? "arm" : "arm arm-swing"} style={style}>
      <path
        d={`M${x} ${y} L${x + dx * 0.45} ${y + 12}`}
        stroke={sleeve}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d={`M${x + dx * 0.45} ${y + 12} L${x + dx} ${y + 25}`}
        stroke={skin}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx={x + dx} cy={y + 27} r="5" fill={skin} />
      {children}
    </g>
  );
}

function Face({
  cx,
  cy,
  mood,
  delay,
}: {
  cx: number;
  cy: number;
  mood: Mood;
  delay: number;
}) {
  const blink = { animationDelay: `${delay}s` };
  return (
    <>
      {mood === "happy" ? (
        <g stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round">
          <path d={`M${cx - 10} ${cy} Q${cx - 7} ${cy - 4} ${cx - 4} ${cy}`} />
          <path d={`M${cx + 4} ${cy} Q${cx + 7} ${cy - 4} ${cx + 10} ${cy}`} />
        </g>
      ) : (
        <g fill={INK}>
          <ellipse className="blink" style={blink} cx={cx - 7} cy={cy} rx="2.4" ry="3" />
          <ellipse className="blink" style={blink} cx={cx + 7} cy={cy} rx="2.4" ry="3" />
        </g>
      )}
      <ellipse cx={cx - 12} cy={cy + 7} rx="4" ry="2.5" fill="#f4a6b0" opacity="0.75" />
      <ellipse cx={cx + 12} cy={cy + 7} rx="4" ry="2.5" fill="#f4a6b0" opacity="0.75" />
      {mood === "laugh" ? (
        <path d={`M${cx - 6} ${cy + 8} Q${cx} ${cy + 17} ${cx + 6} ${cy + 8}Z`} fill={INK} />
      ) : mood === "soft" ? (
        <path
          d={`M${cx - 4} ${cy + 11} Q${cx} ${cy + 9} ${cx + 4} ${cy + 11}`}
          stroke={INK}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d={`M${cx - 5} ${cy + 8} Q${cx} ${cy + 13} ${cx + 5} ${cy + 8}`}
          stroke={INK}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </>
  );
}

function Heart({ x, y, className }: { x: number; y: number; className: string }) {
  return (
    <path
      className={className}
      d={`M${x} ${y + 7}s-6-3.8-6-8.2c0-2.3 1.7-3.8 3.5-3.8 1.2 0 2 .6 2.5 1.4.5-.8 1.3-1.4 2.5-1.4 1.8 0 3.5 1.5 3.5 3.8 0 4.4-6 8.2-6 8.2z`}
    />
  );
}

function Bubble({ text }: { text: string }) {
  return (
    <g className="bubble">
      <path
        d="M150 4h44a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6h-30l-8 7 1-7h-7a6 6 0 0 1-6-6V10a6 6 0 0 1 6-6z"
        fill="#fff"
        stroke="rgba(74,44,50,0.18)"
      />
      <text
        x="172"
        y="22"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={INK}
        style={{ fontFamily: "var(--font-caveat), cursive" }}
      >
        {text}
      </text>
    </g>
  );
}
