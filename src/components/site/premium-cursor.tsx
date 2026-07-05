"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function PremiumCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveX = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3" });

    const handleMove = (event: MouseEvent) => {
      moveX(event.clientX - 16);
      moveY(event.clientY - 16);
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 rounded-full border border-gold/50 mix-blend-difference md:block"
    />
  );
}
