import clsx from "clsx";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function AnchorButton(
  props: PropsWithChildren<{
    href: string;
    variant?: "small" | "medium" | "large";
    className?: string;
  }>
) {
  const { href, className, variant = "medium", children } = props;
  return (
    <Link href={href}>
      <a
        className={clsx(
          "inline-block rounded-md bg-primary-main hover:brightness-110 hover:transition hover:duration-150 transition duration-150 text-white font-bold",
          {
            small: "px-8 py-2 text-base",
            medium: "px-8 py-2 text-base",
            large: "px-8 py-2 text-base md:px-12 md:py-3 md:text-2xl",
          }[variant],
          className
        )}
      >
        {children}
      </a>
    </Link>
  );
}
