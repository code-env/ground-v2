import { getWeekDates, DayInfo } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  Transition,
  motion as m,
} from "motion/react";
import { useState } from "react";

const transition: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 10,
  mass: 0.5,
  duration: 0.4,
};

const tasks = [
  {
    id: 1,
    title: "Team meeting",
    description: "Today, 2:00 PM",
  },
  {
    id: 2,
    title: "Project Deadline",
    description: "Tomorrow, 5:00 PM",
  },
];

const letterVariants = {
  hidden: { filter: "blur(3px)", y: 20, opacity: 0, scale: 0.5 },
  visible: { filter: "blur(0px)", y: 0, opacity: 1, scale: 1 },
  exit: { filter: "blur(3px)", y: -20, opacity: 0, scale: 0.5 },
};

const taskContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const Tasks = () => {
  const weekDates = getWeekDates();
  const [selected, setSelected] = useState<DayInfo>(
    () => weekDates.find((date) => date.isToday) || weekDates[0]
  );

  return (
    <MotionConfig transition={transition}>
      <div className="full center">
        <m.div
          layout
          className="border border-foreground/10 rounded-3xl p-6 bg-muted flex flex-col gap-4 relative overflow-hidden"
          transition={{
            layout: {
              type: "spring",
              stiffness: 80,
              damping: 12,
            },
          }}
        >
          <AnimatePresence mode="popLayout">
            <m.div
              key={`${selected.day}-${selected.date}`}
              className="text-3xl font-bold"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {selected.day.split("").map((letter, index) => (
                <m.span
                  key={`${selected.day}-${index}`}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{
                    ...transition,
                    delay: index * 0.05,
                  }}
                  className="inline-block"
                >
                  {letter}
                </m.span>
              ))}
            </m.div>
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            {selected.isToday && (
              <m.div
                className="flex flex-col gap-4"
                variants={taskContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  ...transition,
                  staggerChildren: 0.05,
                }}
                layout
              >
                <m.p
                  className="flex items-center gap-2"
                  variants={taskContainerVariants}
                >
                  <Calendar className="size-4" />
                  <span>Upcoming tasks</span>
                </m.p>
                <m.ul className="flex gap-2">
                  {tasks.map((task, index) => (
                    <m.li
                      key={task.id}
                      className="flex flex-col border border-muted-foreground/10  hover:bg-muted-foreground/10 cursor-pointer flex-1 rounded-xl py-2 px-4"
                      variants={taskContainerVariants}
                      transition={{
                        ...transition,
                        delay: index * 0.1,
                      }}
                    >
                      <p className="font-medium">{task.title}</p>
                      <p className="text-primary/50 text-sm">
                        {task.description}
                      </p>
                    </m.li>
                  ))}
                </m.ul>
              </m.div>
            )}
          </AnimatePresence>

          <div className="flex gap-4 bg-muted z-20">
            {weekDates.map((date) => (
              <m.div
                key={date.date}
                layoutId={`day-${date.date}`}
                className={cn(
                  "flex flex-col items-center hover:bg-muted-foreground/10 rounded-xl p-2 cursor-pointer text-primary/70 relative",
                  selected?.date === date.date &&
                    "bg-background text-primary border hover:bg-background/80"
                )}
                onClick={() => setSelected(date)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <h2>{date.month}</h2>
                <p className="font-bold">{date.date}</p>
                <p>{date.day}</p>
                {selected?.date === date.date && (
                  <m.div
                    className="absolute size-2 bg-red-500 -top-1 rounded-xl bg-background"
                    layoutId="day-selected-active"
                  />
                )}
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </MotionConfig>
  );
};

export default Tasks;
