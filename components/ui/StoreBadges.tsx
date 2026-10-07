import Image from "next/image";
import { storeBadges } from "@/data/site";
import { cn } from "@/lib/cn";

export function StoreBadges({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-start gap-4", className)} aria-label="Download the app">
      {storeBadges.map((badge) => (
        <li key={badge.id}>
          <a
            href={badge.href}
            aria-label={badge.label}
            className="block rounded-sm transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Image src={badge.image} alt="" width={148} height={55} sizes="148px" className="h-[55px] w-[148px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
