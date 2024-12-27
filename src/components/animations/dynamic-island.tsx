import { Car, Coffee, Pause, PlaneTakeoff, Play, Timer, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
  Variants,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import useClickOutside from "@/hooks/click-outside";
import { Button } from "@/components/ui/button";

type Variant = "timer" | "coffee" | "car" | "takeoff";

const variants: Variants = {
  initial: {
    // opacity: 0.9,
    // scale: 0.9,
    // filter: "blur(10px)",
  },
  animate: {
    // opacity: 1,
    // scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    // opacity: 0.9,
    // scale: 0.9,
    // filter: "blur(10px)",
  },
};

const TRANSITION: Transition = {
  duration: 0.5,
  type: "spring",
  bounce: 0.05,
  ease: "easeInOut",
};

const DynamicIsland = () => {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setVariant(null));

  const handleVariantChange = (newVariant: Variant) => {
    if (variant === newVariant) return;

    setTransitioning(true);
    setVariant(null);

    setTimeout(() => {
      setVariant(newVariant);
      setTransitioning(false);
    }, 500); // Match the transition duration
  };

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="size-full bg-white rounded-lg pt-10 flex items-center justify-center">
        <div className="w-[420px] border-[10px] h-full border-b-0 rounded-[55px] p-4 rounded-b-none border-black flex flex-col">
          <AnimatePresence mode="wait">
            {variant === null && <Island />}
            {variant && <DynamicIslandContent variant={variant} />}
          </AnimatePresence>
          <div className="flex justify-between gap-4 mt-auto">
            {items.map((item) => (
              <div
                key={item.title}
                className="flex items-center flex-col gap-2 cursor-pointer"
                onClick={() =>
                  !transitioning && handleVariantChange(item.title as Variant)
                }
              >
                <div className="size-16 bg-black text-white flex items-center justify-center rounded-2xl">
                  <item.icon className="size-6" />
                </div>
                <p className="text-sm capitalize">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

const Island = () => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        borderRadius: 20,
      }}
      className="w-32 bg-black h-10 mx-auto"
      layoutId="dynamic-island-circle"
    />
  );
};

const DynamicIslandContent = ({ variant }: { variant: Variant }) => {
  return (
    <>
      {variant === "timer" && <TimerContent />}
      {variant === "coffee" && <CoffeeContent />}
      {variant === "car" && <CarContent />}
      {variant === "takeoff" && <TakeoffContent />}
    </>
  );
};

const TimerContent = () => {
  const [timer, setTimer] = useState(42);
  const [direction, setDirection] = useState<1 | -1>(-1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          return 42;
        }
        setDirection(-1);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paused]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const formattedTime = formatTime(timer);
  return (
    <motion.div
      variants={variants}
      initial="initial"
      key="timer"
      animate="animate"
      exit="exit"
      layoutId="dynamic-island-circle"
      style={{
        borderRadius: 40,
      }}
      className="h-20 w-full bg-black p-4 pr-6 text-white"
    >
      <div className="size-full flex items-center justify-between">
        <div className="size-full flex items-center gap-2">
          <Button
            size="icon"
            className="h-full w-12 rounded-full bg-[#5B3C07] hover:bg-[#5B3C18]"
            onClick={() => setPaused((prev) => !prev)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {paused ? (
                <motion.div
                  className=""
                  key="check"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Play className="!fill-[#FDB000] stroke-none !size-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Pause className="!fill-[#FDB000] stroke-none !size-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
          <Button
            size="icon"
            className="h-full w-12 rounded-full bg-neutral-600 hover:bg-neutral-600/90"
          >
            <X className=" !fill-white !size-6 " />
          </Button>
        </div>
        <div className="gap-2 flex text-[#FDB000]">
          <p className="flex h-full self-end">Timer</p>
          <div>
            <h1 className="text-4xl font-medium flex">
              {formattedTime
                .split("")
                .map((char, index) =>
                  char === ":" ? (
                    <span key={index}>:</span>
                  ) : (
                    <NumberAnimation
                      key={`${char}-${index}`}
                      value={parseInt(char)}
                      direction={direction}
                    />
                  )
                )}
            </h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CoffeeContent = () => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      key="coffee"
      layoutId="dynamic-island-circle"
      className="h-40 w-full bg-black p-4"
      style={{
        borderRadius: 40,
      }}
    >
      CoffeeContent
    </motion.div>
  );
};

const CarContent = () => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      key="car"
      layoutId="dynamic-island-circle"
      className="h-40 w-full bg-black p-4"
      style={{
        borderRadius: 40,
      }}
    >
      CarContent
    </motion.div>
  );
};

const TakeoffContent = () => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      key="takeoff"
      layoutId="dynamic-island-circle"
      className="h-40 w-full bg-black p-4"
      style={{
        borderRadius: 40,
      }}
    >
      TakeoffContent
    </motion.div>
  );
};

const items = [
  { id: 1, title: "timer", icon: Timer },
  { id: 2, title: "coffee", icon: Coffee },
  { id: 3, title: "car", icon: Car },
  { id: 4, title: "takeoff", icon: PlaneTakeoff },
];

export default DynamicIsland;

const numberVariants: Variants = {
  hidden: () => ({
    y: 5,
    // opacity: 0,
    // filter: "blur(4px)",
    // scale: 0.5,
  }),
  visible: {
    y: 0,
    // opacity: 1,
    // filter: "blur(0px)",
    // scale: 1,
  },
  exit: () => ({
    y: 5,
    // opacity: 0,
    // filter: "blur(4px)",
    // scale: 0.5,
  }),
};

interface NumberAnimationProps {
  value: number;
  direction: -1 | 1;
}

const NumberAnimation: React.FC<NumberAnimationProps> = ({
  value,
  direction,
}) => {
  return (
    <span className="flex">
      <AnimatePresence mode="popLayout" custom={direction}>
        {value
          .toString()
          .split("")
          .map((digit, index) => (
            <motion.span
              key={`${digit}-${index}`}
              variants={numberVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={direction}
              transition={{
                duration: 0.3,
                // type: "spring",
                // bounce: 0.05,
                // ease: "easeInOut",
              }}
              className="inline-flex"
            >
              {digit}
            </motion.span>
          ))}
      </AnimatePresence>
    </span>
  );
};
