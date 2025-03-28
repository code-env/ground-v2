import { cn } from "@/lib/utils";
import { Layers2, LayoutGrid, List, LucideIcon, Star } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import React from "react";
import { buttonVariants } from "../ui/button";

type Views = "List" | "Grid" | "Stacked";

type ViewItem = {
  icon: LucideIcon;
  name: string;
  view: Views;
};

type Item = {
  name: string;
  description: string;
  image: string;
  angle?: number;
};

const views: ViewItem[] = [
  {
    name: "List view",
    icon: List,
    view: "List",
  },
  {
    name: "Card view",
    icon: LayoutGrid,
    view: "Grid",
  },
  {
    name: "Pack view",
    icon: Layers2,
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

const items = [
  {
    name: "Succession",
    description: "Tv show - Comedy",
    image: "/succession.jpeg",
    angle: -10,
  },
  {
    name: "Dune 2",
    description: "Movie - Sci-fi",
    image: "/dune.jpg",
    angle: 15,
  },
];

const View = () => {
  const [view, setView] = React.useState<Views>("List");
  const handleClick = (newView: Views) => {
    setView(newView);
  };
  return (
    <MotionConfig transition={TRANSITION}>
      <div className="center full">
        <div className="max-w-sm w-full space-y-4">
          <div className="h-14 border-b flex gap-2">
            {views.map((item) => (
              <button
                key={item.name}
                className={buttonVariants({
                  variant: item.view === view ? "default" : "secondary",
                  className: "flex-1",
                })}
                onClick={() => handleClick(item.view)}
              >
                <item.icon className="w-4 h-4" />
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
    <div className="grid grid-cols-2 gap-6">
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
            className="absolute "
          />
        ))}
      </div>
      <div className="text-center mt-2">
        <p className="clas">{items.length} Movies</p>
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
      className={cn("flex flex-col gap-2 ", className)}
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
          "w-full h-auto",
          view === "Grid"
            ? "w-full h-44"
            : view === "List"
            ? "size-16"
            : "size-20",
          "object-cover rounded-2xl border"
        )}
      />
      <AnimatePresence>
        {view !== "Stacked" && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1"
          >
            <motion.h3
              layoutId={`view-item-title-${idx}`}
              className="text-lg font-bold"
            >
              {item.name}
            </motion.h3>
            <motion.p
              layoutId={`view-item-description-${idx}`}
              className="text-sm flex items-center gap-2 justify-between"
            >
              <span>{item.description}</span>
              <span className="flex items-center gap-1">
                <Star className="size-3 text-muted-foreground fill-muted-foreground" />{" "}
                3
              </span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default View;
