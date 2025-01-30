import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

const YEARS = [
  {
    year: "2022",
  },
  {
    year: "2023",
    mid: true,
  },
  {
    year: "2024",
    mid: true,
  },
  {
    year: "2025",
  },
];

const TabBars = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col rounded-xl h-full w-3/4 bg-background p-10 ">
      <ul className="flex h-fit gap-2 w-full">
        {YEARS.map((year, idx) => {
          const leftActive = YEARS[idx].mid || active !== 0;
          const rightActive = YEARS[idx].mid || active === 0;
          return (
            <li
              key={idx}
              className={cn(
                "px-6 py-3  border-neutral-500/20 text-sm font-semibold cursor-pointer z-0 rounded-xl relative transition-all duration-300 flex-1 text-center "
              )}
              onClick={() => setActive(idx)}
            >
              {year.year}
              {idx === active && (
                <motion.div
                  layoutId="active-year-tab-indicator"
                  className={cn(
                    "absolute size-full top-0 left-0 -z-10  bg-muted rounded-t-3xl "
                  )}
                >
                  <div
                    className={cn(
                      leftActive &&
                        "size-4 bg-muted absolute bottom-0 -left-4 before:size-full before:bg-background before:-top-0 before:-left-0 before:absolute before:rounded-br-full "
                    )}
                  />
                  <div
                    className={cn(
                      rightActive &&
                        "size-4 bg-muted absolute bottom-0 -right-4 before:size-full before:bg-background before:-top-0 before:-right-0 before:absolute before:rounded-bl-full transition-all duration-300"
                    )}
                  />
                </motion.div>
              )}
            </li>
          );
        })}
      </ul>
      <div
        className={cn(
          "flex-1 bg-muted rounded-b-3xl flex flex-col divide-y-2 p-24 transition-all duration-300",
          {
            "rounded-tl-3xl": active !== 0,
            "rounded-tr-3xl": active !== YEARS.length - 1,
          }
        )}
      >
        {Array.from({ length: 4 }).map((_, idx) => (
          <p className="py-2.5" key={idx}>
            Nothing {idx + 1} is Coming to localhost
          </p>
        ))}
      </div>
    </div>
  );
};

export default TabBars;
