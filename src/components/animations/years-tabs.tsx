import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { buttonVariants } from "../ui/button";

const YEARS = [
  {
    year: "2022",
    items: [
      "random-file-abc123.md",
      "another-file-def456.md",
      "sample-file-ghi789.md",
      "example-file-jkl012.md",
    ],
  },
  {
    year: "2023",
    mid: true,
    items: [
      "unique-file-mno345.md",
      "test-file-pqr678.md",
      "demo-file-stu901.md",
      "file-example-vwx234.md",
    ],
  },
  {
    year: "2024",
    mid: true,
    items: [
      "file-random-yza567.md",
      "file-sample-bcd890.md",
      "file-test-efg123.md",
      "file-example-hij456.md",
    ],
  },
  {
    year: "2025",
    items: [
      "file-unique-klm789.md",
      "file-demo-nop012.md",
      "file-another-qrs345.md",
      "file-sample-tuv678.md",
    ],
  },
];

type Direction = "left" | "right" | null;

const YearTabs = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<Direction>(null);
  const [rounded, setRounded] = useState(true);

  const handleChangeActive = (value: number) => {
    if (value === active) return;
    setDirection(value > active ? "right" : "left");
    setActive(value);
  };

  const toggleCorners = () => {
    setRounded((prev) => !prev);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: (direction: Direction) => ({
      opacity: 0,
      filter: "blur(10px)",
      y: direction === "right" ? -10 : 10,
    }),
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    },
  };

  return (
    <div className="flex flex-col h-full w-3/4 bg-background p-10 relative gap-4 rounded-xl border">
      <button
        onClick={toggleCorners}
        className={buttonVariants({ variant: "outline", className: "w-fit" })}
      >
        {rounded ? "Disable filters" : "Enable filters"}
      </button>
      <div>
        <ul className="flex h-fit gap-2 w-full">
          {YEARS.reverse().map((year, idx) => {
            const leftActive = YEARS[idx].mid || active !== 0;
            const rightActive = YEARS[idx].mid || active === 0;
            return (
              <li
                key={idx}
                className={cn(
                  "px-6 py-3 border-neutral-500/20 text-sm font-semmessage: can we get code as free ?ibold cursor-pointer z-0 relative transition-all duration-300 flex-1 text-center",
                  {
                    "rounded-xl": rounded,
                    "rounded-none": !rounded,
                  },
                )}
                onClick={() => handleChangeActive(idx)}
              >
                {year.year}
                {idx === active && (
                  <motion.div
                    layoutId="active-year-tab-indicator"
                    className={cn(
                      "absolute size-full top-0 left-0 -z-10 bg-muted",
                      {
                        "rounded-t-3xl": rounded,
                        "rounded-none": !rounded,
                      },
                    )}
                  >
                    {rounded && (
                      <>
                        <div
                          className={cn(
                            leftActive &&
                              "size-4 bg-muted absolute bottom-0 -left-4 before:size-full before:bg-background before:-top-0 before:-left-0 before:absolute before:rounded-br-full",
                          )}
                        />
                        <div
                          className={cn(
                            rightActive &&
                              "size-4 bg-muted absolute bottom-0 -right-4 before:size-full before:bg-background before:-top-0 before:-right-0 before:absolute before:rounded-bl-full transition-all duration-300",
                          )}
                        />
                      </>
                    )}
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>
        <div
          className={cn(
            "bg-muted flex flex-col divide-y-2 p-20 transition-all duration-300 rounded-b-3xl",
            {
              "rounded-tl-3xl": active !== 0 && rounded,
              "rounded-tr-3xl": active !== YEARS.length - 1 && rounded,
              "rounded-none": !rounded,
            },
          )}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {YEARS[active].items.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  custom={direction}
                  className={cn("py-2 border-b last:border-b-0")}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default YearTabs;
