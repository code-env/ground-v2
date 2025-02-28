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

const initialUsers = [
  { image: null, username: "Zenith" },
  { image: null, username: "Shanelle" },
  { image: null, username: "Maskot" },
  { image: null, username: "Nothing" },
  { image: null, username: "Romaric" },
  { image: null, username: "Grace" },
  { image: null, username: "Jospen" },
];

const preSelectedUsers = ["Zenith", "Shanelle"];

const TRANSITION: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const searchUser: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
};

const counterAnimation: Variants = {
  hidden: (direction: -1 | 1) => ({
    y: direction === 1 ? 30 : -30,
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.5,
  }),
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  exit: (direction: -1 | 1) => ({
    y: direction === 1 ? -30 : 30,
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.5,
  }),
};

const UserSearch = () => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");
  const [users, setUsers] = useState(
    initialUsers.filter((user) => !preSelectedUsers.includes(user.username))
  );
  const [selectedUsers, setSelectedUsers] = useState(
    initialUsers.filter((user) => preSelectedUsers.includes(user.username))
  );
  const [direction, setDirection] = useState<1 | -1>(1);

  const toggleUserSelection = (user: { username: string }) => {
    if (selectedUsers.some((u) => u.username === user.username)) {
      // Deselect: Remove from selected, add back to users
      setSelectedUsers((prev) =>
        prev.filter((u) => u.username !== user.username)
      );
      setUsers((prev) => [...prev, { ...user, image: null }]);
      setDirection(-1);
    } else {
      // Select: Add to selected, remove from users
      setSelectedUsers((prev) => [...prev, { ...user, image: null }]);
      setUsers((prev) => prev.filter((u) => u.username !== user.username));
      setDirection(1);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    if (filteredUsers.length > 0 && value.length > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [filteredUsers.length, value.length]);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="full center">
        <m.div
          className="max-w-md w-full bg-muted border border-red-500/20 border-t-0 flex flex-col gap-3 relative overflow-hidden"
          layout
          style={{ borderRadius: 25 }}
        >
          {/* Search Bar */}
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
              value={value}
            />
            <button
              onClick={() => {
                setActive(false);
                setValue("");
              }}
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

          {/* Search Results */}
          <AnimatePresence initial={false} mode="popLayout">
            {active && (
              <m.div
                className="flex flex-col gap-2 px-2 relative w-fit"
                initial="hidden"
                animate="animate"
                exit="hidden"
                variants={searchUser}
              >
                {filteredUsers.map((user, idx) => (
                  <m.div
                    key={user.username}
                    layoutId={`${user.username}_${idx}`}
                    className="w-fit rounded-full border border-primary/20 flex items-center gap-2 p-1 pr-2 cursor-pointer"
                    onClick={() => toggleUserSelection(user)}
                  >
                    <m.div className="size-6 center border rounded-full bg-green-50">
                      <User className="size-3" />
                    </m.div>
                    <m.span className="text-xs">{user.username}</m.span>
                  </m.div>
                ))}
              </m.div>
            )}
          </AnimatePresence>

          {/* Selected Users */}
          <div className="p-2 flex flex-col gap-2 z-10 bg-muted">
            <m.p
              layoutId="recipient-number-count"
              className="text-muted-foreground text-sm"
            >
              Recipient added:{" "}
              <span className="inline-block">
                <AnimatePresence mode="popLayout" custom={direction}>
                  {selectedUsers.length
                    .toString()
                    .split("")
                    .map((value, index) => (
                      <m.span
                        key={`${value}-${index}`}
                        variants={counterAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        custom={direction}
                        className="inline-block"
                      >
                        {value}
                      </m.span>
                    ))}
                </AnimatePresence>
              </span>
            </m.p>
            <div className="flex items-center gap-2 flex-wrap">
              {selectedUsers.map((user, idx) => (
                <m.div
                  key={user.username}
                  layoutId={`${user.username}_${idx}_container`}
                  className="bg-background rounded-full border border-primary/20 flex items-center gap-2 p-1 pr-2"
                >
                  <m.div className="size-6 center border rounded-full bg-green-50">
                    <User className="size-3" />
                  </m.div>
                  <m.span className="text-xs">{user.username}</m.span>
                  <button
                    className="text-xs text-red-500"
                    onClick={() => toggleUserSelection(user)}
                  >
                    <X className="size-4" />
                  </button>
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
