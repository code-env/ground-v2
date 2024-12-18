import useClickOutside from "@/hooks/click-outside";
import { ChevronRight, X } from "lucide-react";
import { motion, MotionConfig, Transition } from "motion/react";
import { Dispatch, SetStateAction, useId, useRef, useState } from "react";

const transition: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 20,
};

interface Item {
  title: string;
  icons: number[];
}

const Wants = () => {
  const id = useId();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const items: Item[] = [
    { title: "Daily needs", icons: [1, 2, 3, 4] },
    { title: "Groceries", icons: [1, 2, 3] },
    { title: "Work Essentials", icons: [1, 2, 3, 4] },
  ];

  useClickOutside(containerRef, () => {
    setExpandedIndex(null);
  });

  return (
    <MotionConfig transition={transition}>
      <div className="flex flex-col gap-2" ref={containerRef}>
        {items.map((item, index) => {
          if (expandedIndex === index) {
            return (
              <ClickedView
                key={`clicked-${index}`}
                item={item}
                index={index}
                onCollapse={() => setExpandedIndex(null)}
                id={id}
              />
            );
          }

          return (
            <DefaultItem
              key={`default-${index}`}
              item={item}
              index={index}
              onExpand={setExpandedIndex}
              id={id}
            />
          );
        })}
      </div>
    </MotionConfig>
  );
};

interface DefaultItemsProps {
  item: Item;
  id: string;
  index: number;
  onExpand: Dispatch<SetStateAction<number | null>>;
}

const DefaultItem = ({ item, id, onExpand, index }: DefaultItemsProps) => {
  return (
    <motion.div
      layoutId={`want-container-${index}`}
      className="border bg-white p-3 flex gap-3 cursor-pointer"
      style={{
        width: 350,
        borderRadius: 10,
      }}
      onClick={() => onExpand(index)}
    >
      <div className="grid grid-cols-2 gap-2">
        {item.icons.map((icon, iconIndex) => (
          <motion.div
            key={`default-icon-${index}-${iconIndex}`}
            layoutId={`want-${id}-${index}-${iconIndex}-icon`}
            className="size-5 bg-black rounded-full text-white flex items-center justify-center font-semibold text-xs"
          >
            {icon}
          </motion.div>
        ))}
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <motion.p
            layoutId={`want-${id}-${index}-title`}
            className="text-lg font-semibold"
          >
            {item.title}
          </motion.p>
          <motion.p
            layoutId={`want-${id}-${index}-length`}
            className="text-gray-500 text-xs"
          >
            {item.icons.length} items
          </motion.p>
        </div>
        <motion.span layoutId={`want-${index}-chevron`}>
          <ChevronRight className="size-4" />
        </motion.span>
      </div>
    </motion.div>
  );
};

interface ClickedViewProps {
  item: Item;
  id: string;
  index: number;
  onCollapse: () => void;
}

const ClickedView = ({ id, item, onCollapse, index }: ClickedViewProps) => {
  return (
    <motion.div
      layoutId={`want-container-${index}`}
      className="bg-white p-3 flex flex-col gap-3 overflow-hidden"
      style={{ width: 350, borderRadius: 10 }}
    >
      <div className="flex items-center justify-between">
        <motion.p
          layoutId={`want-${id}-${index}-title`}
          className="text-lg font-semibold"
        >
          {item.title}
        </motion.p>
        <motion.span
          layoutId={`want-${id}-${index}-close-icon`}
          className="size-6 flex items-center justify-center hover:bg-slate-200 rounded-full cursor-pointer transition-all duration-300"
          onClick={onCollapse}
        >
          <X className="size-4" />
        </motion.span>
      </div>
      <div className="flex flex-col gap-2">
        {item.icons.map((icon, iconIndex) => (
          <div
            className="flex items-center gap-2"
            key={`clicked-icon-${index}-${iconIndex}`}
          >
            <motion.div
              layoutId={`want-${id}-${index}-${iconIndex}-icon`}
              className="size-12 bg-black rounded-full text-white flex items-center justify-center font-semibold text-xl"
            >
              {icon}
            </motion.div>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <motion.p layoutId={`want-${id}-${index}-${iconIndex}-title`}>
                  Item {iconIndex + 1}
                </motion.p>
                <motion.p
                  layoutId={`want-${id}-${index}-${iconIndex}-price`}
                  className="text-sm text-gray-500"
                >
                  ${icon + 10}
                </motion.p>
              </div>
              <motion.span
                layoutId={`want-${id}-${index}-${iconIndex}-chevron`}
              >
                <ChevronRight className="size-4" />
              </motion.span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Wants;
