"use client";

import { useImperativeHandle, useRef } from "react";

interface InputHandle {
  focus: () => void;
}

const Child = ({ ref }: { ref: React.RefObject<InputHandle | null> }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }),
    []
  );

  return (
    <div className="border p-2">
      <p>Child component</p>
      <input
        type="text"
        ref={inputRef}
        className="border border-gray-300 rounded-md p-2"
      />
    </div>
  );
};

const UseImperativeHandlePage = () => {
  const inputRef = useRef<InputHandle | null>(null);

  return (
    <div className="space-y-4 p-4">
      <p>
        useImperativeHandle는 부모 컴포넌트에서 자식 컴포넌트의 메서드를 사용할
        수 있게 해줍니다.
      </p>
      <Child ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus input</button>
    </div>
  );
};

export default UseImperativeHandlePage;
