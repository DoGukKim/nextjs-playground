// renderHook: React 훅을 테스트 환경에서 실행해주는 함수
import { renderHook } from "@testing-library/react";
// describe: 테스트들을 그룹으로 묶는 함수 (폴더 같은 것)
// it: 개별 테스트 케이스를 정의 (test와 동일)
// expect: "이 값이 ~해야 한다"라고 검증하는 함수
// vi: Vitest의 유틸리티 (mock, spy 등)
// beforeEach: 각 테스트 실행 전에 먼저 실행되는 함수
import { describe, it, expect, vi, beforeEach } from "vitest";
import useEventListener from "./useEventListener";

// "useEventListener"라는 이름의 테스트 그룹을 만듦
// 터미널에서 테스트 결과 볼 때 이 이름으로 표시됨
describe("useEventListener", () => {
  // "각 테스트(it) 실행 전마다" 이 코드가 먼저 실행됨
  beforeEach(() => {
    // 이전 테스트에서 만든 mock 데이터를 초기화
    // 테스트끼리 서로 영향 주지 않도록!
    vi.clearAllMocks();
  });

  it("window에 이벤트 리스너를 등록해야 한다", () => {
    // vi.fn()은 "가짜 함수"를 만듦
    // 이 함수가 호출됐는지, 몇 번 호출됐는지 추적 가능
    const handler = vi.fn();

    // window.addEventListener를 "감시(spy)"함
    // 진짜 함수는 그대로 실행되면서, 호출 기록을 추적
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");

    // 우리 훅을 실행!
    // 일반 React 컴포넌트처럼 렌더링하는 게 아니라,
    // 훅만 독립적으로 실행해주는 특별한 함수
    renderHook(() => useEventListener("resize", handler));

    // "addEventListener가 이 인자들로 호출됐어야 한다"
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize", // 첫 번째 인자가 "resize"인지
      expect.any(Function) // 두 번째 인자가 "어떤 함수"인지
    );
  });

  it("이벤트 발생 시 handler가 호출되어야 한다", () => {
    // 가짜 함수 생성
    const handler = vi.fn();

    // 훅 실행 → 이제 resize 이벤트를 듣고 있음
    renderHook(() => useEventListener("resize", handler));

    // resize 이벤트를 "직접 발생"시킴!
    // new Event("resize")로 이벤트 객체를 만들고,
    // dispatchEvent로 발생시킴
    window.dispatchEvent(new Event("resize"));

    // handler가 "정확히 1번" 호출됐는지 확인
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("언마운트 시 이벤트 리스너를 제거해야 한다", () => {
    const handler = vi.fn();

    // 이번엔 removeEventListener를 감시
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    // renderHook은 여러 유틸리티를 반환함
    // unmount는 "컴포넌트 언마운트"를 시뮬레이션하는 함수
    const { unmount } = renderHook(() => useEventListener("resize", handler));

    // 훅이 사용된 컴포넌트가 사라지는 상황을 재현
    // useEffect의 cleanup 함수가 실행됨
    unmount();

    // removeEventListener가 호출됐는지 확인
    // → 메모리 누수 방지 검증!
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });

  it("특정 element에 이벤트 리스너를 등록할 수 있어야 한다", () => {
    const handler = vi.fn();

    // 테스트용 가상 DOM 요소 생성
    // happy-dom이 document.createElement를 제공
    const div = document.createElement("div");

    // 이 div의 addEventListener를 감시
    const addEventListenerSpy = vi.spyOn(div, "addEventListener");

    // 세 번째 인자로 div를 전달
    // window 대신 이 div에 리스너가 등록되어야 함
    renderHook(() => useEventListener("click", handler, div));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    );

    // div에서 click 이벤트 발생
    div.dispatchEvent(new Event("click"));

    // handler가 호출됐는지 확인
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("element가 null이면 이벤트 리스너를 등록하지 않아야 한다", () => {
    const handler = vi.fn();
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");

    // element에 null을 명시적으로 전달
    // 예: ref.current가 아직 없는 상황
    renderHook(() => useEventListener("resize", handler, null));

    // .not은 부정!
    // "addEventListener가 호출되지 않았어야 한다"
    // null일 땐 아무것도 등록하면 안 됨
    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  it("handler가 변경되어도 최신 handler가 호출되어야 한다", () => {
    // 두 개의 다른 handler 준비
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const { rerender } = renderHook(
      // props를 받아서 훅에 전달하는 형태
      ({ handler }) => useEventListener("resize", handler),
      // 처음에는 handler1으로 시작
      { initialProps: { handler: handler1 } }
    );

    window.dispatchEvent(new Event("resize"));
    // 첫 번째 handler가 호출됨
    expect(handler1).toHaveBeenCalledTimes(1);

    // props를 변경해서 "리렌더링"
    // 이제 handler2가 전달됨
    rerender({ handler: handler2 });

    window.dispatchEvent(new Event("resize"));
    // 두 번째 handler가 호출되어야 함!
    // useEffectEvent 덕분에 최신 handler가 호출됨
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});
