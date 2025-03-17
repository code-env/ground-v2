import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Square } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  Transition,
  Variants,
  motion as m,
} from "motion/react";
import { useEffect, useState } from "react";

const particleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
};

const TRANSITION: Transition = {
  duration: 0.1,
  ease: "easeInOut",
};

const FigmaLayout = () => {
  const [active, setActive] = useState(false);
  const [gap, setGap] = useState(false);

  const toggleActive = () => {
    setActive((prev) => !prev);
    setGap(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setGap(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="flex items-center gap-6 max-w-xs w-full">
        <div
          className={cn(
            "flex items-center relative gap-4 transition-all duration-100 flex-1",
            {
              "gap-0": gap,
            },
          )}
        >
          <button
            className={cn(
              "!transition-all !duration-100 flex-1",
              buttonVariants(),
              {
                "rounded-r-none": gap,
              },
            )}
          >
            Something
          </button>
          <button
            className={cn(
              "!transition-all !duration-100 flex-1",
              buttonVariants(),
              {
                "rounded-l-none": gap,
              },
            )}
          >
            Something
          </button>
          <AnimatePresence mode="sync" initial={false}>
            {active && (
              <m.div
                variants={particleVariants}
                initial="hidden"
                animate="animate"
                exit="hidden"
                transition={
                  {
                    // delay: gap ? 0.1 : 0,
                  }
                }
                className="size-4 bg-primary absolute inset-0 m-auto"
              >
                <div className="size-4 bg-muted absolute -top-2.5 rounded-b-full" />
                <div className="size-4 bg-muted absolute -bottom-2.5 rounded-t-full" />
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <button
          className={buttonVariants({ variant: "default", size: "icon" })}
          onClick={toggleActive}
        >
          <Square className="size-4" />
        </button>
      </div>
    </MotionConfig>
  );
};

export default FigmaLayout;
