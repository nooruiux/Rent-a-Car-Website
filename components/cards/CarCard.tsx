import Image from "next/image";
import type { ComponentType } from "react";
import { AcIcon, AutoIcon, PetrolIcon, SeatIcon, type IconProps } from "@/components/icons";
import { Stars } from "@/components/ui/Stars";
import type { Car, CarSpec } from "@/data/site";

const specIcons: Record<CarSpec, ComponentType<IconProps>> = {
  seat: SeatIcon,
  ac: AcIcon,
  auto: AutoIcon,
  petrol: PetrolIcon,
};

export function CarCard({ car, cta }: { car: Car; cta: string }) {
  return (
    <article aria-labelledby={`car-${car.id}`} className="group flex h-full w-full flex-col transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-1 flex-col rounded-t-sm bg-pure-white shadow-card">
        <div className="flex h-[204px] flex-col px-6 pt-4">
          <h3 id={`car-${car.id}`} className="text-h5 font-semibold text-secondary">
            {car.name}
          </h3>
          <div className="relative -mx-5 mt-4 flex h-[140px] items-center justify-center">
            <Image
              src={car.image}
              alt={car.alt}
              width={car.width * 2}
              height={car.height * 2}
              sizes="290px"
              className="h-auto max-h-[147px] w-auto transition-transform duration-500 group-hover:scale-[1.04]"
              style={{ maxWidth: `min(${car.width}px, 100%)` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 px-6 pt-4 pb-5">
          <div className="flex flex-col">
            <p className="text-body-xl leading-[30px] font-semibold text-ink">
              ${car.price}
              <span className="text-body-lg font-normal text-ink-72">/day</span>
            </p>
            <div className="flex items-center gap-2">
              <Stars rating={car.rating} size="sm" />
              <span className="text-body-md leading-none font-semibold text-black-72">{car.reviews} reviews</span>
            </div>
          </div>
          <ul className="flex items-start gap-4" aria-label="Specifications">
            {car.specs.map((spec) => {
              const Icon = specIcons[spec.icon];
              return (
                <li key={spec.icon} className="flex flex-col items-center gap-1">
                  <span className="flex size-8 items-center justify-center rounded-xs bg-sky-50 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-body-md leading-[1.3] font-semibold text-black-56">{spec.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <a
        href="#search"
        aria-label={`${cta} — ${car.name}`}
        className="flex h-12 items-center justify-center rounded-b-sm bg-primary text-body-lg leading-none font-semibold text-white transition-colors duration-200 hover:bg-primary-hover"
      >
        {cta}
      </a>
    </article>
  );
}
