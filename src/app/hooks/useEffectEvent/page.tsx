"use client";

import { useEffect, useEffectEvent, useState } from "react";

const useEffectEventPage = () => {
  const [userId, setUserId] = useState("user-1");
  const [logLevel, setLogLevel] = useState<"info" | "error">("info");
  const [activityCount, setActivityCount] = useState(0);

  // useEffectEvent 사용: logLevel이 바뀌어도 리스너 재등록 안 함
  const logActivity = useEffectEvent(() => {
    setActivityCount((prev) => prev + 1);
    console.log(`[${logLevel}] User ${userId} activity detected`);
  });

  useEffect(() => {
    const handleClick = () => {
      logActivity();
    };

    console.log("useEffectEvent 실행");

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [userId]);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">useEffectEvent 로깅 예제</h1>

      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">사용자 활동 로깅</h2>
          <p className="mb-2">활동 감지 횟수: {activityCount}</p>
          <p className="text-sm text-gray-600 mb-4">
            화면 아무 곳이나 클릭해보세요. 콘솔에 로그가 출력됩니다.
          </p>

          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium mb-1">User ID:</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Log Level:
              </label>
              <select
                value={logLevel}
                onChange={(e) =>
                  setLogLevel(e.target.value as "info" | "error")
                }
                className="px-3 py-2 border rounded"
              >
                <option value="info">info</option>
                <option value="error">error</option>
              </select>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
            <p className="font-semibold mb-1">💡 핵심 포인트:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>logLevel이 바뀌어도 이벤트 리스너는 재등록되지 않습니다</li>
              <li>하지만 로그에는 항상 최신 logLevel이 출력됩니다</li>
              <li>userId가 바뀌면 리스너가 재등록됩니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default useEffectEventPage;
