import {
  AnimatePresence,
  motion as m,
  MotionConfig,
  Variants,
} from "motion/react";
import { useTheme } from "@/providers/theme";
import { useState } from "react";

const modeVariants: Variants = {
  initial: {
    y: -20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.3,
    },
  },
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const containerVariants: Variants = {
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
};

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setTheme(theme === "light" ? "dark" : "light");
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <MotionConfig
      transition={{
        easings: [0.1, 0.9, 0.2, 1],
        duration: 0.5,
      }}
    >
      <div className="full center">
        <m.button
          variants={containerVariants}
          whileHover="hover"
          whileTap="tap"
          animate={{
            width: "auto",
          }}
          className="rounded-full bg-muted flex items-center justify-center  py-2 px-4 overflow-hidden outline-none relative"
          onClick={handleToggle}
        >
          <m.div className="size-10 rounded-full center relative" layout>
            <m.svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              className="size-9 will-change-transform"
              animate={{
                rotate: theme === "light" ? 0 : 180,
                scale: isAnimating ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <rect width="100" height="100"></rect>
              <m.path
                d="M50 18C58.4869 18 66.6262 21.3714 72.6274 27.3726C78.6286 33.3737 82 41.513 82 50C82 58.4869 78.6286 66.6262 72.6275 72.6274C66.6263 78.6286 58.487 82 50.0001 82L50 50L50 18Z"
                className="will-change-transform fill-primary"
                animate={{
                  fillOpacity: isAnimating ? [1, 0.7, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  times: [0, 0.5, 1],
                }}
              ></m.path>
              <m.circle
                cx="50"
                cy="50"
                r="30"
                className="will-change-transform stroke-primary"
                strokeWidth="4"
                animate={{
                  strokeWidth: isAnimating ? [4, 5, 4] : 4,
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.5, 1],
                }}
              ></m.circle>
              <m.circle
                cx="50"
                cy="50"
                r="12"
                className="will-change-transform fill-primary"
                animate={{
                  scale: isAnimating ? [1, 0.9, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.5, 1],
                }}
              ></m.circle>
              <m.path
                d="M50 62C53.1826 62 56.2348 60.7357 58.4853 58.4853C60.7357 56.2348 62 53.1826 62 50C62 46.8174 60.7357 43.7652 58.4853 41.5147C56.2348 39.2643 53.1826 38 50 38L50 50L50 62Z"
                className="will-change-transform fill-primary-foreground"
                animate={{
                  fillOpacity: isAnimating ? [1, 0.7, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.5, 1],
                }}
              ></m.path>
            </m.svg>
          </m.div>

          <div className="flex  items-center gap-1 font-medium">
            <AnimatePresence mode="wait">
              {theme === "light" ? (
                <m.span
                  variants={modeVariants}
                  initial="initial"
                  animate="visible"
                  exit="hidden"
                  key="light"
                  className="font-medium text-primary"
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
                  className="font-medium text-primary"
                >
                  Dark
                </m.span>
              )}
            </AnimatePresence>
            <m.span
              animate={{
                opacity: isAnimating ? [1, 0.7, 1] : 1,
              }}
              transition={{
                duration: 0.3,
                times: [0, 0.5, 1],
              }}
            >
              Mode
            </m.span>
          </div>
        </m.button>
      </div>
    </MotionConfig>
  );
};

export default ModeToggle;
