"use client";

import { motion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = [0.23, 1, 0.32, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  amount?: number;
};

export function Reveal({ children, className, delay = 0, direction = "up", amount = 0.18 }: RevealProps) {
  const hiddenTransform = direction === "left"
    ? "translate3d(-18px, 0, 0)"
    : direction === "right"
      ? "translate3d(18px, 0, 0)"
      : "translate3d(0, 18px, 0)";

  return (
    <motion.div
      className={className}
      data-motion="reveal"
      initial={{ opacity: 0, transform: hiddenTransform }}
      whileInView={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

export const motionEaseOut = easeOut;
