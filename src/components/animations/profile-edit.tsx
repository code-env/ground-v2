import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Snail, X } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  Transition,
  Variants,
  motion as m,
} from "motion/react";
import { useState } from "react";

const TRANSITION: Transition = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

type Item = {
  id: number;
  name: string;
  className: string;
};

const list: Item[] = [
  { name: "marketting", className: "bg-yellow-500" },
  { name: "product", className: "bg-blue-500" },
  { name: "Development", className: "bg-green-500" },
  { name: "design", className: "bg-purple-500" },
  { name: "sales", className: "bg-red-500" },
  { name: "stakeholder", className: "bg-indigo-500" },
  { name: "marketting", className: "bg-yellow-500" },
  { name: "product", className: "bg-blue-500" },
  { name: "Development", className: "bg-green-500" },
  { name: "design", className: "bg-purple-500" },
  { name: "sales", className: "bg-red-500" },
  { name: "stakeholder", className: "bg-indigo-500" },
].map((i, idx) => ({
  ...i,
  id: idx + 1,
}));

const bgVariants: Variants = {
  initial: {
    scale: 0.6,
  },
  animate: {
    scale: 1,
  },
};

const ProfileEdit = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Item>(list[0]);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <MotionConfig transition={TRANSITION}>
      {open ? (
        <m.div
          layoutId="edit-profile-container"
          style={{ borderRadius: 12 }}
          className="bg-background border max-w-md w-full rounded-xl shadow-sm"
        >
          <div className="h-12 border-b flex items-center justify-between px-5">
            <m.span layoutId="edit-profile-text">Edit profile</m.span>
            <button
              onClick={toggleOpen}
              className="size-6 center hover:bg-muted rounded-full"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="p-10 flex flex-col gap-4">
            <div className="border rounded-md p-5 flex gap-10">
              <AnimatePresence mode="popLayout">
                <m.div
                  variants={bgVariants}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                  key={active.id}
                  className={cn(
                    "size-32 bg-red-500 rounded-full center relative",
                    active.className,
                  )}
                >
                  <Snail className="size-10 text-white absolute inset-0 m-auto" />
                </m.div>
              </AnimatePresence>
              <div className="flex-1 grid grid-cols-4 gap-1">
                {list.map((i, idx) => (
                  <div
                    onClick={() => setActive(list[idx])}
                    key={idx + i.id}
                    className={cn(
                      "size-7 bg-red-500 rounded-full cursor-pointer relative",
                      i.className,
                    )}
                  >
                    {active.id === i.id && (
                      <m.div
                        layoutId="edit-profile-active-color"
                        className="size-4 bg-white absolute inset-0 m-auto rounded-full center"
                      >
                        <m.div
                          className={cn(
                            active.className,
                            "size-2 rounded-full",
                          )}
                          layoutId="edit-profile-mid-circle"
                        />
                      </m.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground/90">Account name</p>
              <Input className="bg-muted" />
            </div>
            <Button>Save</Button>
          </div>
        </m.div>
      ) : (
        <m.button
          onClick={toggleOpen}
          className={buttonVariants({
            className: "!bg-background !text-primary !border-2",
          })}
          layoutId="edit-profile-container"
          style={{ borderRadius: 8 }}
        >
          <m.span layoutId="edit-profile-text">Edit profile</m.span>
        </m.button>
      )}
    </MotionConfig>
  );
};

export default ProfileEdit;
