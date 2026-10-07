"use client";

import { Children, useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { ChevronLeftIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type CarouselProps = {
  label: string;
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  itemClassName?: string;
  /** Vertical center of the arrows from the top of the track (design: 190px + 16px). */
  arrowTop?: string;
};

export function ArrowButton({
  direction,
  onClick,
  disabled,
  label,
  className,
  style,
}: {
  direction: "prev" | "next";
  style?: CSSProperties;
  onClick: () => void;
  disabled?: boolean;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={cn(
        "group inline-flex size-11 items-center justify-center rounded-full disabled:cursor-not-allowed",
        className,
      )}
    >
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-pure-white text-black shadow-control transition-colors duration-200 group-hover:bg-primary group-hover:text-white group-disabled:opacity-50 group-disabled:group-hover:bg-pure-white group-disabled:group-hover:text-black">
        <ChevronLeftIcon className={cn("h-[15px] w-2", direction === "next" && "rotate-180")} />
      </span>
    </button>
  );
}

/** Accessible, swipeable scroll-snap carousel with prev/next controls. */
export function Carousel({ label, children, className, trackClassName, itemClassName, arrowTop = "206px" }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("[data-carousel-item]");
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const distance = item ? item.offsetWidth + gap : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * distance, behavior: reduce ? "auto" : "smooth" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const items = Children.toArray(children);

  return (
    <div className={cn("relative", className)} role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={cn(
          "scrollbar-none -mx-6 -my-8 flex snap-x scroll-px-6 px-6 snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth py-8 focus-visible:outline-offset-[-3px]",
          trackClassName,
        )}
      >
        {items.map((child, i) => (
          <div
            key={i}
            data-carousel-item
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className={cn("shrink-0 snap-start", itemClassName)}
          >
            {child}
          </div>
        ))}
      </div>

      <ArrowButton
        direction="prev"
        label="Previous slide"
        onClick={() => step(-1)}
        disabled={!canPrev}
        style={{ top: arrowTop }}
        className="absolute -left-1 z-10 -translate-y-1/2 xl:-left-[19px]"
      />
      <ArrowButton
        direction="next"
        label="Next slide"
        onClick={() => step(1)}
        disabled={!canNext}
        style={{ top: arrowTop }}
        className="absolute -right-1 z-10 -translate-y-1/2 xl:-right-[19px]"
      />
    </div>
  );
}
