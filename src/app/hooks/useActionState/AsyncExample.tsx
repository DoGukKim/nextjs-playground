"use client";

import { useActionState } from "react";
import { incrementCounterAction } from "./actions";

export default function AsyncExample() {
  // 초기값: 0
  // 액션: incrementCounterAction (숫자 더하기)
  const [count, runAction, isPending] = useActionState(
    incrementCounterAction,
    0
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        2. 일반 비동기 예제 (Counter)
      </h2>

      <div className="flex flex-col items-center space-y-6">
        <div className="text-5xl font-black text-gray-900 transition-all">
          {count}
        </div>

        <div className="flex gap-3 w-full">
          {/* 폼 태그 없이 onClick에서 runAction을 직접 호출 */}
          <button
            onClick={() => runAction(1)} // 1만큼 증가
            disabled={isPending}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {isPending ? "..." : "+1 증가"}
          </button>

          <button
            onClick={() => runAction(5)} // 5만큼 증가 (같은 액션 재사용)
            disabled={isPending}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            {isPending ? "..." : "+5 점프"}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          * 버튼을 누르면 서버 딜레이(0.5초) 후 값이 반영됩니다.
          <br />
          별도의 로딩 state 관리 없이 isPending만으로 처리되었습니다.
        </p>
      </div>
    </div>
  );
}
