import { Car, Coffee, PlaneTakeoff, Timer } from "lucide-react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
  Variants,
} from "motion/react";
import { useRef, useState } from "react";

import useClickOutside from "@/hooks/click-outside";

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
    // filter: "blur(0px)",
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
          <div className="flex justify-between gap-4 mt-auto" ref={ref}>
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
      className="h-40 w-full bg-black p-4"
    >
      TimerContent
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
