import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/data/site";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mt-section">
      <div className="container-site flex flex-col items-center gap-10 md:gap-14">
        <Reveal>
          <SectionHeading id="faq-title" title={faq.title} description={faq.description} />
        </Reveal>
        <Accordion items={faq.items} defaultOpen={faq.defaultOpen} className="w-full max-w-[1261px]" />
      </div>
    </section>
  );
}
