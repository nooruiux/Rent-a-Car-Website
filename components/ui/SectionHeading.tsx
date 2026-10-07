import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h2" | "h3";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("flex flex-col gap-4 md:gap-6", centered ? "items-center text-center" : "items-start text-left", className)}>
      <div className={cn("flex flex-col gap-2", centered ? "items-center" : "items-start")}>
        {eyebrow ? <p className="text-body-xl leading-normal font-semibold text-secondary">{eyebrow}</p> : null}
        <Tag id={id} className={cn("text-h3 font-semibold text-ink", titleClassName)}>
          {title}
        </Tag>
      </div>
      {description ? (
        <p className={cn("text-body-lg text-ink-soft", centered ? "max-w-[500px]" : "max-w-[392px]", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
