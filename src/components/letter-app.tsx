"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { letter, type LetterPage, type StickerName } from "@/content/letter";
import { Sticker } from "@/components/stickers";
import { Friends } from "@/components/friends";
import { Confetti } from "@/components/confetti";

type Phase = "sealed" | "reading" | "folded";
type Direction = "next" | "back";

export function LetterApp() {
  const [phase, setPhase] = useState<Phase>("sealed");
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<Direction>("next");
  const [replies, setReplies] = useState<string[]>([]);
  const [plans, setPlans] = useState<string[]>([]);
  const [burst, setBurst] = useState(0);
  const startX = useRef<number | null>(null);

  const celebrate = useCallback(() => setBurst((count) => count + 1), []);

  const openLetter = useCallback(() => {
    setDirection("next");
    setPage(0);
    setPhase("reading");
  }, []);

  const next = useCallback(() => {
    if (page >= letter.pages.length - 1) {
      setPhase("folded");
      return;
    }
    setDirection("next");
    setPage((current) => current + 1);
  }, [page]);

  const back = useCallback(() => {
    if (page === 0) return;
    setDirection("back");
    setPage((current) => current - 1);
  }, [page]);

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

  function togglePlan(id: string, total: number) {
    const nextPlans = toggle(plans, id);
    setPlans(nextPlans);
    if (nextPlans.length === total && !plans.includes(id)) celebrate();
  }

  function toggleReply(id: string) {
    if (!replies.includes(id)) celebrate();
    setReplies((list) => toggle(list, id));
  }

  const current = letter.pages[page];
  const last = page === letter.pages.length - 1;

  return (
    <main className="desk">
      <section className="sheet" aria-label={`A letter for ${letter.recipient}`}>
        <Petals />
        {burst > 0 ? <Confetti key={burst} /> : null}
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
              className={`page-in page-in-${direction} mt-6 flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto pb-2`}
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

              <PageExtras page={current} plans={plans} onTogglePlan={togglePlan} />

              {last ? (
                <div className="mt-6">
                  <p className="font-hand text-[1.85rem] leading-none text-ink">
                    {letter.signoff}
                  </p>
                  <p className="font-display text-xl text-ink italic">
                    {letter.signature}
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
                        onClick={() => toggleReply(reply.id)}
                      >
                        <Sticker name={reply.sticker} className="text-blush-deep" />
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
                    className={`h-1.5 rounded-full transition-all duration-300 ${
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
          <div className="pad-safe relative z-10 flex flex-1 flex-col items-center justify-center-safe overflow-y-auto px-6 text-center">
            <CoverStickers />
            <p className="relative text-xs font-bold tracking-[0.22em] text-blush-deep uppercase">
              {letter.eyebrow}
            </p>
            <h1 className="relative mt-3 font-display text-5xl leading-none font-medium text-ink italic">
              {phase === "folded" ? letter.foldedTitle : letter.coverTitle}
            </h1>
            <div className="relative mt-4">
              <Friends
                key={phase}
                pose={phase === "folded" ? "hug" : "wave"}
                bubble={phase === "folded" ? undefined : "hi nikkie!"}
                className="cover-pals"
              />
              <div className="relative z-10 -mt-12">
                <Envelope folded={phase === "folded"} onOpen={openLetter} />
              </div>
            </div>
            <p className="relative mt-6 max-w-[18rem] font-hand text-[1.6rem] leading-snug text-ink-soft">
              {phase === "folded" ? foldedNote(replies) : letter.coverNote}
            </p>
            {phase === "folded" ? (
              <button type="button" className="btn btn-primary relative mt-5" onClick={openLetter}>
                {letter.again}
              </button>
            ) : (
              <button type="button" className="btn btn-primary relative mt-5" onClick={openLetter}>
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
  onTogglePlan: (id: string, total: number) => void;
}) {
  switch (page.kind) {
    case "text":
      if (page.friends) {
        return (
          <div className="mt-6 flex justify-center">
            <Friends
              pose={page.friends.pose}
              bubble={page.friends.bubble}
              className="page-pals"
            />
          </div>
        );
      }
      return page.stickers.length ? <StickerCluster names={page.stickers} /> : null;

    case "photos":
      return <PhotoStack photos={page.photos} hint={page.hint} />;

    case "bucket":
      return (
        <div className="mt-5">
          <p className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
            {page.hint}
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {page.items.map((item, index) => {
              const on = plans.includes(item.id);
              return (
                <li
                  key={item.id}
                  className="todo-in"
                  style={{ animationDelay: `${0.12 + index * 0.07}s` }}
                >
                  <button
                    type="button"
                    className="todo"
                    data-on={on}
                    aria-pressed={on}
                    onClick={() => onTogglePlan(item.id, page.items.length)}
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
              className="polaroid polaroid-drop"
              style={{
                rotate: `${photo.tilt}deg`,
                marginTop: index === 1 ? 18 : 0,
                zIndex: index === 1 ? 2 : 1,
                animationDelay: `${0.15 + index * 0.12}s`,
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
        <div className="promise mt-6">
          <Friends pose="hug" className="promise-pals" />
          <p className="mt-1 text-xs font-bold tracking-[0.22em] text-ink-soft uppercase">
            protected at all costs
          </p>
          <p className="mt-1 font-display text-[2.9rem] leading-none font-semibold italic">
            <mark className="hl">{page.word}</mark>
          </p>
        </div>
      );
  }
}

function PhotoStack({
  photos,
  hint,
}: {
  photos: Extract<LetterPage, { kind: "photos" }>["photos"];
  hint: string;
}) {
  const [front, setFront] = useState(0);

  return (
    <div className="mt-5">
      <p className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
        {hint}
      </p>
      <div className="photo-stack mt-4">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className="photo"
            data-wide={photo.wide || undefined}
            data-front={front === index}
            aria-pressed={front === index}
            aria-label={`${photo.caption}: ${photo.alt}`}
            onClick={() => setFront(index)}
            style={{
              rotate: `${front === index ? photo.tilt / 2 : photo.tilt}deg`,
              animationDelay: `${0.12 + index * 0.08}s`,
            }}
          >
            <span className="photo-img" style={{ aspectRatio: photo.ratio ?? "4 / 5" }}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={photo.wide ? "(max-width: 430px) 88vw, 360px" : "(max-width: 430px) 44vw, 180px"}
                style={{ objectFit: "cover", objectPosition: photo.focus }}
                priority={index < 2}
              />
            </span>
            <span className="photo-caption">{photo.caption}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StickerCluster({ names }: { names: StickerName[] }) {
  return (
    <div className="mt-8 flex items-end justify-end gap-3 pr-2" aria-hidden="true">
      {names.map((name, index) => (
        <Sticker
          key={name}
          name={name}
          size={index === 0 ? 72 : 56}
          className={`vinyl sticker-wobble text-blush-deep ${index % 2 ? "rotate-12" : "-rotate-6"}`}
        />
      ))}
    </div>
  );
}

function CoverStickers() {
  const spots: { name: StickerName; className: string; size: number }[] = [
    { name: "cap", className: "top-[8%] left-[6%] -rotate-12", size: 56 },
    { name: "pennant", className: "top-[7%] right-[6%] rotate-12", size: 60 },
    { name: "coffee", className: "bottom-[6%] left-[8%] -rotate-6", size: 48 },
    { name: "books", className: "bottom-[5%] right-[8%] rotate-6", size: 54 },
  ];
  return (
    <div className="cover-stickers" aria-hidden="true">
      {spots.map((spot) => (
        <Sticker
          key={spot.name}
          name={spot.name}
          size={spot.size}
          className={`vinyl sticker-wobble absolute text-blush-deep ${spot.className}`}
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
    <button type="button" className="env env-wiggle" onClick={onOpen} aria-label={letter.sealLabel}>
      {face}
    </button>
  );
}
