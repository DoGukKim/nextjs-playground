"use client";
import { memo, useCallback, useState } from "react";

const ExpensiveChild = memo(
  ({ onClick, label }: { onClick: () => void; label: string }) => {
    console.log(`🔄 ${label} 렌더링됨`);
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        {label}
      </button>
    );
  }
);

ExpensiveChild.displayName = "ExpensiveChild";

const UseCallbackPage = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ❌ useCallback 없음: 매 렌더링마다 새로운 함수 생성
  // -> ExpensiveChild도 매번 리렌더링됨
  const handleClickWithout = () => {
    console.log("Without useCallback clicked");
  };

  // ✅ useCallback 사용: 의존성이 변하지 않으면 같은 함수 유지
  // -> ExpensiveChild가 불필요하게 리렌더링되지 않음
  const handleClickWith = useCallback(() => {
    console.log("With useCallback clicked");
  }, []); // 빈 배열: 함수가 한 번만 생성됨

  // count 값을 사용하는 함수 (의존성에 count 필요)
  const handleWithCount = useCallback(() => {
    console.log("Current count:", count);
  }, [count]); // count가 바뀔 때만 함수 재생성

  return (
    <div className="p-10 space-y-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">useCallback 예제</h1>

      {/* 리렌더링 트리거 */}
      <section className="p-6 border rounded-xl shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">🔄 리렌더링 트리거</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-24">Count: {count}</span>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              증가
            </button>
          </div>
          <div>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="텍스트 입력 (리렌더링 발생)"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          위 값을 바꾸면 부모 컴포넌트가 리렌더링됩니다. 콘솔을 확인해보세요!
        </p>
      </section>

      {/* 비교 섹션 */}
      <section className="p-6 border rounded-xl shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">🆚 비교</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded">
            <span className="text-sm text-red-800">useCallback 미사용</span>
            <ExpensiveChild onClick={handleClickWithout} label="Without" />
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded">
            <span className="text-sm text-green-800">
              useCallback 사용 (의존성 [])
            </span>
            <ExpensiveChild onClick={handleClickWith} label="With" />
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
            <span className="text-sm text-yellow-800">
              useCallback + [count] 의존성
            </span>
            <ExpensiveChild onClick={handleWithCount} label="With Count" />
          </div>
        </div>
      </section>

      {/* 설명 */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm">
        <h3 className="font-bold mb-2">💡 콘솔 로그 확인 포인트</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>
            <strong>텍스트 입력 시:</strong> &quot;Without&quot;만 리렌더링
            (With는 함수 참조 유지)
          </li>
          <li>
            <strong>Count 증가 시:</strong> &quot;Without&quot;과 &quot;With
            Count&quot;가 리렌더링 (With Count는 count 의존)
          </li>
          <li>
            <strong>With 버튼:</strong> 절대 리렌더링되지 않음 (의존성 [])
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UseCallbackPage;
