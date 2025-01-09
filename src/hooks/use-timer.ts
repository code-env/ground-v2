import { useState, useEffect, useCallback } from "react";

export const useTimer = (initialDuration: number, resetOnFinish?: boolean) => {
  const [time, setTime] = useState(initialDuration);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else if (resetOnFinish) {
          return initialDuration;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paused, resetOnFinish, initialDuration]);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, []);

  const resetTimer = useCallback(() => {
    setTime(initialDuration);
  }, [initialDuration]);

  return {
    time,
    formattedTime: formatTime(time),
    paused,
    setPaused,
    resetTimer,
  };
};
