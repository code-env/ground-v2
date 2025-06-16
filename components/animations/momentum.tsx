"use client";
import { motion } from "motion/react";
import { MouseEvent, useRef } from "react";

const THRESHOLD = 200;
const ARRAY_LENGTH = 17;

export default function MomentumLines() {
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const mouseX = e.nativeEvent.offsetX;
    const containerWidth = containerRef.current.offsetWidth;
    const lines = containerRef.current.querySelectorAll(".line");

    lines.forEach((line, index) => {
      const lineDiv = line as HTMLDivElement;
      const relativeLeft =
        lineDiv.offsetLeft - containerRef.current!.offsetLeft;
      const xPercentage = mouseX / containerWidth;
      const linePercentage = relativeLeft / containerWidth;
      const gapPercentage = Math.abs(xPercentage - linePercentage);
      const isLastOrFirst = !index || index === lines.length - 1;
      const threshold = isLastOrFirst ? THRESHOLD / 2 : THRESHOLD;

      const gapDiff = Math.min(
        Math.max(mouseX - relativeLeft, -threshold),
        threshold
      );

      lineDiv.style.setProperty(
        "--x-position",
        `${gapDiff * (1 - gapPercentage)}px`
      );
      lineDiv.style.setProperty("--opacity-value", `${1 - gapPercentage}`);
    });
  };

  const onMouseOut = () => {
    const lines = containerRef.current?.querySelectorAll(".line");
    lines?.forEach((line) => {
      const lineDiv = line as HTMLDivElement;
      lineDiv.style.setProperty("--x-position", "0px");
      lineDiv.style.setProperty("--opacity-value", "1");
    });
  };

  return (
    <article className="grid aspect-video place-items-center rounded-xl border border-white/10 bg-white/5">
      <div
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        className="flex h-full w-full justify-between p-10"
        ref={containerRef}
      >
        {[...new Array(ARRAY_LENGTH).fill(0)].map((_, index) => (
          <motion.div
            key={index}
            className="line pointer-events-none h-full w-px bg-white"
            animate={{
              x: "var(--x-position, 0px)",
              opacity: "var(--opacity-value, 1)",
            }}
            transition={{
              type: "spring",
              duration: 0.8,
              bounce: 0,
            }}
          />
        ))}
      </div>
    </article>
  );
}
