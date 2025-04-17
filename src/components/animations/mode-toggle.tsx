import {
  AnimatePresence,
  motion as m,
  MotionConfig,
  Variants,
} from "motion/react";
import { useState } from "react";
const modeVariants: Variants = {
  initial: {
    y: -40,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
  hidden: {
    y: 40,
    opacity: 0,
  },
};

const ModeToggle = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  return (
    <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
      <div className="full center">
        <m.button
          animate={{ width: "auto" }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full bg-muted flex items-center justify-center gap-1 py-2 px-4 overflow-hidden "
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          <div className="size-5 rounded bg-muted-foreground"></div>
          <AnimatePresence mode="wait">
            {mode === "light" ? (
              <m.span
                variants={modeVariants}
                initial="initial"
                animate="visible"
                exit="hidden"
                key="light"
              >
                Light
              </m.span>
            ) : (
              <m.span
                variants={modeVariants}
                initial="initial"
                animate="visible"
                exit="hidden"
                key="dark"
              >
                Dark
              </m.span>
            )}
          </AnimatePresence>
          <span>Mode</span>
        </m.button>
      </div>
    </MotionConfig>
  );
};

export default ModeToggle;
