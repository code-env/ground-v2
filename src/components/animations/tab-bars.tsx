import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

const items = ["Newest", "Following", "Popular", "Trending"];

const TabBars = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="flex items-center justify-center rounded-xl size-full bg-background">
      <ul className="flex items-center gap-2">
        {items.map((item, idx) => (
          <li
            key={idx}
            className={cn(
              "px-6 py-2 border text-sm font-semibold cursor-pointer bg-muted z-0 rounded-xl relative transition-all duration-300 ",
              {
                "text-background": idx === active,
              },
            )}
            onClick={() => setActive(idx)}
          >
            {item}
            {idx === active && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute size-full top-0 left-0 -z-10  bg-primary rounded-xl"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabBars;
