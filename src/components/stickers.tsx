import type { StickerName } from "@/content/letter";

type Props = {
  name: StickerName;
  size?: number;
  className?: string;
};

export function Sticker({ name, size = 28, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
    >
      <Art name={name} />
    </svg>
  );
}

function Art({ name }: { name: StickerName }) {
  switch (name) {
    case "heart":
      return (
        <path
          fill="currentColor"
          d="M32 54S15.6 43.8 15.6 31.8C15.6 24.8 20.4 20 25.6 20c3.2 0 5.4 1.6 6.4 3.8 1-2.2 3.2-3.8 6.4-3.8 5.2 0 10 4.8 10 11.8C48.4 43.8 32 54 32 54z"
        />
      );

    case "star":
      return (
        <path
          fill="#f0c14d"
          d="M32 7l6.4 17h17.6l-14.2 10.4 5.4 16.6L32 41.2 16.8 51l5.4-16.6L8 24h17.6z"
        />
      );

    case "daisy":
      return (
        <>
          <g fill="#f4b7c4">
            <ellipse cx="32" cy="14" rx="8" ry="12" />
            <ellipse cx="32" cy="50" rx="8" ry="12" />
            <ellipse cx="14" cy="32" rx="12" ry="8" />
            <ellipse cx="50" cy="32" rx="12" ry="8" />
            <ellipse cx="18" cy="18" rx="8" ry="10" transform="rotate(-40 18 18)" />
            <ellipse cx="46" cy="18" rx="8" ry="10" transform="rotate(40 46 18)" />
            <ellipse cx="18" cy="46" rx="8" ry="10" transform="rotate(40 18 46)" />
            <ellipse cx="46" cy="46" rx="8" ry="10" transform="rotate(-40 46 46)" />
          </g>
          <circle cx="32" cy="32" r="9" fill="#e7b15a" />
        </>
      );

    case "cap":
      return (
        <>
          <path fill="#6b3f48" d="M18 29v9c0 4 6.3 7 14 7s14-3 14-7v-9L32 34z" />
          <path fill="#4a2c32" d="M32 14l26 10-26 10L6 24z" />
          <path
            fill="none"
            stroke="#f0c14d"
            strokeWidth="2"
            strokeLinecap="round"
            d="M32 24l18 4v12"
          />
          <rect x="47" y="39" width="6" height="9" rx="2" fill="#f0c14d" />
          <circle cx="32" cy="24" r="2" fill="#f0c14d" />
        </>
      );

    case "books":
      return (
        <>
          <rect x="10" y="41" width="44" height="10" rx="2" fill="#c56b78" />
          <rect x="48" y="43" width="3" height="6" fill="#fff8f1" />
          <rect x="14" y="31" width="38" height="10" rx="2" fill="#6f9178" />
          <rect x="17" y="33" width="3" height="6" fill="#fff8f1" />
          <rect x="8" y="21" width="42" height="10" rx="2" fill="#f0c14d" />
          <rect x="44" y="23" width="3" height="6" fill="#fff8f1" />
          <path fill="#c56b78" d="M30 21s-5-3-5-6.5c0-1.8 1.3-3 2.7-3 1 0 1.8.6 2.3 1.4.5-.8 1.3-1.4 2.3-1.4 1.4 0 2.7 1.2 2.7 3C35 18 30 21 30 21z" />
        </>
      );

    case "pennant":
      return (
        <>
          <rect x="5" y="10" width="4" height="46" rx="2" fill="#7a5560" />
          <path fill="#c56b78" d="M9 12l50 18L9 48z" />
          <text
            x="13"
            y="32.6"
            fontSize="7.5"
            fontWeight="800"
            letterSpacing="0.4"
            fill="#fff8f1"
            fontFamily="var(--font-nunito), sans-serif"
          >
            friends
          </text>
        </>
      );

    case "coffee":
      return (
        <>
          <path
            fill="none"
            stroke="#c56b78"
            strokeWidth="2.5"
            strokeLinecap="round"
            d="M27 13c-2-3 2-4 0-7M37 13c-2-3 2-4 0-7"
          />
          <path fill="#fff8f1" stroke="#ead6d0" strokeWidth="1.5" d="M18 22h28l-3 32H21z" />
          <path fill="#6f9178" d="M19.4 33h25.2l-1 11H20.4z" />
          <rect x="15" y="17" width="34" height="7" rx="3.5" fill="#4a2c32" />
          <path fill="#fff8f1" d="M32 42s-3.2-2-3.2-4.2c0-1.1.8-1.9 1.7-1.9.7 0 1.2.4 1.5.9.3-.5.8-.9 1.5-.9.9 0 1.7.8 1.7 1.9 0 2.2-3.2 4.2-3.2 4.2z" />
        </>
      );

    case "campus":
      return (
        <>
          <path stroke="#7a5560" strokeWidth="2" d="M32 11V3" />
          <path fill="#f0c14d" d="M32 3l9 3-9 3z" />
          <path fill="#c56b78" d="M7 25l25-14 25 14z" />
          <rect x="9" y="25" width="46" height="4" fill="#4a2c32" />
          <rect x="11" y="29" width="42" height="17" fill="#fff8f1" />
          <g fill="#e4d4ee">
            <rect x="14" y="29" width="5" height="17" />
            <rect x="23" y="29" width="5" height="17" />
            <rect x="36" y="29" width="5" height="17" />
            <rect x="45" y="29" width="5" height="17" />
          </g>
          <rect x="29" y="35" width="6" height="11" rx="3" fill="#7a5560" />
          <rect x="7" y="46" width="50" height="5" rx="1" fill="#7a5560" />
          <rect x="4" y="51" width="56" height="4" rx="1" fill="#4a2c32" />
        </>
      );

    case "pencil":
      return (
        <g transform="rotate(-35 32 32)">
          <rect x="6" y="27.5" width="7" height="9" rx="2" fill="#f4b7c4" />
          <rect x="12" y="27.5" width="3" height="9" fill="#b9a7a0" />
          <rect x="15" y="27.5" width="31" height="9" fill="#f0c14d" />
          <rect x="15" y="30.8" width="31" height="2.4" fill="#e7a83f" />
          <path fill="#f3d9b5" d="M46 27.5l11 4.5-11 4.5z" />
          <path fill="#4a2c32" d="M53.5 30.6L57 32l-3.5 1.4z" />
        </g>
      );

    case "ticket":
      return (
        <>
          <path
            fill="#c9b3dc"
            d="M6 20h52v8a4 4 0 0 0 0 8v8H6v-8a4 4 0 0 0 0-8z"
            transform="rotate(-8 32 32)"
          />
          <g transform="rotate(-8 32 32)">
            <path stroke="#fff8f1" strokeWidth="1.6" strokeDasharray="2.5 2.5" d="M44 22v20" />
            <text
              x="12"
              y="36"
              fontSize="10"
              fontWeight="800"
              letterSpacing="1"
              fill="#4a2c32"
              fontFamily="var(--font-nunito), sans-serif"
            >
              FEST
            </text>
            <path fill="#f0c14d" d="M51 26.5l1.4 3.6h3.8l-3.1 2.2 1.2 3.6-3.3-2.1-3.3 2.1 1.2-3.6-3.1-2.2h3.8z" />
          </g>
        </>
      );

    case "camera":
      return (
        <>
          <rect x="22" y="14" width="14" height="8" rx="2" fill="#7a5560" />
          <rect x="8" y="19" width="48" height="33" rx="7" fill="#c56b78" />
          <rect x="8" y="27" width="48" height="5" fill="#a85260" />
          <circle cx="32" cy="36" r="11" fill="#fff8f1" />
          <circle cx="32" cy="36" r="7" fill="#4a2c32" />
          <circle cx="29.5" cy="33.5" r="2" fill="#fff8f1" />
          <rect x="45" y="22" width="7" height="4" rx="1.5" fill="#f0c14d" />
        </>
      );
  }
}
