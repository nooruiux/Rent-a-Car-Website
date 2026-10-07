import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6",
  lg: "h-14 px-6",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;
type ButtonAsButton = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function buttonClasses({ variant = "primary", size = "lg", className }: Pick<BaseProps, "variant" | "size" | "className">) {
  return cn(
    "group inline-flex items-center justify-center gap-4 rounded-xs text-body-lg leading-none font-semibold whitespace-nowrap",
    "transition-colors duration-200 focus-visible:outline-offset-4",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button(props: ButtonProps) {
  const { variant, size, withArrow, className, children, ...rest } = props;
  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
      ) : null}
    </>
  );

  if (typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    return (
      <Link href={href} className={buttonClasses({ variant, size, className })} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof BaseProps>;
  return (
    <button type="button" className={buttonClasses({ variant, size, className })} {...buttonProps}>
      {content}
    </button>
  );
}
