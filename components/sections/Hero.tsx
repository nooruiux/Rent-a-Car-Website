import Image from "next/image";
import { SwooshIcon } from "@/components/icons";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { hero } from "@/data/site";
import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative overflow-hidden bg-surface pb-24 lg:min-h-[607px] lg:pb-0">
        <div className="container-site relative grid items-start gap-8 pt-10 md:pt-14 lg:grid-cols-[517px_1fr] lg:gap-0 lg:pt-[104px]">
          <div className="relative z-10 flex flex-col items-start gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <p className="flex h-[53px] items-start text-h5 font-medium text-ink">
                  <span className="mt-0.5">{hero.eyebrow}</span>
                  <span className="relative ml-[9px] text-h4 font-medium">
                    <SwooshIcon className="pointer-events-none absolute top-0 -left-[29px] h-[53px] w-[142px] max-w-none" />
                    <span className="relative">{hero.city}</span>
                  </span>
                </p>
                <h1 id="hero-title" className="max-w-[517px] text-h1 font-bold text-ink">
                  {hero.title}
                </h1>
              </div>
              <p className="max-w-[508px] text-body-xl font-medium text-ink-72">{hero.description}</p>
            </div>
            <StoreBadges className="lg:ml-1" />
          </div>

        </div>

        <div className="pointer-events-none relative mt-8 ml-auto w-[94%] max-w-[719px] lg:absolute lg:top-14 lg:right-0 lg:mt-0 lg:w-[min(719px,50vw)]">
          <Image
            src="/images/hero-lamborghini-huracan.png"
            alt="Orange Lamborghini Huracán Performante, front three-quarter view"
            width={1438}
            height={928}
            preload
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 1440px) 719px, (min-width: 1024px) 50vw, 94vw"
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="container-site relative z-20 -mt-16 lg:-mt-14">
        <div className="xl:ml-[218px] xl:w-[1011px]">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
