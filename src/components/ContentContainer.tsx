import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function ContentContainer(
  props: PropsWithChildren<{ className?: string }>
) {
  const { className, children } = props;
  return (
    <div className={clsx("container mx-auto px-4 sm:px-8", className)}>
      {children}
    </div>
  );
}
