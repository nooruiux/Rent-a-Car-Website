"use client";

import { useState } from "react";
import { CarCard } from "@/components/cards/CarCard";
import { Carousel } from "@/components/ui/Carousel";
import { Dropdown } from "@/components/ui/Dropdown";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bookCars } from "@/data/site";
import { cn } from "@/lib/cn";

type BookCarsProps = {
  id?: string;
  variant?: "centered" | "left";
};

export function BookCars({ id, variant = "centered" }: BookCarsProps) {
  const centered = variant === "centered";
  const [filters, setFilters] = useState<Record<string, string | undefined>>({});
  const headingId = `${id ?? variant}-title`;
  // The design shows four cars; the list repeats so the carousel always has slides to move through.
  const slides = [...bookCars.cars, ...bookCars.cars];

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("mt-section", centered && "bg-tint-warm py-10 md:pt-[46px] md:pb-[46px]")}
    >
      <div className={cn("container-site flex flex-col gap-10 md:gap-16", centered ? "items-center" : "items-stretch")}>
        <Reveal className={cn("flex flex-col gap-6", centered ? "items-center" : "items-start")}>
          <SectionHeading id={headingId} title={bookCars.title} description={bookCars.description} align={centered ? "center" : "left"} />
          <div className={cn("flex flex-wrap gap-3 md:gap-4", centered ? "justify-center" : "justify-start")} role="group" aria-label="Filter cars">
            {bookCars.filters.map((filter) => (
              <Dropdown
                key={filter.id}
                label={`Filter by ${filter.id.replace("-", " ")}`}
                options={filter.options.map((o) => ({ label: o, value: o }))}
                value={filters[filter.id]}
                onChange={(v) => setFilters((f) => ({ ...f, [filter.id]: v }))}
                triggerClassName={cn(
                  "gap-6 border border-line px-4 py-2 text-body-lg text-ink-72 transition-colors hover:border-primary",
                  filters[filter.id] && "border-primary text-primary",
                )}
                chevronClassName="text-black-64"
              >
                {filters[filter.id] ?? filter.label}
              </Dropdown>
            ))}
          </div>
        </Reveal>

        <Carousel label={`${bookCars.title} — ${centered ? "featured" : "more"} cars`} className="w-full" itemClassName="w-[min(302px,78vw)]">
          {slides.map((car, i) => (
            <CarCard key={`${car.id}-${i}`} car={car} cta={bookCars.cta} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
