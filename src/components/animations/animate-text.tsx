import { motion } from "motion/react";
import { useEffect, useState } from "react";

const NewHero = () => {
  const words = ["COPY", "PASTE", "ANIMATE"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background size-full rounded-xl flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col max-w-md gap-4">
        <h1 className="text-4xl font-bold flex items-center">
          {words.map((word, idx) => (
            <span
              key={idx}
              className="flex items-center relative px-2 py-1 z-0"
            >
              {word}
              {idx === index && (
                <motion.span
                  layoutId="active-word-indicator"
                  className="absolute  inset-0 -z-10 border border-neutral-500/20"
                >
                  <motion.span
                    layoutId="active-indicator-top-left"
                    className="absolute -top-1 -left-1 size-2 bg-neutral-500/20 rounded-full"
                  />
                  <motion.span
                    layoutId="active-indicator-top-right"
                    className="absolute -top-1 -right-1 size-2 bg-neutral-500/20 rounded-full"
                  />
                  <motion.span
                    layoutId="active-indicator-bottom-left"
                    className="absolute -bottom-1 -left-1 size-2 bg-neutral-500/20 rounded-full"
                  />
                  <motion.span
                    layoutId="active-indicator-bottom-right"
                    className="absolute -bottom-1 -right-1 size-2 bg-neutral-500/20 rounded-full"
                  />
                </motion.span>
              )}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default NewHero;
