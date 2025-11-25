"use client";

import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";

export interface UseIntersectionObserverParams {
  options?: IntersectionObserverInit & { triggerOnce?: boolean };
  onChange?: (entry: IntersectionObserverEntry) => void;
}

export interface UseIntersectionObserverReturn<E> {
  ref: React.RefObject<E | null>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

const useIntersectionObserver = <E extends Element = Element>({
  options,
  onChange,
}: UseIntersectionObserverParams): UseIntersectionObserverReturn<E> => {
  const ref = useRef<E>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const { root, rootMargin, threshold, triggerOnce } = options ?? {};

  const observerOptions = useMemo<IntersectionObserverInit>(
    () => ({
      root,
      rootMargin,
      threshold,
    }),
    [root, rootMargin, threshold]
  );

  const onChangeEvent = useEffectEvent((entry: IntersectionObserverEntry) => {
    if (typeof onChange === "function") onChange(entry);
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.length === 0) return;

      const entry = entries[0];

      setEntry(entry);

      if (entry.isIntersecting) {
        setIsIntersecting(true);
        onChangeEvent(entry);

        if (triggerOnce) {
          observer.disconnect();
        }
      } else {
        setIsIntersecting(false);
      }
    }, observerOptions);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observerOptions, triggerOnce]);

  return {
    ref,
    isIntersecting,
    entry,
  };
};

export default useIntersectionObserver;
