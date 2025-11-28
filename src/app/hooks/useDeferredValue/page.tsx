"use client";

import { useState, useDeferredValue } from "react";
import Child from "./Child";

const UseDeferredValuePage = () => {
  const [query, setQuery] = useState("1");
  const deferredQuery = useDeferredValue(query);
  const isPending = query !== deferredQuery;

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          페이지 번호 입력 (1-100)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={query}
            min={1}
            max={100}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-32"
            placeholder="페이지 번호"
          />
          <div className="text-sm text-gray-600">
            현재 입력값: <span className="font-semibold">{query}</span>
          </div>
        </div>
      </div>

      <Child query={deferredQuery} isPending={isPending} />
    </div>
  );
};

export default UseDeferredValuePage;
