import Image from "next/image";
import { PointerIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { appCta } from "@/data/site";

export function AppCta() {
  return (
    <section aria-labelledby="app-title" className="mt-section">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-xl bg-primary lg:overflow-visible lg:bg-transparent">
          {/* Blue banner — on desktop the phone overflows above and below it */}
          <div aria-hidden="true" className="absolute inset-x-0 top-[139px] hidden h-[379px] rounded-xl bg-primary lg:block" />

          <div className="relative flex flex-col items-center gap-10 px-6 pt-12 sm:px-10 lg:min-h-[657px] lg:flex-row lg:items-center lg:gap-16 lg:px-0 lg:pt-0 lg:pl-[110px] xl:gap-[140px] xl:pl-[190px]">
            {/* "You" location tag decoration */}
            <div aria-hidden="true" className="absolute top-[284px] left-[87px] hidden h-[69px] w-[74px] xl:block">
              <span className="absolute top-[26px] left-[-4px] inline-block rotate-[38deg] rounded-tl-sm rounded-br-sm bg-tag px-4 py-1 text-body-md leading-none font-bold text-ink">
                {appCta.tag}
              </span>
              <PointerIcon className="absolute top-0 left-[39px] size-[35px] rotate-[95.69deg]" />
            </div>

            <Reveal className="flex w-full max-w-[390px] flex-col items-start gap-6 text-white">
              <div className="flex flex-col gap-4">
                <h2 id="app-title" className="text-h2 font-semibold">
                  {appCta.title}
                </h2>
                <p className="text-body-lg">{appCta.description}</p>
              </div>
              <StoreBadges />
            </Reveal>

            <Reveal delay={0.1} className="relative -mb-24 w-[260px] shrink-0 sm:w-[300px] lg:mb-0 lg:w-[371px]">
              <Image src={appCta.image} alt={appCta.alt} width={742} height={1314} sizes="(min-width: 1024px) 371px, 300px" className="h-auto w-full" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
