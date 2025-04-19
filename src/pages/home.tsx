import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import {
  ComponentPreview,
  Feedback,
  Footer,
  Hero,
} from "@/components/animations";
import { COMPONENTS } from "@/constants/components";
const Home = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <div className="min-h-screen flex flex-col gap-20 items-center justify-center lg:px-0 px-10 overflow-x-clip">
      <div className="h-screen fixed top-0 max-w-screen-lg inset-x-0 w-full mx-auto border-x border -z-10 candy-bg hidden md:block" />
      <Hero hidden={isHidden} />
      <Feedback hidden={isHidden} />
      {COMPONENTS.map((component) => (
        <ComponentPreview
          key={component.name}
          href={component.href}
          notReady={component.notReady}
          height={component.height}
        >
          <component.component />
        </ComponentPreview>
      ))}

      <Footer />
    </div>
  );
};

export default Home;
