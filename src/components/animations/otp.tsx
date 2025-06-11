import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, useEffect } from "react";

const Otp = () => {
  const generateOtp = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const seed = timestamp % 10000;
    const random = Math.floor(Math.random() * 10000);
    const combined = (seed + random) % 10000;
    return combined.toString().padStart(4, "0");
  };

  const [generatedOtp] = useState(generateOtp());
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [shake, setShake] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0); // 0: not started, 1: animating, 2: completed

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const isDigitValid = (index: number) => {
    return otpValues[index] === "" || otpValues[index] === generatedOtp[index];
  };

  const isAllFieldsFilled = () => {
    return otpValues.every((value) => value !== "");
  };

  const isOtpCorrect = () => {
    return otpValues.join("") === generatedOtp;
  };

  // Trigger animation when all fields are filled
  useEffect(() => {
    if (isAllFieldsFilled() && !isAnimating && animationPhase === 0) {
      setIsAnimating(true);
      setAnimationPhase(1);

      // Complete animation after 2 seconds
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationPhase(2);
      }, 2000);
    }
  }, [otpValues, isAnimating, animationPhase]);

  // Reset animation phase when user starts typing again
  useEffect(() => {
    if (!isAllFieldsFilled() && animationPhase > 0) {
      setAnimationPhase(0);
      setIsAnimating(false);
    }
  }, [otpValues]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // If value is invalid, trigger shake animation
    if (value && value !== generatedOtp[index]) {
      setShake(index);
      setTimeout(() => setShake(-1), 500);
    }

    // Auto focus next input
    if (value !== "" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtpValues = pastedData
      .split("")
      .concat(Array(4).fill(""))
      .slice(0, 4);
    setOtpValues(newOtpValues);

    // Focus last filled input or first empty input
    const lastIndex = Math.min(pastedData.length - 1, 3);
    inputRefs[lastIndex].current?.focus();
  };

  const getInputClassName = (index: number) => {
    const baseClasses =
      "h-14 w-14 rounded-lg text-center text-2xl transition-all duration-200 focus:outline-none relative";

    if (animationPhase === 2) {
      // After animation is complete
      if (isOtpCorrect()) {
        return cn(
          baseClasses,
          "border-2 border-green-500 bg-green-100 text-green-600"
        );
      } else {
        return cn(
          baseClasses,
          "border-2 border-red-500 bg-red-100 text-red-500"
        );
      }
    } else if (otpValues[index] && !isDigitValid(index)) {
      // Invalid input during typing
      return cn(baseClasses, "border-2 border-red-500 bg-red-100 text-red-500");
    } else {
      // Default state
      return cn(
        baseClasses,
        "border-2 focus:border-blue-500 bg-white text-black border-gray-300"
      );
    }
  };

  return (
    <div className="full center flex-col gap-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl font-bold text-gray-700"
      >
        Generated OTP: {generatedOtp}
      </motion.div>

      <div className="flex gap-4">
        <AnimatePresence mode="wait">
          {otpValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                x: shake === index ? [-2, 2, -2, 2, 0] : 0,
              }}
              transition={{
                duration: 0.2,
                delay: index * 0.1,
                x: { duration: 0.4 },
              }}
              className="relative"
            >
              {/* Progressive border animation */}
              {isAnimating && (
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0deg, #3b82f6 0deg, #3b82f6 90deg, transparent 90deg)`,
                      padding: "2px",
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      ease: "linear",
                      repeat: 0,
                    }}
                  >
                    <div className="w-full h-full rounded-lg bg-white" />
                  </motion.div>
                </div>
              )}

              <motion.input
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                className={getInputClassName(index)}
                style={{
                  zIndex: isAnimating ? 10 : 1,
                  position: "relative",
                }}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                animate={{
                  scale: value ? 1.05 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Status indicator */}
      {animationPhase === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "text-lg font-semibold px-4 py-2 rounded-lg",
            isOtpCorrect()
              ? "text-green-600 bg-green-100"
              : "text-red-600 bg-red-100"
          )}
        >
          {isOtpCorrect() ? "✓ OTP Verified Successfully!" : "✗ Incorrect OTP"}
        </motion.div>
      )}
    </div>
  );
};

export default Otp;
