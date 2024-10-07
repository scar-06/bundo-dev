"use client";

import { useMemo } from "react";
import { useCountdown, useUpdateEffect } from "usehooks-ts";

const useTimer = (timeInSecs: number, ellapseCB?: () => void) => {
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: timeInSecs,
      intervalMs: 1000,
    });

  const minutes = useMemo(() => Math.floor(count / 60), [count]);
  const seconds = useMemo(() => count % 60, [count]);

  useUpdateEffect(() => {
    if (count === 0) {
      ellapseCB?.();
    }
  }, [count]);

  return {
    count,
    minutes: minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }),
    seconds: seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 }),
    startCountdown,
    stopCountdown,
    resetCountdown,
  };
};

export { useTimer };
