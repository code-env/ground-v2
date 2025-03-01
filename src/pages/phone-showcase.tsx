import Waitlist from "@/components/forms/waitlist";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion as m,
  MotionConfig,
  Transition,
} from "motion/react";
import { useState } from "react";

const TRANSITION: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

type Item = {
  name: string;
  description: string;
  id: number;
  angle: number;
};

const items: Item[] = [
  {
    name: "Choose how you feel",
    description:
      "Start by selecting your current mode-calm, stressed, or in need of focus. Ground curates the perfect for you.",
    angle: -12,
  },
  {
    name: "Listen, Breathe, and Unwind",
    description:
      "Whether it's a guided meditation, soothing soundscape, or deep breathing session, Ground helps you find your balance.",
    angle: 15,
  },
  {
    name: "Follow your progress",
    description:
      "Buildyour mindfulness habit with personalized steaks, mood tracking and insights to help you grow.",
    angle: 40,
  },
].map((item, idx) => ({ ...item, id: idx + 1 }));

const PhoneShowcase = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick = (index: number) => {
    const newIdx = index + 1;
    setSelectedIndex(newIdx);
  };

  const getVisibleItems = () => {
    switch (selectedIndex) {
      case 1:
        return items;
      case 2:
        return items.slice(1);
      case 3:
        return items.slice(2);
      default:
        return items;
    }
  };

  const visibleItems = getVisibleItems();
  const originalAngles = items.map((item) => item.angle);

  return (
    <MotionConfig transition={TRANSITION}>
      <m.main
        initial="initial"
        animate="animate"
        className="flex flex-col gap-20 h-screen overflow-hidden"
      >
        <Header />
        <div className="max-w-5xl w-full mx-auto flex flex-col gap-40">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold text-primary/80">
              How it works
            </h1>
            <p className="text-muted-foreground text-lg">
              A few well created animations can change your site.{" "}
              <span className="block">
                Ground provides you with animtions built for performance.
              </span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="max-w-md flex flex-col gap-4">
              {items.map((item, idx) => (
                <div
                  className={cn(
                    "p-4 rounded-lg hover:bg-primary group cursor-pointer bg-transparent duration-300 transition-all border border-dashed hover:border-transparent",
                    selectedIndex === idx + 1 && "border-primary"
                  )}
                  key={idx + item.name}
                  onClick={() => handleClick(idx)}
                >
                  <h2 className="text-2xl font-medium group-hover:text-primary-foreground t duration-300 transition-all text-primary/80">
                    {item.name}
                  </h2>
                  <p className="text-muted-foreground group-hover:text-primary-foreground/60">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex-1 h-[600px] relative z-0 flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item, idx) => {
                  const newAngle = originalAngles[idx];

                  return (
                    <m.div
                      key={item.name}
                      className={cn(
                        "h-[600px] w-96 absolute bottom-0 top-0 left- right-20 m-auto"
                      )}
                      animate={{
                        rotate: newAngle,
                        top: idx * 20,
                        zIndex: items.length - idx,
                        opacity: 1,
                      }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ transformOrigin: "bottom center" }}
                    >
                      <img
                        src="/phone.png"
                        alt="phone"
                        className="size-full object-cover scale-110"
                      />
                    </m.div>
                  );
                })}
              </AnimatePresence>
              <div className="h-80 w-[calc(100%+200px)] bg-gradient-to-b from-transparent via-background to-white absolute -bottom-20 left-0 z-50" />
            </div>
          </div>
        </div>
      </m.main>
    </MotionConfig>
  );
};
const Header = () => {
  return (
    <header className="border-b border-dashed h-16">
      <nav className="max-w-5xl mx-auto w-full flex items-center justify-between h-full">
        <Logo gradient={false} className="size-12" />
        <Waitlist>
          <Button size="lg">Join waitlist</Button>
        </Waitlist>
      </nav>
    </header>
  );
};

export default PhoneShowcase;
