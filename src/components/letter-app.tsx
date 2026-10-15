"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { letter, type LetterPage, type StickerName } from "@/content/letter";
import { Sticker } from "@/components/stickers";

type Phase = "sealed" | "opening" | "reading" | "folded";

export function LetterApp() {
  const [phase, setPhase] = useState<Phase>("sealed");
  const [page, setPage] = useState(0);
  const [replies, setReplies] = useState<string[]>([]);
  const [plans, setPlans] = useState<string[]>([]);
  const startX = useRef<number | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const openLetter = useCallback(() => {
    if (phase === "reading") return;
    if (timer.current) window.clearTimeout(timer.current);
    setPage(0);
    setPhase("reading");
  }, [phase]);

  const next = useCallback(() => {
    if (page >= letter.pages.length - 1) {
      setPhase("folded");
      return;
    }
    setPage((current) => current + 1);
  }, [page]);

  const back = useCallback(() => {
    setPage((current) => Math.max(0, current - 1));
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (phase !== "reading") return;
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") back();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, next, back]);

  function onPointerDown(event: React.PointerEvent) {
    if ((event.target as HTMLElement).closest("button")) return;
    startX.current = event.clientX;
  }

  function onPointerUp(event: React.PointerEvent) {
    if (startX.current == null || phase !== "reading") return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    if (delta < -48) next();
    if (delta > 48) back();
  }

  const current = letter.pages[page];
  const last = page === letter.pages.length - 1;

  return (
    <main className="desk">
      <section className="sheet" aria-label={`A letter for ${letter.recipient}`}>
        <Petals />
        {phase === "reading" ? (
          <article
            className="pad-safe relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden px-6"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <p className="sr-only" aria-live="polite">
              Page {page + 1} of {letter.pages.length}. {plain(current.title)}
            </p>
            <header className="flex shrink-0 items-start justify-between">
              <div className="tape" aria-hidden="true" />
              <p className="pt-1 text-xs font-bold tracking-[0.18em] text-ink-soft uppercase">
                {page + 1} / {letter.pages.length}
              </p>
            </header>

            <div
              key={page}
              className="rise mt-6 flex min-h-0 flex-1 flex-col overflow-y-auto pb-2"
            >
              <p className="text-sm font-bold tracking-[0.22em] text-blush-deep uppercase">
                {current.kicker}
              </p>
              <h1 className="mt-2 font-display text-[2rem] leading-tight font-medium text-ink italic">
                <Rich text={current.title} />
              </h1>
              <p className="mt-4 font-hand text-[1.75rem] leading-snug text-ink">
                <Rich text={current.body} />
              </p>

              <PageExtras
                page={current}
                plans={plans}
                onTogglePlan={(id) => setPlans((list) => toggle(list, id))}
              />

              {last ? (
                <div className="mt-6">
                  <p className="font-hand text-[1.85rem] leading-none text-ink">
                    {letter.signoff}
                  </p>
                  <p className="font-display text-xl text-ink italic">
                    {letter.signature}
                  </p>
                  <p className="mt-1 text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
                    {letter.campus}
                  </p>
                  <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-ink-soft">
                    {letter.ps}
                  </p>
                  <p className="mt-5 text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
                    {letter.replyHint}
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {letter.replies.map((reply) => (
                      <button
                        key={reply.id}
                        type="button"
                        className="sticker"
                        data-stuck={replies.includes(reply.id)}
                        aria-pressed={replies.includes(reply.id)}
                        onClick={() =>
                          setReplies((list) => toggle(list, reply.id))
                        }
                      >
                        <Sticker
                          name={reply.sticker}
                          className="text-blush-deep"
                        />
                        <span>{reply.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 min-h-8 font-hand text-2xl text-blush-deep">
                    {replies.length > 0 ? letter.kept : "\u00a0"}
                  </p>
                </div>
              ) : null}
            </div>

            <footer className="mt-2 flex shrink-0 items-center justify-between gap-3 py-3">
              <button
                type="button"
                className="btn btn-ghost px-3"
                onClick={back}
                disabled={page === 0}
              >
                {letter.back}
              </button>
              <div className="flex gap-1.5" aria-hidden="true">
                {letter.pages.map((item, index) => (
                  <span
                    key={item.kicker}
                    className={`h-1.5 rounded-full ${
                      index === page ? "w-5 bg-blush-deep" : "w-1.5 bg-blush"
                    }`}
                  />
                ))}
              </div>
              <button type="button" className="btn btn-primary" onClick={next}>
                {last ? letter.close : letter.next}
              </button>
            </footer>
          </article>
        ) : (
          <div className="pad-safe relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
            <CoverStickers />
            <p className="relative text-xs font-bold tracking-[0.22em] text-blush-deep uppercase">
              {letter.eyebrow}
            </p>
            <h1 className="relative mt-3 font-display text-5xl leading-none font-medium text-ink italic">
              {phase === "folded" ? letter.foldedTitle : letter.coverTitle}
            </h1>
            <div className="relative mt-8">
              <Envelope folded={phase === "folded"} onOpen={openLetter} />
            </div>
            <p className="relative mt-8 max-w-[18rem] font-hand text-[1.7rem] leading-snug text-ink-soft">
              {phase === "folded" ? foldedNote(replies) : letter.coverNote}
            </p>
            {phase === "folded" ? (
              <button
                type="button"
                className="btn btn-primary relative mt-6"
                onClick={() => {
                  setPage(0);
                  setPhase("reading");
                }}
              >
                {letter.again}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary relative mt-6"
                onClick={openLetter}
              >
                {letter.sealLabel}
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

function PageExtras({
  page,
  plans,
  onTogglePlan,
}: {
  page: LetterPage;
  plans: string[];
  onTogglePlan: (id: string) => void;
}) {
  switch (page.kind) {
    case "text":
      return page.stickers.length ? <StickerCluster names={page.stickers} /> : null;

    case "bucket":
      return (
        <div className="mt-5">
          <p className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
            {page.hint}
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {page.items.map((item) => {
              const on = plans.includes(item.id);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className="todo"
                    data-on={on}
                    aria-pressed={on}
                    onClick={() => onTogglePlan(item.id)}
                  >
                    <Sticker name={item.sticker} size={34} className="vinyl shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <span className="todo-check" aria-hidden="true">
                      {on ? "✓" : ""}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 font-hand text-2xl text-blush-deep">
            {plans.length === page.items.length
              ? "all of them. it's a deal."
              : plans.length > 0
                ? `${plans.length} down, more to go.`
                : "\u00a0"}
          </p>
        </div>
      );

    case "polaroids":
      return (
        <div className="polaroid-row mt-8 pb-4">
          {page.photos.map((photo, index) => (
            <figure
              key={photo.caption}
              className="polaroid"
              style={{
                rotate: `${photo.tilt}deg`,
                marginTop: index === 1 ? 18 : 0,
                zIndex: index === 1 ? 2 : 1,
              }}
            >
              <div className="polaroid-img" style={{ background: photo.tint }}>
                <Sticker name={photo.scene} size={62} className="text-blush-deep" />
              </div>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      );

    case "promise":
      return (
        <div className="promise mt-7">
          <span className="promise-heart promise-heart-a" aria-hidden="true">
            <Sticker name="heart" size={22} className="text-blush" />
          </span>
          <span className="promise-heart promise-heart-b" aria-hidden="true">
            <Sticker name="heart" size={16} className="text-blush-deep" />
          </span>
          <p className="text-xs font-bold tracking-[0.22em] text-ink-soft uppercase">
            protected at all costs
          </p>
          <p className="mt-1 font-display text-[2.9rem] leading-none font-semibold italic">
            <mark className="hl">{page.word}</mark>
          </p>
          <div className="mt-4 flex justify-center gap-4">
            {page.stickers.map((name, index) => (
              <Sticker
                key={name}
                name={name}
                size={52}
                className={`vinyl text-blush-deep ${index % 2 ? "rotate-6" : "-rotate-6"}`}
              />
            ))}
          </div>
        </div>
      );
  }
}

function StickerCluster({ names }: { names: StickerName[] }) {
  return (
    <div className="mt-8 flex items-end justify-end gap-3 pr-2" aria-hidden="true">
      {names.map((name, index) => (
        <Sticker
          key={name}
          name={name}
          size={index === 0 ? 72 : 56}
          className={`vinyl text-blush-deep ${index % 2 ? "rotate-12" : "-rotate-6"}`}
        />
      ))}
    </div>
  );
}

function CoverStickers() {
  const spots: { name: StickerName; className: string; size: number }[] = [
    { name: "cap", className: "top-[11%] left-[7%] -rotate-12", size: 60 },
    { name: "pennant", className: "top-[9%] right-[6%] rotate-12", size: 64 },
    { name: "coffee", className: "bottom-[9%] left-[9%] -rotate-6", size: 52 },
    { name: "books", className: "bottom-[8%] right-[8%] rotate-6", size: 58 },
  ];
  return (
    <div className="cover-stickers" aria-hidden="true">
      {spots.map((spot) => (
        <Sticker
          key={spot.name}
          name={spot.name}
          size={spot.size}
          className={`vinyl absolute text-blush-deep ${spot.className}`}
        />
      ))}
    </div>
  );
}

function Rich({ text }: { text: string }) {
  return text.split(/(\{[^}]+\})/).map((part, index) =>
    part.startsWith("{") && part.endsWith("}") ? (
      <mark key={index} className="hl">
        {part.slice(1, -1)}
      </mark>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

function plain(text: string) {
  return text.replace(/[{}]/g, "");
}

function foldedNote(replies: string[]) {
  const chosen = letter.replies.filter((reply) => replies.includes(reply.id));
  if (chosen.length === 0) return letter.foldedNote;
  const labels = chosen.map((reply) => reply.label).join(" · ");
  return `you left “${labels}” on the page. i'll keep it.`;
}

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

function Petals() {
  return (
    <div aria-hidden="true">
      <span className="petal" />
      <span className="petal" />
      <span className="petal" />
      <span className="petal" />
      <span className="petal" />
    </div>
  );
}

function Envelope({
  folded,
  onOpen,
}: {
  folded: boolean;
  onOpen: () => void;
}) {
  const face = (
    <>
      <span className="env-back" />
      <span className="env-letter-peek" />
      <span className="env-pocket" />
      <span className="env-flap" />
      <span className="env-seal" aria-hidden="true">
        <Sticker name="heart" />
      </span>
    </>
  );

  if (folded) return <div className="env">{face}</div>;

  return (
    <button type="button" className="env" onClick={onOpen} aria-label={letter.sealLabel}>
      {face}
    </button>
  );
}
