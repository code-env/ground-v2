"use client";

import { motion as m, MotionConfig, Transition } from "motion/react";
import { useEffect, useState } from "react";

const digitPatterns = {
  "0": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "1": [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
  ],
  "2": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  "3": [
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  "4": [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
  ],
  "5": [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  "6": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "7": [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  "8": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "9": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
};

const TRANSITION: Transition = {
  duration: 0.5,
  ease: "easeInOut",
};

export default function DotMatrixClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="flex items-center justify-center full  p-4 bg-[#141414]">
        <div className="flex gap-4">
          {time.split("").map((char, charIndex) => {
            if (char === ":") {
              return (
                <div
                  key={`${char}-${charIndex}`}
                  className="flex flex-col gap-2 items-center justify-center"
                >
                  {Array.from({ length: 2 }).map((_, rowIndex) => (
                    <m.div
                      key={`${time}-${charIndex}-${rowIndex}`}
                      className="flex bg-[rgb(251,233,43)] size-3 rounded-full"
                      initial={{ backgroundColor: `#141414` }}
                      animate={{
                        backgroundColor: `rgb(251,233,43)`,
                      }}
                      exit={{ backgroundColor: `#141414` }}
                    />
                  ))}
                </div>
              );
            }
            return (
              <div key={`${char}-${charIndex}`} className="relative">
                <div className="grid grid-rows-7 gap-1">
                  {digitPatterns[char as keyof typeof digitPatterns]?.map(
                    (row: number[], rowIndex: number) => (
                      <div key={rowIndex} className="flex gap-1">
                        {row.map((dot: number, dotIndex: number) => (
                          <Dot
                            key={dotIndex}
                            active={dot === 1}
                            index={dotIndex}
                          />
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MotionConfig>
  );
}

interface DotProps {
  active: boolean;
  index: number;
}

function Dot({ active, index }: DotProps) {
  return (
    <m.div
      initial={false}
      animate={{
        backgroundColor: active ? "rgb(251,233,43)" : "rgb(32,32,32)",
      }}
      key={`dot-${active ? "on" : "off"}-${index}`}
      className="size-3 rounded-full"
    />
  );
}
