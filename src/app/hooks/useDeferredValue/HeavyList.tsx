import { memo, useMemo } from "react";

// 10,000개의 가짜 데이터 생성 (컴포넌트 외부에 생성하여 리렌더링 방지)
const dummyList = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

const HeavyList = memo(({ query }: { query: string }) => {
  // 무거운 필터링 작업 시뮬레이션
  const filteredItems = useMemo(() => {
    const iterations = 300;
    for (let i = 0; i < iterations; i++) {}

    return dummyList.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="h-64 overflow-auto border rounded p-2 bg-gray-50">
      {filteredItems.length === 0 ? (
        <p className="text-gray-500 p-2">결과 없음</p>
      ) : (
        filteredItems.map((item) => (
          <div key={item} className="p-1 hover:bg-gray-200 rounded">
            {item}
          </div>
        ))
      )}
    </div>
  );
});

HeavyList.displayName = "HeavyList";

export default HeavyList;
