import { Command, Search } from "lucide-react";
import {
  AnimatePresence,
  motion as m,
  MotionConfig,
  Transition,
  Variants,
} from "motion/react";
import { useState } from "react";

import { Input } from "../ui/input";

type Custom = "cmd" | "esc";

const button: Variants = {
  hidden: (type: Custom) => ({
    x: type === "cmd" ? -20 : 20,
  }),
  animate: {
    x: 0,
  },
};

const kVariants: Variants = {
  hidden: {
    x: 40,
  },
  animate: {
    x: 0,
  },
};

const TRANSITION: Transition = {
  duration: 0.2,
  ease: "easeInOut",
};

// 652413169

const InputShotcut = () => {
  const [value, setValue] = useState("");

  const check = value.trim().length;
  return (
    <MotionConfig transition={TRANSITION}>
      <div className="full center bg-muted">
        <div className="max-w-sm bg-background w-full relative flex items-center gap-2 border rounded-md px-2  overflow-hidden">
          <span className="size-6 center min-w-6">
            <Search className="size-4 text-muted-foreground" />
          </span>
          <Input
            type="text"
            // autoFocus
            className="border-none px-0 text-muted-foreground -ml-1"
            placeholder="Enter some text..."
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="text-muted-foreground flex items-center gap-2">
            <m.button
              layoutId="cmd_esc_button"
              className="border min-w-6 px-1 h-6 center rounded-sm relative overflow-hidden"
            >
              <AnimatePresence mode="popLayout">
                {check === 0 ? (
                  <m.span
                    variants={button}
                    initial="hidden"
                    animate="animate"
                    exit="hidden"
                    key="cmd"
                    custom="cmd"
                    layoutId="cmdk"
                  >
                    <Command className="size-3" />
                  </m.span>
                ) : (
                  <m.span
                    variants={button}
                    initial="hidden"
                    animate="animate"
                    exit="hidden"
                    key="esc"
                    custom="esc"
                    layoutId="esc"
                    className="text-[10px]"
                  >
                    Esc
                  </m.span>
                )}
              </AnimatePresence>
            </m.button>
            <AnimatePresence mode="popLayout">
              {check === 0 && (
                <m.button
                  variants={kVariants}
                  initial="hidden"
                  animate="animate"
                  exit="hidden"
                  className="size-6 center border text-[10px] rounded-sm font-semibold"
                >
                  K
                </m.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

export default InputShotcut;
