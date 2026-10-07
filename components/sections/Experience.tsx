import Image from "next/image";
import { FeatureItem } from "@/components/cards/FeatureItem";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/site";

export function Experience() {
  const { title } = experience;
  return (
    <section aria-labelledby="experience-title" className="mt-section">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[560px_1fr] lg:gap-[93px]">
        <Reveal className="mx-auto w-full max-w-[560px]">
          <Image src={experience.image} alt={experience.alt} width={1120} height={1056} sizes="(min-width: 1024px) 560px, 92vw" className="h-auto w-full" />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-body-xl leading-normal font-semibold text-secondary">{experience.eyebrow}</p>
            <div className="flex flex-col gap-6">
              <h2 id="experience-title" className="max-w-[479px] text-h3 font-semibold text-ink">
                {title.before}
                <span className="text-accent">{title.highlight}</span>
                {title.after}
              </h2>
              <p className="max-w-[485px] text-body-lg text-ink-soft">{experience.description}</p>
            </div>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 xl:gap-x-16">
            {experience.features.map((feature) => (
              <li key={feature.id}>
                <FeatureItem feature={feature} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
