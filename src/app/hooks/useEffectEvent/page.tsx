"use client";

import { useEffect, useEffectEvent, useState } from "react";

const UseEffectEventPage = () => {
  const [seconds, setSeconds] = useState(0);
  const [maxSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    setIsRunning(!isRunning);
    if (maxSeconds === seconds) {
      handleReset();
    }
  };

  const handleReset = () => {
    if (isRunning) return;
    setSeconds(0);
  };

  const handleInterval = useEffectEvent(() => {
    setSeconds((prev) => {
      const next = prev + 1;
      // useEffectEvent로 maxSeconds 의존성 제거 가능
      if (next >= maxSeconds) {
        setIsRunning(false);

        return next;
      }

      return next;
    });
  });

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(handleInterval, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <p>{seconds}</p>
      <span>타이머는 5초까지만 동작합니다!</span>

      <div aria-label="start and reset buttons" className="flex gap-2">
        <button
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleStart}
        >
          {!isRunning ? "시작" : "정지"}
        </button>
        <button
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 bg-red-500 text-white px-4 py-2 rounded-md"
          disabled={isRunning}
          onClick={handleReset}
        >
          재설정
        </button>
      </div>
    </div>
  );
};

export default UseEffectEventPage;
