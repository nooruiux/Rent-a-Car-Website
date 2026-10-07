import Image from "next/image";
import { Stars } from "@/components/ui/Stars";
import type { Testimonial } from "@/data/site";
import { cn } from "@/lib/cn";

type TestimonialCardProps = {
  testimonial: Testimonial;
  featured?: boolean;
  className?: string;
};

export function TestimonialCard({ testimonial, featured = false, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex w-full flex-col items-center gap-6 rounded-sm border border-line-soft bg-pure-white p-6 shadow-soft",
        featured ? "lg:min-h-[475px]" : "lg:min-h-[355px]",
        className,
      )}
    >
      <Image
        src={testimonial.avatar}
        alt={`Portrait of ${testimonial.name}`}
        width={224}
        height={224}
        sizes="112px"
        className="size-24 rounded-full object-cover sm:size-28"
      />
      <div className="flex w-full flex-col items-center gap-2">
        <figcaption className="flex flex-col items-center gap-4">
          <span className="text-h5 font-semibold text-ink">{testimonial.name}</span>
          <Stars rating={testimonial.rating} size="md" />
        </figcaption>
        <blockquote className="w-full text-body-xl font-medium text-body-72">
          <p>{testimonial.quote}</p>
        </blockquote>
      </div>
    </figure>
  );
}
