import { RefObject, useRef } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useEventListener } from "./useEventListener";

describe("useEventListener", () => {
  // window 객체의 addEventListener와 removeEventListener를 감시하기 위한 스파이 변수
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  // 각 테스트 실행 전에 호출되는 함수
  beforeEach(() => {
    // window.addEventListener를 감시하여 호출 여부와 인자를 추적
    addEventListenerSpy = vi.spyOn(window, "addEventListener");
    // window.removeEventListener를 감시하여 호출 여부와 인자를 추적
    removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
  });

  // 각 테스트 실행 후에 호출되는 함수
  afterEach(() => {
    // 스파이를 원래 상태로 복원하여 다른 테스트에 영향을 주지 않도록 함
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  // window 이벤트 관련 테스트 그룹
  describe("window 이벤트", () => {
    it("window에 이벤트 리스너를 등록해야 한다", () => {
      // vi.fn()은 모의 함수(mock function)를 생성 - 호출 여부와 인자를 추적할 수 있음
      const handler = vi.fn();

      // renderHook은 React 훅을 테스트 환경에서 실행할 수 있게 해줌
      // useEventListener 훅을 호출하여 click 이벤트 리스너를 등록
      renderHook(() => useEventListener("click", handler));

      // window.addEventListener가 정확한 인자로 호출되었는지 검증
      // 'click' 이벤트, 함수, undefined(옵션)가 전달되어야 함
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function), // 어떤 함수든 상관없음
        undefined
      );
    });

    it("window 이벤트가 발생하면 핸들러가 호출되어야 한다", () => {
      const handler = vi.fn();

      // useEventListener 훅으로 click 이벤트 리스너 등록
      renderHook(() => useEventListener("click", handler));

      // 가짜 클릭 이벤트 객체 생성
      const clickEvent = new MouseEvent("click");
      // window에서 클릭 이벤트 발생시킴
      window.dispatchEvent(clickEvent);

      // 핸들러가 정확히 1번 호출되었는지 검증
      expect(handler).toHaveBeenCalledTimes(1);
      // 핸들러가 생성한 이벤트 객체와 함께 호출되었는지 검증
      expect(handler).toHaveBeenCalledWith(clickEvent);
    });

    it("언마운트 시 이벤트 리스너를 제거해야 한다", () => {
      const handler = vi.fn();

      // renderHook의 반환값에서 unmount 함수를 구조분해 할당으로 추출
      const { unmount } = renderHook(() => useEventListener("click", handler));

      // 컴포넌트를 언마운트하여 cleanup 함수 실행
      unmount();

      // removeEventListener가 호출되어 이벤트 리스너가 제거되었는지 검증
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        undefined
      );
    });

    it("options를 전달할 수 있어야 한다", () => {
      const handler = vi.fn();
      // addEventListener의 옵션 객체 정의
      // capture: 캡처 단계에서 이벤트 처리, passive: 성능 최적화를 위한 옵션
      const options = { capture: true, passive: true };

      // scroll 이벤트 리스너를 options와 함께 등록
      renderHook(() => useEventListener("scroll", handler, undefined, options));

      // addEventListener가 options와 함께 호출되었는지 검증
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function),
        options
      );
    });
  });

  // HTML 엘리먼트 이벤트 관련 테스트 그룹
  describe("HTML 엘리먼트 이벤트", () => {
    it("RefObject를 통한 엘리먼트에 이벤트 리스너를 등록해야 한다", () => {
      const handler = vi.fn();
      // 실제 button DOM 엘리먼트 생성
      const element = document.createElement("button");
      // 생성한 엘리먼트의 addEventListener를 감시
      const elementSpy = vi.spyOn(element, "addEventListener");

      // renderHook을 사용하여 훅 실행
      renderHook(() => {
        // useRef로 엘리먼트에 대한 참조 생성
        const ref = useRef<HTMLButtonElement>(element);
        // ref 객체를 통해 이벤트 리스너 등록
        useEventListener("click", handler, ref);
        return ref;
      });

      // button 엘리먼트의 addEventListener가 호출되었는지 검증
      expect(elementSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        undefined
      );

      // 테스트 후 스파이 복원
      elementSpy.mockRestore();
    });

    it("직접 엘리먼트 참조로도 이벤트 리스너를 등록할 수 있어야 한다", () => {
      const handler = vi.fn();
      const element = document.createElement("div");
      const elementSpy = vi.spyOn(element, "addEventListener");

      // RefObject가 아닌 엘리먼트 자체를 직접 전달
      renderHook(() => useEventListener("mouseenter", handler, element));

      // 엘리먼트에 직접 addEventListener가 호출되었는지 검증
      expect(elementSpy).toHaveBeenCalledWith(
        "mouseenter",
        expect.any(Function),
        undefined
      );

      elementSpy.mockRestore();
    });

    it("엘리먼트 이벤트가 발생하면 핸들러가 호출되어야 한다", () => {
      const handler = vi.fn();
      const element = document.createElement("button");

      renderHook(() => {
        const ref = useRef<HTMLButtonElement>(element);
        useEventListener("click", handler, ref);
        return ref;
      });

      // button 엘리먼트에서 클릭 이벤트 발생
      const clickEvent = new MouseEvent("click");
      element.dispatchEvent(clickEvent);

      // 핸들러가 1번 호출되었고, 이벤트 객체와 함께 호출되었는지 검증
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(clickEvent);
    });

    it("element.current가 null이면 이벤트 리스너를 등록하지 않아야 한다", () => {
      const handler = vi.fn();

      renderHook(() => {
        // current가 null인 ref 생성 (타입 단언으로 오버로드 해결)
        const ref = useRef<HTMLButtonElement>(null);
        useEventListener("click", handler, ref as RefObject<HTMLButtonElement>);
        return ref;
      });

      // ref.current가 null이므로 addEventListener가 호출되지 않아야 함
      expect(addEventListenerSpy).not.toHaveBeenCalled();
    });
  });

  // 이벤트 핸들러 업데이트 관련 테스트 그룹
  describe("이벤트 핸들러 업데이트", () => {
    it("핸들러가 변경되어도 이벤트 리스너를 다시 등록하지 않아야 한다", () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      // renderHook의 두 번째 인자로 props를 받는 콜백과 초기 props 전달
      const { rerender } = renderHook(
        ({ handler }) => useEventListener("click", handler),
        {
          initialProps: { handler: handler1 }, // 초기 props
        }
      );

      // 첫 렌더링에서 addEventListener가 1번 호출됨
      expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

      // 다른 핸들러로 리렌더링
      rerender({ handler: handler2 });

      // useEffectEvent 덕분에 핸들러 변경 시에도 리스너가 재등록되지 않음
      // addEventListener는 여전히 1번만 호출되어야 함
      expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
      // removeEventListener도 호출되지 않아야 함
      expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });

    it("최신 핸들러가 호출되어야 한다 (useEffectEvent 동작)", () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      const { rerender } = renderHook(
        ({ handler }) => useEventListener("click", handler),
        {
          initialProps: { handler: handler1 },
        }
      );

      // handler2로 리렌더링
      rerender({ handler: handler2 });

      // 클릭 이벤트 발생
      const clickEvent = new MouseEvent("click");
      window.dispatchEvent(clickEvent);

      // useEffectEvent 덕분에 이전 핸들러는 호출되지 않음
      expect(handler1).not.toHaveBeenCalled();
      // 최신 핸들러(handler2)만 호출됨
      expect(handler2).toHaveBeenCalledTimes(1);
    });
  });

  // 이벤트 이름 및 옵션 변경 관련 테스트 그룹
  describe("이벤트 이름 및 옵션 변경", () => {
    it("이벤트 이름이 변경되면 리스너를 재등록해야 한다", () => {
      const handler = vi.fn();

      // eventName을 props로 받아 동적으로 변경 가능하게 함
      const { rerender } = renderHook(
        ({ eventName }: { eventName: string }) =>
          useEventListener(eventName as keyof WindowEventMap, handler),
        {
          initialProps: { eventName: "click" },
        }
      );

      // 첫 렌더링에서 'click' 이벤트로 addEventListener 호출
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        undefined
      );

      // 'keydown' 이벤트로 리렌더링
      rerender({ eventName: "keydown" });

      // 이전 'click' 리스너 제거
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        undefined
      );
      // 새로운 'keydown' 리스너 등록
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
        undefined
      );
    });

    it("options가 변경되면 리스너를 재등록해야 한다", () => {
      const handler = vi.fn();
      const options1 = { capture: true };
      const options2 = { capture: false };

      // options를 props로 받아 동적으로 변경 가능하게 함
      const { rerender } = renderHook(
        ({ options }) => useEventListener("click", handler, undefined, options),
        {
          initialProps: { options: options1 },
        }
      );

      // 첫 렌더링에서 options1으로 addEventListener 호출
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        options1
      );

      // options2로 리렌더링
      rerender({ options: options2 });

      // 이전 options1으로 등록된 리스너 제거
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        options1
      );
      // 새로운 options2로 리스너 등록
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        options2
      );
    });
  });

  // 엘리먼트 참조 변경 관련 테스트 그룹
  describe("엘리먼트 참조 변경", () => {
    it("element가 변경되면 리스너를 재등록해야 한다", () => {
      const handler = vi.fn();
      const element1 = document.createElement("button");
      const element2 = document.createElement("div");
      // 각 엘리먼트의 addEventListener와 removeEventListener를 감시
      const element1Spy = vi.spyOn(element1, "addEventListener");
      const element2Spy = vi.spyOn(element2, "addEventListener");
      const element1RemoveSpy = vi.spyOn(element1, "removeEventListener");

      // element를 props로 받아 동적으로 변경 가능하게 함
      const { rerender } = renderHook(
        ({ element }: { element: HTMLElement }) =>
          useEventListener("click", handler, element),
        {
          initialProps: { element: element1 as HTMLElement },
        }
      );

      // 첫 렌더링에서 element1에 addEventListener 호출
      expect(element1Spy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        undefined
      );

      // element2로 리렌더링
      rerender({ element: element2 as HTMLElement });

      // element1의 리스너 제거
      expect(element1RemoveSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        undefined
      );
      // element2에 새로운 리스너 등록
      expect(element2Spy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        undefined
      );

      // 스파이 복원
      element1Spy.mockRestore();
      element2Spy.mockRestore();
      element1RemoveSpy.mockRestore();
    });
  });

  // MediaQueryList 관련 테스트 그룹
  describe("MediaQueryList", () => {
    it("MediaQueryList에 이벤트 리스너를 등록할 수 있어야 한다", () => {
      const handler = vi.fn();
      // window.matchMedia로 미디어 쿼리 객체 생성 (반응형 디자인에 사용)
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      // MediaQueryList 객체의 addEventListener를 감시
      const mediaQuerySpy = vi.spyOn(mediaQuery, "addEventListener");

      // MediaQueryList의 'change' 이벤트 리스너 등록
      renderHook(() => useEventListener("change", handler, mediaQuery));

      // MediaQueryList에 addEventListener가 호출되었는지 검증
      expect(mediaQuerySpy).toHaveBeenCalledWith(
        "change",
        expect.any(Function),
        undefined
      );

      mediaQuerySpy.mockRestore();
    });
  });

  // SVG 엘리먼트 관련 테스트 그룹
  describe("SVG 엘리먼트", () => {
    it("SVG 엘리먼트에 이벤트 리스너를 등록할 수 있어야 한다", () => {
      const handler = vi.fn();
      // SVG 네임스페이스를 사용하여 SVG 엘리먼트 생성
      const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      // SVG 엘리먼트의 addEventListener를 감시
      const svgSpy = vi.spyOn(svgElement, "addEventListener");

      // SVG 엘리먼트에 이벤트 리스너 등록
      renderHook(() => useEventListener("click", handler, svgElement));

      // SVG 엘리먼트에 addEventListener가 호출되었는지 검증
      expect(svgSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        undefined
      );

      svgSpy.mockRestore();
    });
  });
});
