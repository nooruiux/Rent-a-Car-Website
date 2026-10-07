import { StarHalfIcon, StarIcon, StarRoundedIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type StarsProps = {
  rating: number;
  /** "sm" = 16px card stars, "md" = 17px testimonial stars, "lg" = 24px summary stars. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

const config = {
  sm: { box: "size-4", gap: "gap-[2.5px]", rounded: true },
  md: { box: "h-[16.6px] w-[17.6px]", gap: "gap-[4px]", rounded: false },
  lg: { box: "size-6", gap: "gap-2", rounded: false },
} as const;

export function Stars({ rating, size = "sm", className }: StarsProps) {
  const { box, gap, rounded } = config[size];
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span role="img" aria-label={`Rated ${rating} out of 5`} className={cn("inline-flex items-center text-star", gap, className)}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return rounded ? <StarRoundedIcon key={i} className={box} /> : <StarIcon key={i} className={box} />;
        if (i === full && half) return <StarHalfIcon key={i} className={box} />;
        return <StarIcon key={i} className={cn(box, "opacity-25")} />;
      })}
    </span>
  );
}
