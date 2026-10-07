import Image from "next/image";
import type { Category } from "@/data/site";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <a
      href="#cars"
      className="group flex h-full flex-col items-center rounded-xs bg-pure-white transition-shadow duration-300 hover:shadow-card"
    >
      <div className="flex h-[110px] w-full items-end justify-center px-2 sm:h-[148px] sm:pb-1">
        <Image
          src={category.image}
          alt={category.alt}
          width={category.width * 2}
          height={category.height * 2}
          sizes="(min-width: 640px) 268px, 45vw"
          className="h-auto max-h-full w-auto transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03]"
          style={{ maxWidth: `min(${category.width}px, 100%)` }}
        />
      </div>
      <div className="flex flex-col items-center gap-1 px-2 pt-3 pb-5 text-center sm:min-h-[108px] sm:gap-2 sm:pt-4 sm:pb-6">
        <h3 className="text-h5 font-semibold text-ink">{category.name}</h3>
        <p className="text-body-lg font-medium text-ink-72 sm:text-h6">{category.count}</p>
      </div>
    </a>
  );
}
