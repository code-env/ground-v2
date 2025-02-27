import { useState } from "react";
import {
  AnimatePresence,
  motion as m,
  MotionConfig,
  Transition,
} from "motion/react";
import { X } from "lucide-react";

type Item = {
  id: number;
  name: string;
  color: string;
};

const list: Item[] = [
  { name: "marketting", color: "" },
  { name: "product", color: "" },
  { name: "Development", color: "" },
  { name: "design", color: "" },
  { name: "sales", color: "" },
  { name: "stakeholder", color: "" },
].map((i, idx) => ({
  ...i,
  id: idx + 1,
}));

const TRANSITION: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const ClickSelect = () => {
  const [selected, setSelected] = useState<Item[]>([]);
  const [items, setItems] = useState<Item[]>(list);

  const handleAdd = (item: Item) => {
    const i = items.find((i) => i.id === item.id);

    if (!i) return;

    const newItems = items.filter((it) => it.id !== item.id);
    setSelected([...selected, i]);

    setItems(newItems);
  };

  //   const handleRemove = (item: Item) => {
  //     const i = items.find((i) => i.id === item.id);

  //     if (!i) return;

  //   };

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="size-full bg-background rounded-xl flex items-center justify-center flex-col">
        <ul className="h-20 border flex items-center gap-2 w-96">
          {selected.length > 0 &&
            selected.map((select, idx) => (
              <m.li
                key={select.name + idx}
                layoutId={select.name}
                className="bg-red-500 text-white flex cursor-pointer items-center gap-4 rounded-full  w-fit p-2 pl-4 capitalize"
              >
                <span>{select.name}</span>
                <button className="size-6 bg-blue-400 rounded-full flex items-center justify-center">
                  <X className="size-4" />
                </button>
              </m.li>
            ))}
        </ul>
        <m.div
          animate={{ height: "auto" }}
          layoutId="container-items"
          className="w-96 h-auto gap-4 flex flex-col border p-4 shadow-lg bg-background rounded-xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <m.h1 layoutId="filter-text" className="">
              Select filter
            </m.h1>
            <button>Clear</button>
          </div>
          <ul className="flex flex-col gap-2 ">
            <AnimatePresence mode="popLayout">
              {items.map((item, idx) => (
                <m.li
                  key={item.name + idx}
                  layoutId={item.name}
                  onClick={() => handleAdd(item)}
                  className="bg-red-500 text-white flex cursor-pointer items-center gap-4 rounded-full  w-fit p-2 capitalize z-0 relative"
                >
                  <span>{item.name}</span>
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        </m.div>
      </div>
    </MotionConfig>
  );
};

export default ClickSelect;
