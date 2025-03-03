import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  ChevronRight,
  MessageSquare,
  PlusCircle,
  User,
  UserCircle,
} from "lucide-react";

import { AnimatePresence, motion as m, Variants } from "motion/react";
import { useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  add?: boolean;
};

type UserWithAdd = User | { add: boolean };

const defaultUser: UserWithAdd[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
  },
  {
    add: true,
  },
];

const textVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const UserStacked = () => {
  const [users] = useState<UserWithAdd[]>(defaultUser);
  const [active, setActive] = useState(false);
  const realUsers = users.filter((user) => !user.add);

  return (
    <div className="full flex justify-center p-10 select-none">
      <div className="flex flex-col gap-4 max-w-md w-full text-muted-foreground">
        <div
          className="flex items-center justify-between p-2 hover:bg-muted/10 rounded-md cursor-pointer"
          onClick={() => setActive((prev) => !prev)}
        >
          <p className="flex items-center gap-2">
            <UserCircle className="size-4" />
            <span>People</span>
            <span className="center size-4 text-xs bg-muted rounded-full">
              {realUsers.length}
            </span>
          </p>
          <button className="flex items-center gap-2">
            <AnimatePresence mode="popLayout">
              {active ? (
                <m.span
                  variants={textVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="open"
                >
                  Hide
                </m.span>
              ) : (
                <m.span
                  variants={textVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="closed"
                >
                  Show All
                </m.span>
              )}
            </AnimatePresence>
            <span>
              <ChevronRight
                className={cn("size-4 transition-all duration-300", {
                  "rotate-90": active,
                })}
              />
            </span>
          </button>
        </div>
        {active ? <UnStack users={users} /> : <Stack users={users} />}
      </div>
    </div>
  );
};

const UnStack = ({ users }: { users: UserWithAdd[] }) => {
  return (
    <div className="flex flex-col relative gap-2 px-4">
      {users.map((user, index) => (
        <UserCard
          key={index}
          user={user}
          index={index}
          stack={false}
          length={users.length}
        />
      ))}
    </div>
  );
};

const UserCard = ({
  user,
  stack,
  index,
  length,
}: {
  user: UserWithAdd;
  stack?: boolean;
  index: number;
  length: number;
}) => {
  const isRealUser = "id" in user;

  return (
    <m.div
      layoutId={isRealUser ? `user-${user.id}` : "add-user"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      style={{
        top: stack ? index * 10 : 0,
        zIndex: stack ? length - index : 0,
        width: stack ? `calc(90% - ${index * 2}rem)` : "auto",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1,
      }}
      className={cn(
        "flex items-center justify-between gap-2 border bg-background p-2 rounded-md shadow-sm",
        {
          "absolute top-0 left-0 right-0 mx-auto shadow-md": stack,
          "bg-muted": user.add,
        },
      )}
    >
      {isRealUser ? (
        <>
          <div className="flex items-center gap-2">
            <div className="size-6 border rounded-full center">
              <User className="!size-3" />
            </div>
            <span>{user.name}</span>
          </div>
          <Button size="icon" variant="ghost" className="size-6 outline-none">
            <MessageSquare className="!size-3" />
          </Button>
        </>
      ) : (
        <div className="flex items-center gap-2 justify-center w-full bg-muted cursor-pointer">
          <PlusCircle className="size-4" />
          <span>Add User</span>
        </div>
      )}
    </m.div>
  );
};

const Stack = ({ users }: { users: UserWithAdd[] }) => {
  return (
    <m.div className="flex flex-col relative gap-2 px-4  h-40">
      {users.map((user, index) => (
        <UserCard
          key={index}
          user={user}
          stack={true}
          index={index}
          length={users.length}
        />
      ))}
    </m.div>
  );
};

export default UserStacked;

// dw-constructions.co
