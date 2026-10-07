import { Fragment } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { statistics, type Stat } from "@/data/site";
import { cn } from "@/lib/cn";

const labelStyles: Record<Stat["labelStyle"], string> = {
  h5: "text-h5 font-semibold",
  "h5-poppins": "font-poppins text-h5 font-medium",
  h4: "text-h4 font-semibold",
};

function Divider() {
  return (
    <li
      aria-hidden="true"
      className="relative hidden h-24 w-px bg-line before:absolute before:-top-0.5 before:-left-[2px] before:size-[5px] before:rounded-full before:bg-line after:absolute after:-bottom-0.5 after:-left-[2px] after:size-[5px] after:rounded-full after:bg-line lg:block"
    />
  );
}

export function Statistics() {
  const { title, items } = statistics;
  return (
    <section aria-labelledby="stats-title" className="mt-section">
      <div className="container-site">
        <Reveal>
          <h2 id="stats-title" className="max-w-[425px] text-h2 font-bold text-ink">
            {title.before}
            <span className="text-gradient-brand">{title.highlight}</span>
            {title.after}
          </h2>
        </Reveal>
      </div>

      <div className="mt-10 bg-pure-white shadow-band md:mt-16">
        <ul className="mx-auto grid max-w-[1322px] grid-cols-2 gap-x-4 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-4 md:gap-x-6 lg:flex lg:min-h-[208px] lg:items-center lg:justify-between lg:gap-0 lg:px-6 lg:py-14 xl:px-4">
          {items.map((stat, i) => (
            <Fragment key={stat.value}>
              {i > 0 ? <Divider /> : null}
              <Reveal as="li" delay={i * 0.08} className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-4 xl:gap-6">
                <p className="text-h1 font-bold text-primary">{stat.value}</p>
                <p className={cn("text-ink-80", labelStyles[stat.labelStyle], stat.value === "60" ? "max-w-[155px]" : "whitespace-nowrap")}>
                  {stat.label.map((line, j) => (
                    <Fragment key={line}>
                      {j > 0 ? <br /> : null}
                      {line}
                    </Fragment>
                  ))}
                </p>
              </Reveal>
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}
