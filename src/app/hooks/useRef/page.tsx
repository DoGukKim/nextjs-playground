"use client";

import { useRef, useState } from "react";

const UseRefPage = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <p>useRef는 리렌더링을 발생시키지 않습니다.</p>
      <input
        type="text"
        ref={inputRef}
        className="border border-gray-300 rounded-md p-2"
      />

      <p>useState는 리렌더링을 발생시킵니다.</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      />
    </div>
  );
};

export default UseRefPage;
