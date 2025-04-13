import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import {
  AnimatePresence,
  motion as m,
  Transition,
  useAnimate,
  Variants,
} from "motion/react";
import { useEffect, useState } from "react";
import { Icons } from "../shared/icons";

type Status = "Loading" | "Success" | "Error";

const sequences: Status[] = ["Loading", "Success", "Loading", "Error"];
const SEQUENCEDURATION = 2000;

const leftSpanVariant: Variants = {
  hidden: { scale: 0.9, opacity: 0, x: -10 },
  visible: { scale: 1, opacity: 1, x: 0 },
};

const rightSpanVariant: Variants = {
  hidden: { scale: 0.9, opacity: 0, x: 10 },
  visible: { scale: 1, opacity: 1, x: 0 },
};

const buttonTransition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.6,
};

const spanTransition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.3,
};

const widthVariants = {
  loading: { width: 220 },
  success: { width: 180 },
  error: { width: 210 },
};

const StatusButton = () => {
  const [status, setStatus] = useState<Status>("Loading");

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (status === "Error") {
      setTimeout(() => {
        animate(
          scope.current,
          { rotate: [0, 20, -20, 0, 20, -20, 0] },
          { duration: 0.2 }
        );
      }, 750);
    }
  }, [status]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setStatus(sequences[currentIndex]);
      currentIndex = (currentIndex + 1) % sequences.length;
    }, SEQUENCEDURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="full center">
      <m.button
        className={cn(
          status === "Loading" &&
            "bg-blue-100 shadow-none hover:bg-blue-100 text-blue-500",
          status === "Success" &&
            "bg-green-100 shadow-none hover:bg-green-100 text-green-500",
          status === "Error" &&
            "bg-red-100 shadow-none text-destructive hover:bg-red-100",
          "rounded-full overflow-hidden flex items-center gap-2 px-4 py-2"
        )}
        layout
        layoutId="status-button"
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.5,
        }}
      >
        <m.span
          className="whitespace-pre flex items-center gap-1"
          transition={spanTransition}
        >
          <AnimatePresence initial={false} mode="wait">
            {status === "Loading" && (
              <m.span
                variants={leftSpanVariant}
                initial="hidden"
                animate="visible"
              >
                Analyzing
              </m.span>
            )}
            {status === "Success" && (
              <m.span
                variants={rightSpanVariant}
                initial="hidden"
                animate="visible"
              >
                Safe
              </m.span>
            )}
            {status === "Error" && (
              <m.span
                variants={rightSpanVariant}
                initial="hidden"
                animate="visible"
              >
                Warning
              </m.span>
            )}
          </AnimatePresence>
        </m.span>
      </m.button>
    </div>
  );
};

export default StatusButton;
