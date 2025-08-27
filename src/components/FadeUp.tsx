"use client";
import { motion, type MotionProps } from "framer-motion";
import { PropsWithChildren } from "react";

export default function FadeUp({
  children,
  delay = 0,
  as = "div",
  ...rest
}: PropsWithChildren<{ delay?: number; as?: keyof JSX.IntrinsicElements } & MotionProps>) {
  const M = motion[as as keyof typeof motion] as any;
  return (
    <M
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}
