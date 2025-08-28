// "use client";
// import { motion, type MotionProps } from "framer-motion";
// import { PropsWithChildren } from "react";

// export default function FadeUp({
//   children,
//   delay = 0,
//   as = "div",
//   ...rest
// }: PropsWithChildren<{ delay?: number; as?: keyof JSX.IntrinsicElements } & MotionProps>) {
//   const M = motion[as as keyof typeof motion] as any;
//   return (
//     <M
//       initial={{ opacity: 0, y: 6 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.35, delay }}
//       {...rest}
//     >
//       {children}
//     </M>
//   );
// }



"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

// All intrinsic motion tags available on `motion` (div, header, section, etc.)
type ElementTag = keyof typeof motion;

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  /** Which element to render as (e.g. "div", "header", "section") */
  as?: ElementTag;
  /** Stagger delay in seconds */
  delay?: number;
} & Omit<MotionProps, "children">;

export default function FadeUp({
  children,
  className,
  as = "div",
  delay = 0,
  ...rest
}: FadeUpProps) {
  // Pick the correct motion.* element at runtime
  const MotionTag = (motion as any)[as] as React.ComponentType<
    MotionProps & { className?: string }
  >;

  return (
    <MotionTag
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

