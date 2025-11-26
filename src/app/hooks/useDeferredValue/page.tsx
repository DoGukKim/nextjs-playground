"use client";

import { useState, useDeferredValue } from "react";
import HeavyList from "./HeavyList";

const UseDeferredValuePage = () => {
  const [query, setQuery] = useState("");

  // 1. query의 지연된 버전을 생성
  // React는 급한 업데이트(입력창)를 먼저 처리하고, 이건 나중에 처리함
  const deferredQuery = useDeferredValue(query);

  // 로딩 상태 감지: 원본 값과 지연된 값이 다르면 "업데이트 대기 중"
  const isStale = query !== deferredQuery;

  return (
    <div className="p-10 space-y-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">useDeferredValue 예제</h1>

      <section className="p-6 border rounded-xl shadow-sm bg-white space-y-6">
        <div className="space-y-2">
          <label className="font-semibold block">
            빠른 검색어 입력 (Lag 없음)
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="빠르게 타이핑해보세요..."
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <p className="text-xs text-gray-500">
            입력값(query)은 즉시 업데이트되지만, 리스트는 지연된
            값(deferredQuery)을 씁니다.
          </p>
        </div>

        <div className="relative">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            검색 결과
            {isStale && (
              <span className="text-blue-500 text-sm animate-pulse font-normal">
                🔄 필터링 중...
              </span>
            )}
          </h3>

          {/* 리스트에는 지연된 값을 전달 -> 입력 버벅임 방지 */}
          <div
            style={{
              opacity: isStale ? 0.5 : 1,
              transition: "opacity 0.2s",
            }}
          >
            <HeavyList query={deferredQuery} />
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded text-sm border border-yellow-100">
          <h4 className="font-bold mb-2 text-yellow-800">💡 작동 원리</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              <strong>Immediate:</strong> <code>setQuery</code>로 입력창이 즉시
              갱신됨 (반응성 좋음)
            </li>
            <li>
              <strong>Deferred:</strong> <code>deferredQuery</code>가 바뀌면{" "}
              <code>HeavyList</code>가 리렌더링됨 (살짝 늦음)
            </li>
            <li>
              사용자가 계속 타이핑하면, React는 중간 리스트 렌더링을 건너뛰고
              최신 결과만 보여줌
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default UseDeferredValuePage;
