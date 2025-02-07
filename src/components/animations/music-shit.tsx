import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  useMemo,
} from "react";

const MusicSheet = () => {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(-1);

  const items = useMemo(
    () =>
      [
        { content: "Nothing 1", angle: 10 },
        { content: "Nothing 2", angle: 15 },
        { content: "Nothing 3", angle: -10 },
        { content: "Nothing 4", angle: -5 },
      ].map((item, idx) => ({
        ...item,
        id: idx + 1,
      })),
    []
  );

  const handleMouseEnter = useCallback(() => setActive(true), []);
  const handleMouseLeave = useCallback(() => setActive(false), []);

  return (
    <div
      className="relative size-full flex items-center justify-center rounded-xl bg-background"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {active ? (
        <ReleasedPlayer
          items={items}
          hovered={hovered}
          setHovered={setHovered}
        />
      ) : (
        <Stacked items={items} hovered={hovered} setHovered={setHovered} />
      )}
    </div>
  );
};

type DisplayProps = {
  hovered: number;
  setHovered: Dispatch<SetStateAction<number>>;
  items: { id: number; content: string; angle: number }[];
};

const Stacked = ({ items, hovered, setHovered }: DisplayProps) => (
  <div className="size-40 flex items-center justify-center">
    {items.map((item) => (
      <Item
        key={item.id}
        item={item}
        hovered={hovered}
        setHovered={setHovered}
        className="absolute"
      />
    ))}
  </div>
);

const ReleasedPlayer = ({ items, hovered, setHovered }: DisplayProps) => (
  <div className="size-full flex items-center justify-center relative">
    {items.map((item) => (
      <Item
        key={item.id}
        item={item}
        hovered={hovered}
        setHovered={setHovered}
      />
    ))}
  </div>
);

type ItemProps = {
  item: { id: number; content: string; angle: number };
  className?: string;
  hovered: number;
  setHovered: Dispatch<SetStateAction<number>>;
};

const Item = ({ item, hovered, setHovered, className }: ItemProps) => {
  const handleHover = useCallback(
    (id: number) => {
      setHovered((prev) => (prev !== id ? id : prev));
    },
    [setHovered]
  );

  return (
    <motion.div
      className={cn(
        "size-56 border rounded-xl flex items-center justify-center text-4xl font-semibold bg-muted",
        "relative",
        className
      )}
      onMouseEnter={() => handleHover(item.id)}
      onMouseLeave={() => handleHover(-1)}
      layoutId={`sheet-player-${item.id}`}
      animate={{
        rotate: hovered === item.id ? 0 : item.angle,
        zIndex: hovered === item.id ? 100 : 0,
        boxShadow:
          hovered === item.id ? "0 0 10px 0 rgba(0, 0, 0, 0.5)" : "none",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {item.id}

      {hovered === item.id && (
        <motion.div
          layoutId={`player-id-${item.id}`}
          className="bg-blue-500 w-56 h-48 absolute -top-[100%] flex items-center justify-center text-2xl rounded-xl"
        >
          {item.content}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MusicSheet;
