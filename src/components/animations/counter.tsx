"use client";

import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

import {
  AnimatePresence,
  motion,
  useAnimate,
  type Variants,
} from "motion/react";
import { useState } from "react";

const animation: Variants = {
  hidden: (direction: -1 | 1) => ({
    y: direction === 1 ? 30 : -30,
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.5,
  }),
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  exit: (direction: -1 | 1) => ({
    y: direction === 1 ? -30 : 30,
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.5,
  }),
};

interface CounterProps {
  min?: number;
  max?: number;
  initial?: number;
  onChange?: (value: number) => void;
  step?: number;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({
  min = 0,
  max = 20,
  initial = 0,
  onChange,
  step = 1,
  className = "",
}) => {
  const [num, setNum] = useState(initial);
  const [direction, setDirection] = useState(1);

  const [scope, animate] = useAnimate();

  const handleShake = () => {
    animate(scope.current, { x: [0, 5, -5, 0] }, { duration: 0.2 });
  };

  const counter = (action: "decrease" | "increase") => {
    if (action === "decrease") {
      if (num <= min) return handleShake();
      setNum((prev) => {
        const newValue = prev - step;
        onChange?.(newValue);
        return newValue;
      });
      setDirection(-1);
    } else if (action === "increase") {
      if (num >= max) return handleShake();
      setNum((prev) => {
        const newValue = prev + step;
        onChange?.(newValue);
        return newValue;
      });
      setDirection(1);
    }
  };

  return (
    <div
      className={cn(
        "size-full flex flex-col items-center justify-center",
        className,
      )}
    >
      <div
        ref={scope}
        className="flex items-center justify-center gap-8 text-4xl bg-background rounded-full p-2 border-2"
      >
        <button
          onClick={() => counter("decrease")}
          className={cn(
            "bg-box flex h-14 w-14 items-center justify-center rounded-full text-xl active:scale-90 bg-muted overflow-hidden",
            num <= min && "opacity-50",
          )}
        >
          <Minus />
        </button>
        <h3 className="w-12 text-center">
          <AnimatePresence mode="popLayout" custom={direction}>
            {num
              .toString()
              .split("")
              .map((value, index) => (
                <motion.span
                  key={`${value} ${index}`}
                  variants={animation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={direction}
                  className="inline-block"
                >
                  {value}
                </motion.span>
              ))}
          </AnimatePresence>
        </h3>
        <button
          onClick={() => counter("increase")}
          className={cn(
            "bg-box flex h-14 w-14 items-center justify-center rounded-full text-xl active:scale-90 bg-muted",
            num >= max && "opacity-50",
          )}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
