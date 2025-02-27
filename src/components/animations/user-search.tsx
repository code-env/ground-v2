import { Search, User, X } from "lucide-react";
import {
  AnimatePresence,
  motion as m,
  MotionConfig,
  Transition,
  Variants,
} from "motion/react";
import { useEffect, useState } from "react";
import { buttonVariants } from "../ui/button";
import { Input } from "../ui/input";

const users = [
  {
    image: null,
    username: "Zenith",
    selected: true,
  },
  {
    image: null,
    username: "Shanelle",
    selected: true,
  },
];

const TRANSITION: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const searchUser: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
};

const UserSearch = () => {
  const selectedUsers = users.filter((user) => user.selected);
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    let timeout = setTimeout(() => setActive(true), 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="full center">
        <m.div
          className="max-w-md w-full bg-muted border border-primary/20 border-t-0 flex flex-col gap-3  relative overflow-hidden"
          layout
          style={{ borderRadius: 25 }}
        >
          <m.div
            layoutId="nothing-search-container"
            className="h-[50px] w-full bg-background rounded-full flex items-center relative"
          >
            <span className="absolute size-8 bg-muted border left-2 rounded-full center">
              <Search className="size-4 text-muted-foreground" />
            </span>
            <Input
              className="h-full rounded-[25px] border border-primary/20 px-12 focus:border-primary transition-all duration-300 text-muted-foreground"
              placeholder="Search and add users..."
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              onClick={() => setActive((prev) => !prev)}
              className={buttonVariants({
                className:
                  "ml-auto !rounded-full absolute right-2 top-0 bottom-0 my-auto",
                size: "icon",
                variant: "ghost",
              })}
            >
              <X />
            </button>
          </m.div>
          <AnimatePresence initial={false} mode="popLayout">
            {active && (
              <m.div
                className="flex flex-col gap-2 px-2  relative w-fit"
                initial="hidden" // transition={{
                //   duration: 0.15,
                // }}
                animate="animate"
                exit="hidden"
                variants={searchUser}
              >
                {selectedUsers
                  .filter((user) =>
                    user.username
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase())
                  )
                  .map((user, idx) => (
                    <m.div
                      layoutId={`${user.username}_${idx}`}
                      className="w-fit rounded-full border border-primary/20 flex items-center gap-2 p-1 pr-2 relative"
                      key={user.username + idx}
                    >
                      <m.div
                        //   layoutId={`${user.username}_profile`}
                        className="size-6 center border rounded-full bg-green-50"
                      >
                        <User className="size-3" />
                      </m.div>
                      <m.span
                        //   layoutId={`${user.username}_username`}
                        className="text-xs"
                      >
                        {user.username}
                      </m.span>
                    </m.div>
                  ))}
              </m.div>
            )}
          </AnimatePresence>
          <div className="p-2 flex flex-col gap-2 z-10 bg-muted">
            <m.p
              layoutId="recipient-number-count"
              className="text-muted-foreground text-sm"
            >
              Recipient added: {selectedUsers.length}
            </m.p>
            <div className="flex items-center gap-2">
              {selectedUsers.map((user, idx) => (
                <m.div
                  layoutId={`${user.username}_${idx}_container`}
                  className="bg-background rounded-full border border-primary/20 flex items-center gap-2 p-1 pr-2"
                  key={user.username + idx}
                >
                  <m.div
                    layoutId={`${user.username}_profile_container`}
                    className="size-6 center border rounded-full bg-green-50"
                  >
                    <User className="size-3" />
                  </m.div>
                  <m.span
                    layoutId={`${user.username}_username_container`}
                    className="text-xs"
                  >
                    {user.username}
                  </m.span>
                </m.div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </MotionConfig>
  );
};

export default UserSearch;
