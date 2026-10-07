import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { offer } from "@/data/site";

export function OfferBanner() {
  return (
    <section id="offer" aria-labelledby="offer-title" className="mt-section">
      <div className="container-site">
        <Reveal className="relative isolate overflow-hidden rounded-xl bg-ink">
          <Image
            src={offer.image}
            alt={offer.alt}
            fill
            sizes="(min-width: 1312px) 1280px, 100vw"
            className="-z-10 object-cover object-[70%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/30 to-transparent md:from-black/40 md:via-transparent"
          />
          <div className="flex min-h-[420px] flex-col justify-center gap-8 px-6 py-12 sm:px-10 md:min-h-[480px] md:px-14">
            <div className="flex flex-col gap-4 text-white">
              <p className="text-body-xl font-medium">{offer.eyebrow}</p>
              <h2 id="offer-title" className="max-w-[472px] text-h2 font-bold">
                <span className="text-gradient-brand">{offer.highlight}</span>
                {offer.title}
              </h2>
            </div>
            <Button href="#search" withArrow className="self-start">
              {offer.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
