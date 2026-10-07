"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export type AccordionItem = { id: string; question: string; answer: string };

type AccordionProps = {
  items: AccordionItem[];
  defaultOpen?: number;
  className?: string;
};

export function Accordion({ items, defaultOpen = 0, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.id} className="rounded-lg border border-line-soft bg-pure-white transition-shadow duration-300 hover:shadow-band">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn("flex w-full items-center justify-between gap-6 rounded-lg p-5 text-left md:p-6", isOpen && "pb-3 md:pb-3")}
              >
                <span className="max-w-[781px] text-title font-medium text-ink">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-md border border-navy-6 bg-navy-4 text-navy transition-colors md:size-12",
                    isOpen && "border-primary/30 bg-sky-50 text-secondary",
                  )}
                >
                  {isOpen ? <MinusIcon className="size-6" /> : <PlusIcon className="size-6" />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[823px] px-5 pb-6 text-body-xl font-medium text-black-56 md:px-6">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
