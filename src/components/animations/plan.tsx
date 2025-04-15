import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: 1,
    name: "Free",
    subscriptions: [],
  },
  {
    id: 2,
    name: "Premium",
    subscriptions: ["Monthly", "Annual"],
  },
];

type ActiveSubscription = "Monthly" | "Annual" | "None";

const Plan = () => {
  const [activeIdx, setActiveIdx] = useState(1);
  const [activeSub, setActiveSub] = useState<ActiveSubscription>("None");

  const handlePlanClick = (planId: number) => {
    if (planId === 1) {
      setActiveIdx(1);
      setActiveSub("None");
      return;
    }
    setActiveIdx(planId);
    if (activeSub === "None") {
      setActiveSub("Monthly");
    }
  };

  const handleSubClick = (sub: ActiveSubscription, e: React.MouseEvent) => {
    if (activeIdx !== 2) return;
    e.stopPropagation();
    setActiveSub(sub);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-background border-2 rounded-full shadow-md p-1 flex gap-2 h-16">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className="relative flex-1 rounded-full cursor-pointer"
              onClick={() => handlePlanClick(plan.id)}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {activeIdx === plan.id && (
                <motion.div
                  layoutId="active-plan-highlight"
                  className="absolute inset-0 bg-primary rounded-full"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}

              <div className="flex flex-col h-full w-full items-center justify-center rounded-full z-10 relative">
                <AnimatePresence mode="wait">
                  {((plan.id === 2 && activeIdx !== 2) || plan.id !== 2) && (
                    <motion.p
                      key={`plan-name-${plan.id}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.05 }}
                      className={cn("text-sm text-center font-bold", {
                        "text-primary-foreground": activeIdx === plan.id,
                      })}
                    >
                      {plan.name}
                    </motion.p>
                  )}
                </AnimatePresence>
                {plan.subscriptions.length > 0 && (
                  <Subscriptions
                    activeIdx={activeIdx}
                    activeSub={activeSub}
                    subscriptions={plan.subscriptions}
                    handleSubClick={handleSubClick}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Subscriptions = ({
  activeIdx,
  activeSub,
  subscriptions,
  handleSubClick,
}: {
  activeIdx: number;
  activeSub: ActiveSubscription;
  subscriptions: string[];
  handleSubClick: (sub: ActiveSubscription, e: React.MouseEvent) => void;
}) => {
  return (
    <AnimatePresence mode="popLayout">
      {activeIdx !== 2 ? (
        <motion.div key="collapsed-subs" className="flex gap-2">
          {subscriptions.map((sub) => (
            <>
              <motion.p
                key={`sub-${sub}`}
                className="text-sm size-full rounded-full flex items-center justify-center relative"
                layoutId={`sub-${sub}`}
              >
                {sub}
              </motion.p>
              <span>{" . "}</span>
            </>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="expanded-subs"
          className="flex gap-1 size-full rounded-full p-1 items-center justify-center"
        >
          {subscriptions.map((sub) => (
            <motion.div
              key={`sub-option-${sub}`}
              className={cn(
                "text-sm size-full rounded-full flex items-center justify-center relative text-primary-foreground z-10",
                {
                  "text-primary": activeSub === sub,
                }
              )}
              onClick={(e) => handleSubClick(sub as ActiveSubscription, e)}
              layoutId={`sub-${sub}`}
            >
              {sub}
              {activeSub === sub && (
                <motion.div
                  layoutId="active-sub-highlight"
                  className="absolute inset-0 bg-background rounded-full -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Plan;
