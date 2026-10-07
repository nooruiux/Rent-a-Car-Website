"use client";

import { useState } from "react";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { Reveal } from "@/components/ui/Reveal";
import { carFind } from "@/data/site";

export function CarFind() {
  const [city, setCity] = useState<string | undefined>(undefined);

  return (
    <section id="categories" aria-labelledby="carfind-title" className="mt-section">
      <div className="container-site flex flex-col items-center gap-10 md:gap-16">
        <div className="flex w-full flex-col gap-10 md:gap-16">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h2 id="carfind-title" className="text-h4 font-bold text-ink">
              {carFind.title}
            </h2>
            <Dropdown
              label="Select city"
              options={carFind.cities.map((c) => ({ label: c, value: c }))}
              value={city}
              onChange={setCity}
              triggerClassName="gap-2 text-h4 font-normal text-primary hover:text-primary-hover"
              chevronClassName="size-5"
            >
              {city ?? carFind.cityLabel}
            </Dropdown>
          </div>

          <ul className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4 md:gap-y-8 lg:grid-cols-4 lg:gap-x-0">
            {carFind.categories.map((category, i) => (
              <Reveal as="li" key={category.id} delay={(i % 4) * 0.06}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </ul>
        </div>

        <Button href="#cars" variant="outline" withArrow className="px-10 sm:px-20">
          {carFind.cta}
        </Button>
      </div>
    </section>
  );
}
