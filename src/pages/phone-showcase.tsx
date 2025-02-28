import { useState } from "react";
import {
  AnimatePresence,
  motion as m,
  MotionConfig,
  Transition,
  Variants,
} from "motion/react";

const TRANSITION: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const PhoneShowcase = () => {
  return (
    <MotionConfig transition={TRANSITION}>
      <div>PhoneShowcase</div>;
    </MotionConfig>
  );
};

export default PhoneShowcase;
