"use client";

import { useEffect, useEffectEvent, useState } from "react";

const UseEffectPage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useEffectEvent((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  });

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">
        useEffect 예제 - 마우스 움직임 감지
      </h1>
      <div>
        <p className="text-gray-600 mb-2">x: {position.x}</p>
        <p className="text-gray-600 mb-2">y: {position.y}</p>
      </div>
    </div>
  );
};

export default UseEffectPage;
