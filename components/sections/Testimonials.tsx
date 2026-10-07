"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useState } from "react";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { ArrowButton } from "@/components/ui/Carousel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";
import { testimonials } from "@/data/site";

const { items } = testimonials;
const wrap = (i: number) => (i + items.length) % items.length;

export function Testimonials() {
  // The center card is the "active" testimonial; Figma starts with Jenny Wilson in the middle.
  const [active, setActive] = useState(1);
  const go = (dir: 1 | -1) => setActive((i) => wrap(i + dir));

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  const visible = [wrap(active - 1), active, wrap(active + 1)];

  return (
    <section aria-labelledby="testimonials-title" className="mt-section bg-tint-cool py-12 md:pt-12 md:pb-10">
      <div className="container-site flex flex-col items-center gap-10 md:gap-16">
        <Reveal className="flex flex-col items-center gap-6">
          <SectionHeading
            id="testimonials-title"
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
            description={testimonials.description}
            titleClassName="max-w-[746px]"
            descriptionClassName="max-w-[596px]"
            className="gap-4!"
          />
          <p className="flex flex-col items-center gap-3 text-center sm:flex-row">
            <Stars rating={testimonials.rating.score} size="lg" />
            <span className="text-body-xl leading-normal font-semibold text-ink">
              {testimonials.rating.text}
              <a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {testimonials.rating.platform}
              </a>
            </span>
          </p>
        </Reveal>

        <div className="relative w-full" role="region" aria-roledescription="carousel" aria-label="Customer testimonials">
          {/* Desktop: three cards, middle one elevated */}
          <div className="hidden min-h-[475px] grid-cols-3 items-center gap-6 px-[5px] lg:grid">
            {visible.map((index, position) => (
              <motion.div key={items[index].id} layout transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <TestimonialCard testimonial={items[index]} featured={position === 1} />
              </motion.div>
            ))}
          </div>

          {/* Mobile & tablet: one at a time, swipeable */}
          <div className="mx-auto max-w-[409px] overflow-hidden px-1 py-2 lg:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={items[active].id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
                aria-roledescription="slide"
                aria-label={`${active + 1} of ${items.length}`}
              >
                <TestimonialCard testimonial={items[active]} featured />
              </motion.div>
            </AnimatePresence>
          </div>

          <p aria-live="polite" className="sr-only">
            Showing testimonial from {items[active].name}
          </p>

          <ArrowButton
            direction="prev"
            label="Previous testimonial"
            onClick={() => go(-1)}
            className="absolute top-1/2 -left-2 z-10 -translate-y-1/2 sm:left-4 lg:top-[220px] lg:-left-[19px] xl:-left-[16px]"
          />
          <ArrowButton
            direction="next"
            label="Next testimonial"
            onClick={() => go(1)}
            className="absolute top-1/2 -right-2 z-10 -translate-y-1/2 sm:right-4 lg:top-[220px] lg:-right-[19px] xl:-right-[16px]"
          />
        </div>
      </div>
    </section>
  );
}
