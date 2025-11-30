"use client";
import { useSyncExternalStore } from "react";

// 온라인/오프라인 상태를 구독하는 함수
const subscribe = (callback: () => void) => {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
};

// 클라이언트의 현재 온라인 상태를 반환
const getSnapshot = () => {
  return navigator.onLine;
};

// 서버 사이드 렌더링 시 기본값 (항상 온라인으로 가정)
const getServerSnapshot = () => true;

const UseSyncExternalStorePage = () => {
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">useSyncExternalStore 예제</h1>
      <p className="mb-8">외부 스토어(브라우저 API)와 동기화</p>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">
          현재 상태:{" "}
          <span className={isOnline ? "text-green-600" : "text-red-600"}>
            {isOnline ? "온라인" : "오프라인"}
          </span>
        </h2>
        <p>
          {isOnline
            ? "인터넷에 연결되어 있습니다"
            : "인터넷 연결이 끊어졌습니다"}
        </p>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-2">테스트 방법:</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>개발자 도구 열기 (F12)</li>
          <li>Network 탭 선택</li>
          <li>Throttling을 &quot;Offline&quot;으로 변경</li>
          <li>다시 &quot;Online&quot;으로 변경</li>
        </ol>
      </div>

      <div className="border p-4">
        <p>
          <strong>useSyncExternalStore</strong>는 브라우저의 온라인/오프라인
          상태 같은 외부 데이터 소스를 React 컴포넌트와 안전하게 동기화합니다.
        </p>
      </div>
    </div>
  );
};

export default UseSyncExternalStorePage;
