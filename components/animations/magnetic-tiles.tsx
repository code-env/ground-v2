import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { CSSProperties, useEffect, useRef } from "react";

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
}

const MagneticLines = ({
  rows = 9,
  columns = 9,
  // lineColor = "#efefef",
  baseAngle = -10,
  className = "",
  style = {},
}: MagnetLinesProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLSpanElement>("span");

    const onPointerMove = (pointer: PointerEvent) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.clientX - centerX;
        const a = pointer.clientY - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const angle =
          ((Math.acos(b / c) * 180) / Math.PI) *
          (pointer.clientY > centerY ? 1 : -1);

        item.style.setProperty("--rotate", `${angle}deg`);
      });
    };

    window.addEventListener("pointermove", onPointerMove);

    // Trigger pointer movement on the middle span
    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ clientX: rect.x, clientY: rect.y } as PointerEvent);
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <motion.span
      key={i}
      className="block origin-center rounded-xl bg-neutral-800"
      style={{
        width: 5,
        height: 40,
        // @ts-expect-error --rotate is a custom property
        "--rotate": `${baseAngle}deg`,
        willChange: "transform",
      }}
      animate={{
        transform: "rotate(var(--rotate))",
      }}
    />
  ));

  return (
    <div className="size-full bg-background rounded-xl flex items-center justify-center">
      <div
        ref={ref}
        className={cn("grid place-items-center size-96 border", className)}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          ...style,
        }}
      >
        {spans}
      </div>
    </div>
  );
};

export default MagneticLines;
