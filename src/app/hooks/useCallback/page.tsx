"use client";

import { memo, useCallback, useEffect, useState } from "react";

const Panel = memo(({ callbackFn }: { callbackFn: () => void }) => {
  console.log("Panel 렌더링되었습니다.");

  useEffect(() => {
    callbackFn();
  }, [callbackFn]);

  return (
    <div>
      <p>Panel</p>
    </div>
  );
});

Panel.displayName = "Panel";

const UseCallbackPage = () => {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  // toggle 변경시에만 callbackFn이 생성됩니다.
  const callbackFn = useCallback(() => {
    console.log("callbackFn 호출되었습니다", toggle);
  }, [toggle]);

  return (
    <div>
      <p>{count}</p>
      <div className="flex flex-col gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Increment
        </button>
        <p>toggle 변경시에만 callbackFn이 호출됩니다. 콘솔을 확인해 주세요!</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => setToggle(!toggle)}
        >
          토글링: {toggle ? "true" : "false"}
        </button>
      </div>

      <Panel callbackFn={callbackFn} />
    </div>
  );
};

export default UseCallbackPage;
