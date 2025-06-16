"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "motion/react";
import { ReactNode, useState } from "react";
import { Icons } from "../shared/icons";

type NullOrNumber = number | null;
type Direction = "left" | "right" | null;

const navItems = [
  [
    {
      title: "Core Features",
      className: "flex flex-col gap-2",
      items: [
        {
          title: "Plan",
          description: "Set the product direction with project and initiatives",
        },
        {
          title: "Build",
          description: "Make progress with issue tracking and cycle planning",
        },
      ],
    },
    {
      title: "More",
      className: "grid grid-cols-2 gap-2",
      items: [
        {
          title: "Customer requests",
          description: "Manage your feedback",
        },
        {
          title: "Insights",
          description: "Realtime analytics",
        },
        {
          title: "Linear ask",
          description: "Workspace request",
        },
        {
          title: "Integrations",
          description: "Collaborate accross tools",
        },
        {
          title: "Linear app",
          description: "Linear in your pocket",
        },
        {
          title: "Changelog",
          description: "See what's new",
        },
      ],
    },
  ],
  [
    {
      title: "Company",
      className: "flex flex-col gap-2",
      items: [
        {
          title: "About",
          description: "Meet the team",
        },
        {
          title: "Careers",
          description: "We're hiring",
        },
      ],
    },
    {
      title: "Explore",
      className: "grid grid-cols-2 gap-2",
      items: [
        {
          title: "Linear Method",
          description: "Practice for building",
        },
        {
          title: "Security",
          description: "Safe, Secure and private",
        },
        {
          title: "Docs",
          description: "How to use linear",
        },
        {
          title: "Switch to linear",
          description: "Migration guide",
        },
        {
          title: "Download",
          description: "Get the app",
        },
        {
          title: "Quality",
          description: "Conversations on quality",
        },
      ],
    },
  ],
];

const Product = () => {
  const item = navItems[0];
  return <Item item={item} />;
};

const Resources = () => {
  const item = navItems[1];
  return <Item item={item} />;
};

interface ItemProps {
  item: {
    title: string;
    className: string;
    items: {
      title: string;
      description: string;
    }[];
  }[];
}

const Item = ({ item }: ItemProps) => {
  return (
    <div className="grid grid-cols-3 divide-x size-full gap-y-4 ">
      {item.map((i, idx) => (
        <div
          key={idx}
          className={cn("flex flex-col gap-4 p-2", {
            "col-span-2": idx === 1,
          })}
        >
          <h1 className="text-sm text-muted-foreground font-light p-2">
            {i.title}
          </h1>
          <ul className={cn(i.className, "gap-2")}>
            {i.items.map((item, idx) => (
              <li
                key={idx}
                className={cn(
                  "flex flex-col p-2 hover:bg-primary/5 transition-all duration-200 border border-transparent hover:border-border rounded-md cursor-pointer"
                )}
              >
                <h2 className="text-sm font-medium">{item.title}</h2>
                <p className="text-xs text-muted-foreground ">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const DropdownNavVariant: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  vissible: {
    scale: 1,
    opacity: 1,
  },
};

const DropdownNavVariantElementVariant: Variants = {
  initial: (direction: Direction) => ({
    opacity: 0,
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: Direction) => ({
    opacity: 0,
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
  }),
};

const TABS = [
  {
    title: "Product",
    element: Product,
  },
  {
    title: "Resources",
    element: Resources,
  },
  {
    title: "Pricing",
    element: null,
  },
  {
    title: "Customers",
    element: null,
  },
].map((t, idx) => ({ ...t, id: idx + 1 }));

const LinearTab = () => {
  const [selected, setSelected] = useState<NullOrNumber>(null);
  const [direction, setDirection] = useState<Direction>(null);

  function handleSelected(value: NullOrNumber) {
    if (typeof selected === "number" && typeof value === "number") {
      setDirection(selected > value ? "right" : "left");
    } else if (value === null) {
      setDirection(null);
    }
    setSelected(value);
  }

  return (
    <div className="size-full rounded-xl bg-background overflow-hidden border">
      <header className="h-16 border-b font-medium">
        <nav className="flex items-center size-full justify-between px-4">
          <div className="flex items-center gap-2">
            <Icons.linear className="size-4" />
            <span>Linear</span>
          </div>
          <ul
            onMouseLeave={() => handleSelected(null)}
            className="flex items-center gap-2 relative"
          >
            {TABS.map((t, idx) => (
              <NavItem
                handleSelected={handleSelected}
                selected={selected}
                item={t.id}
                key={idx + t.title}
              >
                {t.title}
              </NavItem>
            ))}
            <AnimatePresence>
              {selected && (
                <SelectedItemDropDown
                  direction={direction}
                  selected={selected}
                />
              )}
            </AnimatePresence>
          </ul>
          <div className="flex items-center gap-3">
            <button
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              Login
            </button>
            <button className={buttonVariants({ size: "sm" })}>Sign up</button>
          </div>
        </nav>
      </header>
    </div>
  );
};

interface NavItemProps {
  children: ReactNode;
  item: number;
  handleSelected: (value: NullOrNumber) => void;
  selected: NullOrNumber;
}

const NavItem = ({
  children,
  item,
  handleSelected,
  selected,
}: //   selected,
NavItemProps) => {
  return (
    <li
      className={buttonVariants({
        size: "sm",
        variant: "ghost",
        className: cn("cursor-pointer", {
          "bg-muted": selected === item,
        }),
      })}
      onMouseEnter={() => handleSelected(item)}
      onClick={() => handleSelected(item)}
    >
      {children}
    </li>
  );
};

interface SelectedItemDropDownProps {
  direction: Direction;
  selected: NullOrNumber;
}

const SelectedItemDropDown = ({
  selected,
  direction,
}: SelectedItemDropDownProps) => {
  const tab = TABS.find((t) => t.id === selected!);
  if (!tab || tab?.element === null) return null;

  return (
    <motion.div
      variants={DropdownNavVariant}
      animate="vissible"
      initial="hidden"
      exit="hidden"
      className="absolute -left-1/2 -right-1/2 mx-auto w-[calc(100%+300px)] border bg-background top-[calc(100%+10px)] rounded-xl p-2"
    >
      <div className="overflow-hidden w-full bg-muted rounded-lg border">
        {tab?.id === selected! && (
          <motion.div
            key={selected}
            custom={direction}
            variants={DropdownNavVariantElementVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
          >
            <tab.element />
          </motion.div>
        )}
      </div>
      <div className="absolute -top-[10px] h-2.5 w-full bg-transparent" />
    </motion.div>
  );
};

export default LinearTab;
