"use client";
import { useEffect, useEffectEvent } from "react";

const useEventListener = <E extends keyof WindowEventMap>(
  event: E,
  handler: (event: WindowEventMap[E]) => void,
  element?: HTMLElement | Window | Document | null
) => {
  const handleEvent = useEffectEvent((event: WindowEventMap[E]) =>
    handler(event)
  );

  useEffect(() => {
    const targetElement =
      element === undefined
        ? typeof window !== "undefined"
          ? window
          : null
        : element;

    if (!targetElement) return;

    targetElement.addEventListener(event, handleEvent as EventListener);
    return () => {
      targetElement.removeEventListener(event, handleEvent as EventListener);
    };
  }, [event, element]);
};

export default useEventListener;
