"use client";
import { RefObject, useEffect, useEffectEvent } from "react";

export function useEventListener<E extends keyof WindowEventMap>(
  eventName: E,
  handler: (event: WindowEventMap[E]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<E extends keyof DocumentEventMap>(
  eventName: E,
  handler: (event: DocumentEventMap[E]) => void,
  element: RefObject<Document> | Document | null,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<E extends keyof MediaQueryListEventMap>(
  eventName: E,
  handler: (event: MediaQueryListEventMap[E]) => void,
  element: RefObject<MediaQueryList> | MediaQueryList | null,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<E extends keyof HTMLElementEventMap>(
  eventName: E,
  handler: (event: HTMLElementEventMap[E]) => void,
  element: RefObject<HTMLElement> | HTMLElement | null,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<
  E extends keyof SVGElementEventMap,
  T extends SVGElement = SVGElement
>(
  eventName: E,
  handler: (event: SVGElementEventMap[E]) => void,
  element: RefObject<T | null> | T | null,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element?: RefObject<EventTarget | null> | EventTarget | null | undefined,
  options?: boolean | AddEventListenerOptions
) {
  const handleEvent = useEffectEvent((e: Event) => handler(e));
  useEffect(() => {
    if (typeof window === "undefined") return;

    const targetElement =
      element === undefined
        ? window
        : element && "current" in element
        ? element.current
        : element;

    if (!targetElement) return;

    targetElement.addEventListener(eventName, handleEvent, options);

    return () =>
      targetElement.removeEventListener(eventName, handleEvent, options);
  }, [eventName, element, options]);
}
