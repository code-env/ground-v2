import { cn } from "@/lib/utils";
import { motion as m } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const members = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://i.pravatar.cc/150?img=1",
  },
];

const NewMember = () => {
  return (
    <div className="full center">
      <div className="max-w-sm w-full flex flex-col gap-10">
        <div className="flex items-center justify-between gap-2">
          <Input placeholder="Enter your email" className="bg-muted" />
          <Button>Join waitlist</Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            {[...members, ...members].map((member, index) => {
              return (
                <m.img
                  src={member.image}
                  key={index}
                  alt={member.name}
                  className={cn(
                    "w-10 h-10 rounded-full border-background border-2",
                    index === 0 ? "" : "-mx-2"
                  )}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-2 relative bg-muted rounded-full py-1 pr-4 pl-12 border">
            <div className="size-12 bg-background border p-0.5 min-w-12 rounded-full  center overflow-hidden absolute -left-1 top-0 bottom-0 my-auto">
              <div className="size-full center bg-primary text-primary-foreground rounded-full">
                {180}
              </div>
            </div>
            <p className="text-sm">People joined today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMember;
