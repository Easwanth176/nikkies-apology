/**
 * Words for the letter. Wrap a word in {braces} to marker-highlight it.
 * Palette lives in src/app/globals.css (`:root`), fonts in src/app/layout.tsx.
 * Photos live in public/memories.
 */
import type { Pose } from "@/components/friends";

export type StickerName =
  | "heart"
  | "star"
  | "daisy"
  | "cap"
  | "books"
  | "pennant"
  | "coffee"
  | "campus"
  | "pencil"
  | "ticket"
  | "camera";

type BasePage = {
  kicker: string;
  title: string;
  body: string;
};

export type LetterPage =
  | (BasePage & {
      kind: "text";
      stickers: StickerName[];
      friends?: { pose: Pose; bubble?: string };
    })
  | (BasePage & {
      kind: "photos";
      hint: string;
      photos: {
        src: string;
        alt: string;
        caption: string;
        tilt: number;
        focus: string;
      }[];
    })
  | (BasePage & {
      kind: "bucket";
      hint: string;
      items: { id: string; label: string; sticker: StickerName }[];
    })
  | (BasePage & {
      kind: "polaroids";
      photos: {
        caption: string;
        scene: StickerName;
        tint: string;
        tilt: number;
      }[];
    })
  | (BasePage & { kind: "promise"; word: string });

export type ReplySticker = {
  id: string;
  label: string;
  sticker: StickerName;
};

export const letter = {
  recipient: "Nikkie",
  campus: "Lovely Professional University",
  signature: "your friend",
  eyebrow: "lovely professional university",
  coverTitle: "for nikkie",
  coverNote: "a friendship letter, for the months we still have on this campus.",
  sealLabel: "open the letter",
  pages: [
    {
      kind: "text",
      kicker: "hey nikkie",
      title: "i'm sorry for whatever happened.",
      body: "No long speech, no keeping score. Whatever it was, I don't want it sitting between us anymore. You mean way more to me than being right ever could.",
      stickers: [],
      friends: { pose: "sorry", bubble: "sorry!" },
    },
    {
      kind: "text",
      kicker: "a fresh page",
      title: "let's make things better again.",
      body: "Same us, a little wiser. Laugh about the silly stuff, talk through the real stuff, and go back to being the two people who make every boring day better.",
      stickers: [],
      friends: { pose: "highfive" },
    },
    {
      kind: "text",
      kicker: "university life",
      title: "this time is never coming back.",
      body: "Lovely Professional University only happens once. The lectures we half-listen to, the canteen gossip, the walks that take forever. I want the rest of it with you, not as a story I tell later about someone I lost.",
      stickers: ["campus", "books"],
    },
    {
      kind: "photos",
      kicker: "exhibit a & b",
      title: "some memories are already made.",
      body: "Proof that we're already good at this.",
      hint: "tap a photo to bring it closer",
      photos: [
        {
          src: "/memories/cutie-pie.jpg",
          alt: "A candid classroom photo captioned cutie pie, with a little red bow sticker",
          caption: "cutie pie",
          tilt: -6,
          focus: "50% 64%",
        },
        {
          src: "/memories/starry-painting.png",
          alt: "A small painting of a person looking up at a starry blue sky",
          caption: "under the same stars",
          tilt: 5,
          focus: "50% 50%",
        },
      ],
    },
    {
      kind: "bucket",
      kicker: "the next few months",
      title: "until we leave this campus…",
      body: "These months will not come back. Let's fill them with us. Tap whatever you're in for.",
      hint: "tap the ones you're in for",
      items: [
        { id: "chai", label: "chai runs between lectures", sticker: "coffee" },
        { id: "library", label: "library sessions that turn into gossip", sticker: "books" },
        { id: "fest", label: "every fest night, front row", sticker: "ticket" },
        { id: "photos", label: "way too many photos around campus", sticker: "camera" },
        { id: "gate", label: "one last walk out the main gate, together", sticker: "campus" },
      ],
    },
    {
      kind: "polaroids",
      kicker: "for later",
      title: "memories i'll cherish my whole life.",
      body: "Years from now I will still want these. Empty frames, on purpose. We fill them before we leave.",
      photos: [
        { caption: "chai", scene: "coffee", tint: "#f8cfd6", tilt: -6 },
        { caption: "exams", scene: "books", tint: "#e4d4ee", tilt: 4 },
        { caption: "last day", scene: "cap", tint: "#f6d7a8", tilt: -2 },
      ],
    },
    {
      kind: "promise",
      kicker: "my one wish",
      title: "i hope nothing in this world ruins our {friendship}.",
      body: "Not a fight. Not a bad week. Not the day we walk out of Lovely Professional University. Whatever comes after campus, we find our way back.",
      word: "friendship",
    },
    {
      kind: "text",
      kicker: "so…",
      title: "friends again?",
      body: "I'm sorry. I want us better. And I want these last months at Lovely Professional University to be ours. This {friendship} is the thing I refuse to lose.",
      stickers: [],
    },
  ] satisfies LetterPage[] as LetterPage[],
  signoff: "always,",
  ps: "p.s. leave a sticker, or just find me after class. either one counts.",
  kept: "i'll keep this. the friendship stays.",
  replies: [
    { id: "in", label: "i'm in", sticker: "heart" },
    { id: "memories", label: "let's make memories", sticker: "star" },
    { id: "friends", label: "friends again", sticker: "daisy" },
  ] satisfies ReplySticker[] as ReplySticker[],
  replyHint: "stick one on the page",
  foldedTitle: "folded, and still true.",
  foldedNote: "whenever you want it again, it's right here.",
  again: "read it again",
  next: "keep reading",
  back: "back",
  close: "fold it",
};
