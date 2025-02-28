import { useState } from "react";
import {
  AnimatePresence,
  motion as m,
  MotionConfig,
  Transition,
  Variants,
} from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = {
  id: number;
  name: string;
  className: string;
};

const list: Item[] = [
  { name: "marketting", className: "text-yellow-500 bg-yellow-100" },
  { name: "product", className: "text-blue-500 bg-blue-100" },
  { name: "Development", className: "text-green-500 bg-green-100" },
  { name: "design", className: "text-purple-500 bg-purple-100" },
  { name: "sales", className: "text-red-500 bg-red-100" },
  { name: "stakeholder", className: "text-indigo-500 bg-indigo-100" },
].map((i, idx) => ({
  ...i,
  id: idx + 1,
}));

const TRANSITION: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const clearVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", x: 10 },
  visible: { opacity: 1, filter: "blur(0px)", x: 0 },
};

const ClickSelect = () => {
  const [selected, setSelected] = useState<Item[]>([]);
  const [items, setItems] = useState<Item[]>(list);
  const [hovered, setHovered] = useState(false);

  const handleAdd = (item: Item) => {
    const i = items.find((i) => i.id === item.id);
    if (!i) return;

    const newItems = items.filter((it) => it.id !== item.id);
    setSelected([...selected, i]);
    setItems(newItems);
  };

  const handleRemove = (item: Item) => {
    const i = selected.find((i) => i.id === item.id);
    if (!i) return;

    const newSelected = selected.filter((it) => it.id !== item.id);
    setSelected(newSelected);
    setItems([...items, i]);
  };

  const handleClear = () => {
    setSelected([]);
    setItems(list);
    setHovered(false);
  };

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="size-full bg-background rounded-xl flex items-center justify-center flex-col gap-4">
        <m.ul
          layoutId="selected-items-list"
          onMouseEnter={() => {
            selected.length > 2 && setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
          className="h-10 flex items-center gap-2 overflow-hidden"
        >
          <AnimatePresence mode="popLayout">
            {hovered && selected.length > 0 && (
              <m.li
                key="clear"
                variants={clearVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layoutId="hovered"
                onClick={handleClear}
                className="whitespace-pre z-0 text-sm mr-2 cursor-pointer"
              >
                Clear all
              </m.li>
            )}
            {selected.length > 0 &&
              selected.map((select, idx) => (
                <m.li
                  key={select.name + idx}
                  onClick={() => handleRemove(select)}
                  layoutId={select.name}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-full w-fit py-1 px-2 capitalize relative",
                    select.className
                  )}
                >
                  <span>{select.name}</span>
                  <button className="size-6 bg-white rounded-full flex items-center justify-center">
                    <X className="size-4" />
                  </button>
                </m.li>
              ))}
          </AnimatePresence>
        </m.ul>
        <m.div
          animate={{ height: "auto" }}
          layoutId="container-items"
          className="w-96 h-auto gap-4 flex flex-col border p-4 shadow-lg bg-background rounded-xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <m.h1 layoutId="filter-text" className="">
              Select filter
            </m.h1>
            <m.button layoutId="clear" onClick={handleClear}>
              Clear
            </m.button>
          </div>
          <ul className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {items.length > 0 ? (
                items.map((item, idx) => (
                  <m.li
                    key={item.name + idx}
                    layoutId={item.name}
                    onClick={() => handleAdd(item)}
                    className={cn(
                      "flex cursor-pointer items-center gap-4 rounded-full w-fit p-1 px-2 capitalize z-0 relative",
                      item.className
                    )}
                  >
                    <span>{item.name}</span>
                  </m.li>
                ))
              ) : (
                <m.li layoutId="no-items" className="text-muted-foreground">
                  No items
                </m.li>
              )}
            </AnimatePresence>
          </ul>
        </m.div>
      </div>
    </MotionConfig>
  );
};

export default ClickSelect;
