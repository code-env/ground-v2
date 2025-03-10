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
  className: string;
};

const list: Item[] = [
  { className: "bg-red-500" },
  { className: "bg-orange-500" },
  { className: "bg-yellow-400" },
  { className: "bg-green-600" },
  { className: "bg-blue-600" },
  { className: "bg-purple-600" },
  { className: "bg-pink-500" },
  { className: "bg-teal-500" },
  { className: "bg-indigo-600" },
  { className: "bg-gray-500" },
  { className: "bg-lime-500" },
  { className: "bg-cyan-500" },
].map((i, idx) => ({
  ...i,
  id: idx + 1,
}));

const explosionSizes = [2, 4, 6, 8, 10, 12];

const bgVariants: Variants = {
  initial: {
    scale: 0.6,
  },
  animate: {
    scale: 1,
  },
};

function getRandomPositions(
  radius: number,
  count: number = 6,
): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  const centerX = radius;
  const centerY = radius;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    positions.push({ x, y });
  }

  return positions;
}
const ProfileEdit = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Item>(list[0]);
  const positions = getRandomPositions(128, explosionSizes.length);

  console.log({ positions });

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
            <div className="border rounded-md p-5 flex gap-10 overflow-hidden">
              <div className="size-32 relative">
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
                  ></m.div>
                </AnimatePresence>
                <Snail className="size-10 inset-0 m-auto absolute text-white" />
                {Array.from({ length: explosionSizes.length }).map((_, idx) => (
                  <Explosion
                    key={idx}
                    size={explosionSizes[idx]}
                    color={active.className}
                    position={positions[idx]}
                  />
                ))}
              </div>
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

const Explosion = ({
  size,
  color,
  position,
}: {
  size: number;
  color: string;
  position: { x: number; y: number };
}) => {
  return (
    <m.div
      className={cn(
        "absolute inset-0 m-auto rounded-full center bg-sky-800",
        color,
      )}
      layoutId="edit-profile-explosion"
      style={{ width: size, height: size, left: position.x, top: position.y }}
    />
  );
};

export default ProfileEdit;
