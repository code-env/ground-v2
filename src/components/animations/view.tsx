import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import React from "react";
import { Icons } from "../shared/icons";

type Views = "List" | "Grid" | "Stacked";

type ViewItem = {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  name: string;
  view: Views;
};

type Item = {
  name: string;
  image: string;
  angle?: number;
  rate: number;
  position: number;
};

const views: ViewItem[] = [
  {
    name: "List view",
    icon: Icons.list,
    view: "List",
  },
  {
    name: "Card view",
    icon: Icons.grid,
    view: "Grid",
  },
  {
    name: "Pack view",
    icon: Icons.stacked,
    view: "Stacked",
  },
];

const TRANSITION = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.5,
  duration: 0.5,
};

const items: Item[] = [
  {
    name: "Skilled Fingers Series",
    image: "/first.svg",
    angle: -10,
    rate: 0.855,
    position: 209,
  },
  {
    name: "Vibrant Vibes Series",
    image: "/second.svg",
    angle: 15,
    rate: 0.209,
    position: 803,
  },
];

const View = () => {
  const [view, setView] = React.useState<Views>("List");
  const handleClick = (newView: Views) => {
    setView(newView);
  };
  return (
    <MotionConfig transition={TRANSITION}>
      <div className="center full ">
        <div className="max-w-xs w-full space-y-4 overflow-hidden">
          <div className="h-14 border-b flex gap-2">
            {views.map((item) => (
              <button
                key={item.name}
                className={cn(
                  "flex items-center gap-1 h-8 px-[10px] rounded-full bg-muted text-muted-foreground text-sm font-medium outline-none",
                  item.view === view && "bg-[#00b3ff] text-white"
                )}
                onClick={() => handleClick(item.view)}
              >
                <item.icon className="size-4" />
                {item.name}
              </button>
            ))}
          </div>

          <div className="min-h-80 relative ">
            <AnimatePresence mode="popLayout">
              {view === "List" && <ListView view={view} />}
              {view === "Grid" && <GridView view={view} />}
              {view === "Stacked" && <StackedView view={view} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

const ListView = ({ view }: { view: Views }) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, idx) => (
        <ItemView
          key={idx}
          item={item}
          idx={idx}
          view={view}
          className="flex items-center gap-2 flex-row"
        />
      ))}
    </div>
  );
};

const GridView = ({ view }: { view: Views }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, idx) => (
        <ItemView key={idx} item={item} idx={idx} view={view} />
      ))}
    </div>
  );
};

const StackedView = ({ view }: { view: Views }) => {
  return (
    <div>
      <div className="relative flex w-full items-center justify-center h-32">
        {items.map((item, idx) => (
          <ItemView
            key={idx}
            item={item}
            idx={idx}
            view={view}
            className="absolute"
          />
        ))}
      </div>
      <div className="text-center mt-2">
        <AnimatePresence>
          {view === "Stacked" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 justify-center flex-col text-sm"
            >
              <span>{items.length} Collectibles</span>
              <span>
                {items.reduce((acc, item) => acc + item.rate, 0)}{" "}
                <span className="text-muted-foreground">ETH</span>
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ItemView = ({
  item,
  idx,
  view,
  className,
}: {
  item: Item;
  idx: number;
  view: Views;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn("flex flex-col gap-2", className)}
      layoutId={`view-item-container-${idx}`}
      style={{
        rotate: view === "Stacked" ? item.angle : 0,
        zIndex: view === "Stacked" ? items.length - idx : 0,
      }}
    >
      <motion.img
        layoutId={`view-item-image-${idx}`}
        src={item.image}
        alt={item.name}
        className={cn(
          view === "Grid"
            ? "size-40 rounded-xl"
            : view === "List"
            ? "size-14 rounded-md"
            : "size-20 rounded-xl",
          "object-cover "
        )}
      />
      <AnimatePresence>
        {view !== "Stacked" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "flex items-center gap-2",
              view === "List" && "flex-1"
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-1 text-sm font-medium",
                view === "List" && "flex-1"
              )}
            >
              <motion.h3 layoutId={`view-item-title-${idx}`} className="">
                {item.name}
              </motion.h3>
              <motion.p
                layoutId={`view-item-description-${idx}`}
                className="text-xs flex items-center justify-between"
              >
                <span className="flex items-center gap-1">
                  <span>{item.rate}</span>{" "}
                  <span className="text-muted-foreground">ETH</span>
                </span>
                {view === "Grid" && (
                  <motion.span
                    layoutId={`view-item-position-${idx}`}
                    className="flex items-center gap-1"
                  >
                    <Icons.square className="size-4" />
                    <span className="text-muted-foreground">
                      #{item.position}
                    </span>
                  </motion.span>
                )}
              </motion.p>
            </div>
            {view === "List" && (
              <motion.span
                layoutId={`view-item-position-${idx}`}
                className="flex items-center gap-1"
              >
                <Icons.square className="size-4" />
                <span className="text-muted-foreground">#{item.position}</span>
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default View;
