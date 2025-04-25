import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import {
  AnimatePresence,
  motion as m,
  Transition,
  useAnimate,
} from "motion/react";
import { useEffect, useState } from "react";
import { Icons } from "../shared/icons";

type Status = "Loading" | "Success" | "Error";

const sequences: Status[] = ["Loading", "Success", "Loading", "Error"];
const SEQUENCEDURATION = 2000;

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

const DynamicStatusButton = () => {
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
        animate={{
          width: status === "Loading" ? 220 : status === "Success" ? 180 : 210,
        }}
        transition={buttonTransition}
      >
        <AnimatePresence mode="sync">
          <div className="center">
            {status === "Loading" && <Loader className="size-6 animate-spin" />}
            {status === "Success" && (
              <Icons.check className="size-6 fill-green-500" />
            )}
            {status === "Error" && (
              <m.span ref={scope}>
                <Icons.alert className="size-6" />
              </m.span>
            )}
          </div>
          {status === "Loading" && (
            <m.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="whitespace-pre"
              transition={spanTransition}
            >
              Analyzing Transaction
            </m.span>
          )}
          {status === "Success" && (
            <m.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="whitespace-pre"
              transition={spanTransition}
            >
              Transaction Safe
            </m.span>
          )}
          {status === "Error" && (
            <m.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="whitespace-pre"
              transition={spanTransition}
            >
              Transaction Warning
            </m.span>
          )}
        </AnimatePresence>
      </m.button>
    </div>
  );
};

export default DynamicStatusButton;
