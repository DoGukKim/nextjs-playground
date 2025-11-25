"use client";

import { useState, useMemo } from "react";

// 무거운 계산을 시뮬레이션하는 함수
const heavyCalculation = (num: number): number => {
  console.log("🔥 무거운 계산 실행중...");
  const start = performance.now();

  // 인위적으로 계산을 무겁게 만듦 (실제로는 복잡한 로직이 들어감)
  let result = 0;
  for (let i = 0; i < 100_000_000; i++) {
    result += num;
  }

  const end = performance.now();
  console.log(`⏱️ 계산 완료: ${(end - start).toFixed(2)}ms`);
  return result;
};

const UseMemoPage = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  // ❌ useMemo 없음: text가 바뀔 때도 무거운 계산이 다시 실행됨
  // const calculatedValue = heavyCalculation(count);

  // ✅ useMemo 사용: count가 바뀔 때만 계산 실행
  const calculatedValue = useMemo(() => {
    return heavyCalculation(count);
  }, [count]); // count가 변할 때만 재계산

  // 객체 참조 동일성 예제
  const userInfo = useMemo(() => {
    return {
      name: "홍길동",
      score: count * 10,
    };
  }, [count]); // count가 같으면 같은 객체 참조 유지

  return (
    <div className="p-10 space-y-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">useMemo 예제</h1>

      {/* 계산 결과 섹션 */}
      <section className="p-6 border rounded-xl shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">🧮 무거운 계산 캐싱</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <span className="font-medium">Count 값:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                -
              </button>
              <span className="w-12 text-center text-2xl font-bold">
                {count}
              </span>
              <button
                onClick={() => setCount((c) => c + 1)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">계산 결과 (캐싱됨):</p>
            <p className="text-2xl font-mono font-bold text-green-700">
              {calculatedValue.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* 리렌더링 테스트 */}
      <section className="p-6 border rounded-xl shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">🔄 리렌더링 테스트</h2>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="입력해도 계산이 다시 실행되지 않음!"
          className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <p className="text-xs text-gray-500 mt-2">
          텍스트를 입력하면 리렌더링이 일어나지만, count가 안 바뀌었으므로
          무거운 계산은 실행되지 않습니다. (콘솔 확인)
        </p>
      </section>

      {/* 객체 참조 예제 */}
      <section className="p-6 border rounded-xl shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">📦 객체 참조 동일성</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <pre className="text-sm">{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          useMemo로 감싸면 count가 같을 때 같은 객체 참조가 유지됩니다. 자식
          컴포넌트에 props로 넘길 때 불필요한 리렌더링을 방지할 수 있습니다.
        </p>
      </section>

      {/* 설명 */}
      <div className="bg-yellow-50 p-4 rounded-lg text-sm">
        <h3 className="font-bold mb-2">💡 핵심 포인트</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>
            <strong>Count 변경:</strong> 무거운 계산이 다시 실행됨 (의존성 변경)
          </li>
          <li>
            <strong>Text 입력:</strong> 리렌더링은 되지만 계산은 캐시된 값 사용
          </li>
          <li>
            <strong>객체/배열:</strong> useMemo 없이 매번 새 객체가 생성되면
            자식이 불필요하게 리렌더링됨
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UseMemoPage;
