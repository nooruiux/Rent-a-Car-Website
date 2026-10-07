"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export type DropdownOption = { label: string; value: string; href?: string };

type DropdownProps = {
  /** Accessible name for the trigger (e.g. "Select language"). */
  label: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Visible trigger content; defaults to the selected label. */
  children?: ReactNode;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  chevronClassName?: string;
  align?: "start" | "end";
  /** "select" keeps a selected value (listbox); "menu" is a navigation list of links. */
  mode?: "select" | "menu";
};

export function Dropdown({
  label,
  options,
  value,
  onChange,
  children,
  className,
  triggerClassName,
  menuClassName,
  chevronClassName,
  align = "start",
  mode = "select",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const menuId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  useEffect(() => {
    if (open) itemRefs.current[active]?.focus();
  }, [open, active]);

  const openMenu = (index?: number) => {
    const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
    setActive(index ?? selectedIndex);
    setOpen(true);
  };

  const close = (focusTrigger = true) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  };

  const choose = (option: DropdownOption) => {
    onChange?.(option.value);
    close();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(event.key === "ArrowUp" ? options.length - 1 : undefined);
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActive((i) => (i - 1 + options.length) % options.length);
        break;
      case "Home":
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        event.preventDefault();
        setActive(options.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  const isMenu = mode === "menu";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup={isMenu ? "menu" : "listbox"}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={children ? undefined : label}
        onClick={() => (open ? close(false) : openMenu())}
        onKeyDown={onTriggerKeyDown}
        className={cn("inline-flex min-h-11 items-center gap-1 rounded-xs", triggerClassName)}
      >
        {children ?? selected?.label ?? label}
        <ChevronDownIcon className={cn("size-4 shrink-0 transition-transform duration-200", open && "rotate-180", chevronClassName)} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={menuId}
            role={isMenu ? "menu" : "listbox"}
            aria-label={label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            onKeyDown={onMenuKeyDown}
            className={cn(
              "absolute top-full z-50 mt-2 min-w-44 overflow-hidden rounded-sm border border-line-soft bg-pure-white py-2 text-ink shadow-soft",
              align === "end" ? "right-0" : "left-0",
              menuClassName,
            )}
          >
            {options.map((option, index) => {
              const isSelected = !isMenu && option.value === value;
              const itemClass = cn(
                "flex w-full min-h-11 items-center px-4 text-left text-body-lg outline-none transition-colors",
                "hover:bg-sky-50 focus-visible:bg-sky-50 focus-visible:outline-none",
                isSelected && "font-semibold text-primary",
              );
              return (
                <li key={`${option.value}-${index}`} role="none">
                  {isMenu ? (
                    <a
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      role="menuitem"
                      href={option.href ?? "#"}
                      tabIndex={index === active ? 0 : -1}
                      className={itemClass}
                      onClick={() => close(false)}
                    >
                      {option.label}
                    </a>
                  ) : (
                    <button
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={index === active ? 0 : -1}
                      className={itemClass}
                      onClick={() => choose(option)}
                    >
                      {option.label}
                    </button>
                  )}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
