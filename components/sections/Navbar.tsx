"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, CloseIcon, LogoMarkIcon, MenuIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/cn";

function Logo() {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className="flex items-center gap-2 rounded-xs">
      <LogoMarkIcon className="size-10 text-secondary md:size-12" />
      <span className="text-[1.75rem] leading-8 font-bold tracking-[0.005em] text-primary md:text-h4">{site.name}</span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-pure-white transition-shadow duration-300",
        scrolled ? "shadow-header" : "shadow-none",
      )}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-6 md:h-24">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {nav.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <Dropdown
                    label={item.label}
                    mode="menu"
                    options={item.children.map((c) => ({ label: c.label, value: c.label, href: c.href }))}
                    triggerClassName="gap-1 text-body-lg font-normal text-ink hover:text-primary transition-colors"
                    chevronClassName="text-black"
                  >
                    {item.label}
                  </Dropdown>
                ) : (
                  <a href={item.href} className="inline-flex min-h-11 items-center rounded-xs text-body-lg text-ink transition-colors hover:text-primary">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 md:gap-6">
          <a href="#" className="hidden min-h-11 items-center rounded-xs text-body-lg leading-none text-ink transition-colors hover:text-primary sm:inline-flex">
            Login
          </a>
          <Button href="#search" size="md" withArrow className="hidden sm:inline-flex">
            Get Started
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-sm text-ink lg:hidden"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setDrawerOpen((o) => !o)}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen ? (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              ref={drawerRef}
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(86vw,360px)] flex-col overflow-y-auto bg-pure-white shadow-soft lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            >
              <div className="flex h-[72px] items-center justify-between border-b border-line-soft px-4">
                <Logo />
                <button
                  type="button"
                  className="inline-flex size-11 items-center justify-center rounded-sm"
                  aria-label="Close menu"
                  onClick={() => {
                    setDrawerOpen(false);
                    toggleRef.current?.focus();
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
              <nav aria-label="Mobile" className="flex-1 px-4 py-4">
                <ul className="flex flex-col">
                  {nav.map((item) => {
                    const isOpen = expanded === item.label;
                    return (
                      <li key={item.label} className="border-b border-line-soft">
                        {item.children ? (
                          <>
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              aria-controls={`drawer-${item.label}`}
                              onClick={() => setExpanded(isOpen ? null : item.label)}
                              className="flex min-h-12 w-full items-center justify-between text-body-xl font-medium text-ink"
                            >
                              {item.label}
                              <ChevronDownIcon className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen ? (
                                <motion.ul
                                  id={`drawer-${item.label}`}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden pl-4"
                                >
                                  {item.children.map((child) => (
                                    <li key={child.label}>
                                      <a
                                        href={child.href}
                                        onClick={() => setDrawerOpen(false)}
                                        className="flex min-h-11 items-center text-body-lg text-ink-72 hover:text-primary"
                                      >
                                        {child.label}
                                      </a>
                                    </li>
                                  ))}
                                </motion.ul>
                              ) : null}
                            </AnimatePresence>
                          </>
                        ) : (
                          <a
                            href={item.href}
                            onClick={() => setDrawerOpen(false)}
                            className="flex min-h-12 items-center text-body-xl font-medium text-ink hover:text-primary"
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="flex flex-col gap-3 border-t border-line-soft p-4">
                <a href="#" className="inline-flex min-h-12 items-center justify-center rounded-xs border border-line text-body-lg font-semibold text-ink">
                  Login
                </a>
                <Button href="#search" size="md" withArrow onClick={() => setDrawerOpen(false)}>
                  Get Started
                </Button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
