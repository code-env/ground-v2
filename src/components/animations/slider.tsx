"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

interface SliderProps {
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  damping?: number;
  stiffness?: number;
}

const AnimatedValue = ({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}) => {
  const previousValue = useRef(value);
  const direction = value > previousValue.current ? 1 : -1;
  const isFirstRender = useRef(true);

  useEffect(() => {
    previousValue.current = value;
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [value]);

  return (
    <div className="flex">
      <motion.div
        key={value}
        initial={
          isFirstRender.current
            ? false
            : { y: direction * 15, opacity: 0, filter: "blur(10px)" }
        }
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -direction * 15, opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 0.3 }}
        className="w-full text-right"
      >
        {value}
      </motion.div>
      <span className="pl-1">/{maxValue}</span>
    </div>
  );
};

const Slider = ({
  defaultValue = 4,
  minValue = 1,
  maxValue = 10,
  step = 1,
  damping = 20,
  stiffness = 300,
}: SliderProps) => {
  const range = Math.floor((maxValue - minValue) / step);
  const notchSize = 100 / range;
  const clampedDefaultValue = Math.min(
    Math.max(defaultValue, minValue),
    maxValue,
  );

  const [currentValue, setCurrentValue] = useState(clampedDefaultValue);
  const x = useSpring(((clampedDefaultValue - minValue) / range) * 100, {
    damping,
    stiffness,
  });
  const width = useTransform(x, [0, 100], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = x.onChange((latest) => {
      const newValue = Math.round((latest / 100) * range) * step + minValue;
      setCurrentValue(newValue);
    });
    return unsubscribe;
  }, [x, range, step, minValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    x.set(newValue);
  };

  const handleDragEnd = () => {
    const closestNotch = Math.round(x.get() / notchSize) * notchSize;
    x.set(closestNotch);
  };

  const notches = useMemo(() => [...Array(range + 1)], [range]);

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        className="relative flex h-12 items-center gap-5 rounded-full bg-primary pl-4 pr-6 dark:bg-background"
        aria-label="Custom Slider"
      >
        <div className="relative flex h-6 min-w-12 items-center justify-center text-sm font-semibold text-white dark:text-black">
          <AnimatedValue value={currentValue} maxValue={maxValue} />
        </div>
        <div className="relative h-1/3 w-full ">
          <div className="absolute inset-0 rounded-full bg-neutral-800 flex items-center justify-between px-2">
            {notches.map((_, i) => (
              <div key={i} className="size-2 rounded-full bg-neutral-400" />
            ))}
          </div>

          <motion.div
            className="absolute inset-y-0 left-0 z-10 rounded-l-full bg-background dark:bg-primary"
            style={{ width }}
          >
            <motion.div className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-neutral-800 bg-background shadow-md dark:border-neutral-300 dark:bg-primary" />
          </motion.div>

          <input
            type="range"
            min={-notchSize / 2}
            max={100 + notchSize / 2}
            value={x.get()}
            onChange={handleChange}
            onPointerUp={handleDragEnd}
            aria-valuemin={minValue}
            aria-valuemax={maxValue}
            aria-valuenow={currentValue}
            className="absolute -inset-x-0 inset-y-0 z-20 w-[calc(100%)] cursor-pointer opacity-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
