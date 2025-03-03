import { Car, Coffee, Pause, PlaneTakeoff, Play, Timer, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
  Variants,
} from "motion/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import useClickOutside from "@/hooks/click-outside";
import { useTimer } from "@/hooks/use-timer";
import { cn } from "@/lib/utils";

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

    if (variant) {
      setTransitioning(true);
      setVariant(null);

      setTimeout(() => {
        setVariant(newVariant);
        setTransitioning(false);
      }, 500); // Match the transition duration
    } else {
      setVariant(newVariant);
    }
  };

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="size-full bg-background rounded-lg pt-10 flex items-center justify-center">
        <div className="w-[420px] border-[10px] h-full border-b-0 rounded-[55px] p-4 rounded-b-none border-primary dark:border-muted flex flex-col">
          <AnimatePresence mode="wait">
            {variant === null && <Island />}
            {variant && (
              <DynamicIslandContent variant={variant} setVariant={setVariant} />
            )}
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
                <div className="size-16 bg-primary text-white flex items-center justify-center rounded-2xl">
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
      className="w-32 bg-primary dark:bg-muted h-10 mx-auto"
      layoutId="dynamic-island-circle"
    />
  );
};

interface DynamicIslandContentProps {
  variant: Variant;
  setVariant: Dispatch<SetStateAction<Variant | null>>;
}

const DynamicIslandContent = ({
  variant,
  setVariant,
}: DynamicIslandContentProps) => {
  return (
    <>
      {variant === "timer" && <TimerContent setVariant={setVariant} />}
      {variant === "coffee" && <CoffeeContent />}
      {variant === "car" && <CarContent />}
      {variant === "takeoff" && <TakeoffContent />}
    </>
  );
};

interface TimerContentProps {
  setVariant: Dispatch<SetStateAction<Variant | null>>;
}

const TimerContent = ({ setVariant }: TimerContentProps) => {
  const { formattedTime, paused, setPaused, resetTimer } = useTimer(42, true);

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
      className="h-20 w-full bg-primary p-4 pr-6 text-white"
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
            onClick={() => {
              resetTimer();
              setVariant(null);
            }}
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
                    />
                  ),
                )}
            </h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CoffeeContent = () => {
  const ITEMS = 42;
  const [box, setBox] = useState<{ width: number; height: number } | null>(
    null,
  );

  const { time } = useTimer(ITEMS, true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const { height, width } = ref.current.getBoundingClientRect();
    setBox({ height, width });
  }, [ref]);

  useEffect(() => {
    if (!ref.current || !box) return;

    const container = ref.current;
    const itemWidth = box.width / ITEMS;
    const scrollOffset = itemWidth * (time - 1) - box.width / 2 + itemWidth / 2;

    container.scrollTo({
      left: scrollOffset,
      behavior: "smooth",
    });
  }, [time, box, ITEMS]);

  return (
    <motion.div
      variants={variants}
      ref={ref}
      initial="initial"
      animate="animate"
      exit="exit"
      key="coffee"
      layoutId="dynamic-island-circle"
      className="h-40 w-full bg-primary p-4 relative overflow-hidden"
      style={{
        borderRadius: 40,
      }}
    >
      <div
        className="flex items-center gap-2 justify-start"
        style={{
          marginRight: box?.width ? box.width / 2 : 0,
        }}
      >
        {Array.from({ length: ITEMS }).map((_, index) => {
          const newIndex = index + 1;
          const isDivisibleByTen = newIndex % 10 === 0;
          return (
            <motion.div
              layoutId={`coffee-variant-${newIndex}`}
              key={index}
              className="flex flex-col gap-2 items-center"
            >
              <motion.p
                layoutId={`coffee-number-${newIndex}`}
                className={cn("font-semibold !opacity-0 text-white", {
                  "!opacity-100": isDivisibleByTen,
                })}
              >
                {newIndex}
              </motion.p>
              <motion.div
                layoutId={`coffee-item-preview-${newIndex}`}
                className={cn(
                  "h-10 w-3 min-w-3 rounded-full bg-red-500 transition-all duration-300",
                  {
                    "!bg-green-500": time === newIndex,
                  },
                )}
              />
            </motion.div>
          );
        })}
      </div>
      <div className="absolute bg-gradient-to-r from-black to-transparent top-0 left-0 w-20 h-full rounded-l-[40px]" />
      <div className="absolute bg-gradient-to-l from-black to-transparent top-0 right-0 w-20 h-full rounded-r-[40px]" />
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
      className="h-40 w-full bg-primary p-4"
      style={{
        borderRadius: 40,
      }}
    >
      Cart content
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
      className="h-40 w-full bg-primary p-4"
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
    opacity: 0.5,
    filter: "blur(3px)",
    // scale: 0.5,
  }),
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    // scale: 1,
  },
  exit: () => ({
    y: 5,
    opacity: 0.5,
    filter: "blur(3px)",
    // scale: 0.5,
  }),
};

interface NumberAnimationProps {
  value: number;
}

const NumberAnimation: React.FC<NumberAnimationProps> = ({ value }) => {
  return (
    <span className="flex">
      <AnimatePresence mode="popLayout">
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
              // custom={direction}
              transition={{
                duration: 0.2,
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
