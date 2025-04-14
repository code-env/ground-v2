import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useEffect, useState } from "react";

const items = [
  {
    id: 1,
    title: "Buy groceries",
  },
  {
    id: 2,
    title: "Contemplate existence",
  },
  {
    id: 3,
    title: "Learn SwiftUI",
  },
];

const TodoList = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  return (
    <div className="full center">
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            isChecked={checkedItems.includes(item.id)}
            onToggle={() => {
              setCheckedItems((prev) =>
                prev.includes(item.id)
                  ? prev.filter((id) => id !== item.id)
                  : [...prev, item.id]
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};

const pathVariants = {
  checked: {
    pathLength: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  unchecked: {
    pathLength: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const checkboxVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const Item = ({
  item,
  isChecked,
  onToggle,
}: {
  item: { id: number; title: string };
  isChecked: boolean;
  onToggle: () => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isChecked) {
      animate(scope.current, { x: [0, 10, 0] }, { duration: 0.2 });
    } else {
      animate(scope.current, { x: [0, -10, 0] }, { duration: 0.2 });
    }
  }, [isChecked]);

  const handleToggle = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      if (!isChecked) {
        setTimeout(() => {
          onToggle();
          setIsAnimating(false);
        }, 300);
      } else {
        onToggle();
        setIsAnimating(false);
      }
    }
  };

  return (
    <div
      className="flex items-center gap-2 text-muted-foreground w-fit p-2 rounded-md cursor-pointer hover:bg-muted"
      onClick={handleToggle}
    >
      <div className="relative w-6 h-6">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          className="absolute top-0 left-0 rotate-90"
        >
          <motion.rect
            width="18"
            height="18"
            x="3"
            y="3"
            rx="5"
            variants={pathVariants}
            initial="unchecked"
            animate={isChecked ? "checked" : "unchecked"}
          />
        </motion.svg>

        <AnimatePresence mode="wait" initial={false}>
          {isChecked && (
            <motion.div
              variants={checkboxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key="checked"
              className="absolute top-0 left-0 bg-blue-500 w-6 h-6 rounded-md flex items-center justify-center text-white"
            >
              <CheckIcon className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p ref={scope} className="relative overflow-hidden">
        <span
          className={cn(
            "transition-all duration-300 opacity-100",
            isChecked && "opacity-50"
          )}
        >
          {item.title}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          {isChecked && (
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0 }}
              transition={{ delay: 0.1, duration: 0.3, ease: "easeInOut" }}
              className="absolute h-px w-full bg-muted-foreground left-0 top-0 bottom-0 my-auto"
            />
          )}
        </AnimatePresence>
      </p>
    </div>
  );
};

export default TodoList;
