"use client";

import { useState, useMemo } from "react";

const UseMemoPage = () => {
  const [count, setCount] = useState(0);

  const heavyList = useMemo(() => {
    console.log("heavyList가 생성되었습니다.");
    return Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
  }, []);

  // 비교용: useMemo 없이 매번 생성되는 경우
  // const heavyListWithoutMemo = Array.from({ length: 10000 }, (_, i) => {
  //   console.log("❌ useMemo 없이 매번 생성됨");
  //   return `Item ${i + 1}`;
  // });

  return (
    <div className="p-10 space-y-8 max-w-xl mx-auto">
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>

      <div>
        <p>
          count가 변경되어도 heavyList는 재생성되지 않습니다 (의존성 배열이
          비어있음). 콘솔을 확인해 주세요!
        </p>
        <ul>
          {heavyList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UseMemoPage;
