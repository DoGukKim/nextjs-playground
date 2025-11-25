"use client";

import { useRef, useState } from "react";

const UseRefPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(0);

  const [renderCount, setRenderCount] = useState(0);
  const [savedRefValue, setSavedRefValue] = useState(0);

  const handleFocus = () => {
    inputRef.current?.focus();
    if (inputRef.current) {
      inputRef.current.style.backgroundColor = "#f0f9ff";
    }
  };

  const incrementRef = () => {
    countRef.current += 1;
    console.log("Ref Current:", countRef.current);
  };

  const incrementState = () => {
    setRenderCount((prev) => prev + 1);
  };

  const syncRefValue = () => {
    setSavedRefValue(countRef.current);
  };

  return (
    <div className="p-10 space-y-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold">useRef 예제</h1>

      <section className="p-6 border rounded-xl shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">📍 DOM 접근 (Focus)</h2>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="여기에 포커스!"
            className="border px-3 py-2 rounded w-full"
          />
          <button
            onClick={handleFocus}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
          >
            포커스 이동
          </button>
        </div>
      </section>

      <section className="p-6 border rounded-xl shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">💾 변수 저장 (vs State)</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span>State (리렌더링 O):</span>
            <span className="font-bold text-blue-600 text-xl">
              {renderCount}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span>Ref 값 (수동 갱신):</span>
            <span className="font-bold text-green-600 text-xl">
              {savedRefValue}
            </span>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={incrementRef}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Ref 증가 (내부 값만)
            </button>
            <button
              onClick={syncRefValue}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              화면에 반영
            </button>
          </div>

          <button
            onClick={incrementState}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            State 증가 (리렌더링)
          </button>

          <p className="text-xs text-gray-500 mt-2">
            1. &apos;Ref 증가&apos;를 눌러도 숫자는 안 바뀝니다 (콘솔 확인).
            <br />
            2. &apos;화면에 반영&apos;을 눌러야 현재 Ref 값을 가져옵니다.
            <br />
            3. &apos;State 증가&apos;를 누르면 리렌더링되지만, Ref 표시용
            State는 갱신하지 않았으므로 그대로입니다. (더 명확한 분리)
          </p>
        </div>
      </section>
    </div>
  );
};

export default UseRefPage;
