import useClickOutside from "@/hooks/click-outside";
import { cn } from "@/lib/utils";
import {
  Ban,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Command,
  NotebookText,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useAnimate, Variants } from "motion/react";
import { useRef, useState } from "react";

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.5 };

const ExpandableTabs = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const outsideClickRef = useRef(null);

  useClickOutside(outsideClickRef, () => setSelected(null));

  const tabs = [
    {
      title: "Blacklist",
      icon: Ban,
      className: "text-white bg-gray-500",
    },
    {
      title: "Reject",
      icon: X,
      className: "text-red-500 bg-red-600/30",
    },
    {
      title: "Hire",
      icon: NotebookText,
      className: "text-green-500 bg-green-600/30",
    },
  ];

  const buttonVariants = {
    initial: {
      gap: 0,
      paddingLeft: ".5rem",
      paddingRight: ".5rem",
    },
    animate: (isSelected: boolean) => ({
      gap: isSelected ? ".5rem" : 0,
      paddingLeft: isSelected ? "1rem" : ".5rem",
      paddingRight: isSelected ? "1rem" : ".5rem",
    }),
  };

  const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
  };

  return (
    <div ref={outsideClickRef} className="flex gap-1">
      {tabs.map((tab, index) => {
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onMouseEnter={() => setSelected(index)}
            onMouseLeave={() => setSelected(null)}
            transition={transition}
            className={cn("h-8 center rounded-md", tab.className)}
          >
            {<tab.icon className="size-4" />}
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden whitespace-pre text-sm"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
};

const animation: Variants = {
  hidden: (direction: -1 | 1) => ({
    y: direction === 1 ? 15 : -15,
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.5,
  }),
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  exit: (direction: -1 | 1) => ({
    y: direction === 1 ? -15 : 15,
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.5,
  }),
};

interface CounterProps {
  min?: number;
  max?: number;
  initial?: number;
  onChange?: (value: number) => void;
  step?: number;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({
  min = 1,
  max = 10,
  initial = 1,
  onChange,
  step = 1,
}) => {
  const [num, setNum] = useState(initial);
  const [direction, setDirection] = useState(1);

  const [scope, animate] = useAnimate();

  const handleShake = () => {
    animate(scope.current, { x: [0, 5, -5, 0] }, { duration: 0.2 });
  };

  const counter = (action: "decrease" | "increase") => {
    if (action === "decrease") {
      if (num <= min) return handleShake();
      setNum((prev) => {
        const newValue = prev - step;
        onChange?.(newValue);
        return newValue;
      });
      setDirection(-1);
    } else if (action === "increase") {
      if (num >= max) return handleShake();
      setNum((prev) => {
        const newValue = prev + step;
        onChange?.(newValue);
        return newValue;
      });
      setDirection(1);
    }
  };

  return (
    <div ref={scope} className="flex text-primary-foreground overflow-clip">
      <button
        onClick={() => counter("decrease")}
        className={cn(
          "size-8 center outline-none rounded-md",
          num <= min && "opacity-50"
        )}
      >
        <ChevronLeft className="size-4" />
      </button>
      <h3 className="text-center flex items-center gap-1 text-sm">
        <span>
          <AnimatePresence mode="popLayout" custom={direction}>
            {num
              .toString()
              .split("")
              .map((value, index) => (
                <motion.span
                  key={`${value} ${index}`}
                  variants={animation}
                  initial="hidden"
                  transition={transition}
                  animate="visible"
                  exit="exit"
                  custom={direction}
                  className="inline-block"
                >
                  {value}
                </motion.span>
              ))}
          </AnimatePresence>
        </span>
        <span> / </span>
        <span>{max}</span>
      </h3>
      <button
        onClick={() => counter("increase")}
        className={cn(
          "size-8 center outline-none rounded-md",
          num >= max && "opacity-50"
        )}
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

const Separator = () => (
  <div className="mx-1 h-[24px] w-[1.2px] bg-[#555555]" aria-hidden="true" />
);

const ManagementBottomBar = () => {
  return (
    <div className="center full">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border p-1.5 bg-primary shadow-[inset_0_0_0_2px_rgba(256,256,256,0.2)]">
        <Counter />
        <Separator />
        <ExpandableTabs />
        <Separator />
        <div className="bg-teal-600 relative flex items-center gap-2 rounded-md p-1 py-[5px] select-none shadow-[inset_0_-2px_0_0_theme(colors.teal.700)] before:absolute before:size-full before:left-0 before:shadow-[inset_0_2px_0px_0px_theme(colors.teal.700)] before:rounded-sm">
          <span className="border-r pr-1 h-full center text-white border-teal-500 ">
            <ChevronDown className="size-4" />
          </span>
          <p className="flex items-center gap-2 font-medium text-white">
            <span className="text-gray-200/90">Move to: </span>
            <span>Interview I</span>
            <span className="relative  flex items-center px-2 py-0.5 text-sm rounded-sm border border-teal-500 bg-teal-300/25 text-gray-200/90">
              <Command className="size-3" /> E
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManagementBottomBar;
