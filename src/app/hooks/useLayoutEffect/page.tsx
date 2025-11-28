"use client";

import { useEffect, useLayoutEffect } from "react";

const UseLayoutEffectPage = () => {
  useEffect(() => {
    console.log("effect");
  }, []);

  useLayoutEffect(() => {
    console.log("layout effect");
  }, []);

  return (
    <div>
      <p>useLayoutEffect는 paint 전에 실행됩니다.</p>
      <p>useEffect는 paint 후에 실행됩니다.</p>
      <p>콘솔을 확인해 주세요!</p>
    </div>
  );
};

export default UseLayoutEffectPage;
