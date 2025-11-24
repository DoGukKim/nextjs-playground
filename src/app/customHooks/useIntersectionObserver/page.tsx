"use client";

import { useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

const UseIntersectionObserverPage = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  // 예제 1: 기본 사용법 - 요소가 보일 때 카운트 증가
  const {
    ref: basicRef,
    isIntersecting: isBasicVisible,
    entry: basicEntry,
  } = useIntersectionObserver<HTMLDivElement>({
    onChange: (entry) => {
      console.log("기본 예제: 요소가 보입니다!", entry);
      setVisibleCount((prev) => prev + 1);
    },
  });

  // 예제 2: 진행도 표시 - intersectionRatio 사용
  const { ref: progressRef, entry: progressEntry } =
    useIntersectionObserver<HTMLDivElement>({
      options: {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100),
      },
    });

  const progressPercentage = progressEntry
    ? Math.round(progressEntry.intersectionRatio * 100)
    : 0;

  // 예제 3: 애니메이션 - 교차 비율에 따른 스타일 변경
  const { ref: animationRef, entry: animationEntry } =
    useIntersectionObserver<HTMLDivElement>({
      options: {
        threshold: Array.from({ length: 20 }, (_, i) => i / 20),
      },
    });

  const opacity = animationEntry?.intersectionRatio ?? 0;
  const scale = 0.5 + (animationEntry?.intersectionRatio ?? 0) * 0.5;

  // 예제 4: triggerOnce - 한 번만 트리거
  const [hasTriggered, setHasTriggered] = useState(false);
  const {
    ref: triggerOnceRef,
    isIntersecting: isTriggered,
    entry: triggerEntry,
  } = useIntersectionObserver<HTMLDivElement>({
    options: {
      triggerOnce: true,
    },
    onChange: (entry) => {
      console.log("한 번만 실행됩니다!", entry);
      setHasTriggered(true);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            useIntersectionObserver 예제
          </h1>
          <p className="text-gray-600">
            다양한 사용 사례를 확인해보세요. 아래로 스크롤하세요.
          </p>
        </header>

        {/* 예제 1: 기본 사용법 */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">예제 1: 기본 사용법</h2>
          <div
            ref={basicRef}
            className={`p-6 rounded-lg transition-colors duration-300 ${
              isBasicVisible
                ? "bg-green-100 border-2 border-green-500"
                : "bg-gray-100 border-2 border-gray-300"
            }`}
          >
            <p className="text-lg font-medium mb-2">
              상태: {isBasicVisible ? "✅ 보임" : "❌ 안 보임"}
            </p>
            <p className="text-sm text-gray-600">
              보인 횟수: <span className="font-bold">{visibleCount}</span>
            </p>
            {basicEntry && (
              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>교차 비율: {basicEntry.intersectionRatio.toFixed(2)}</p>
                <p>
                  위치: ({basicEntry.boundingClientRect.top.toFixed(0)},{" "}
                  {basicEntry.boundingClientRect.left.toFixed(0)})
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 예제 2: 진행도 표시 */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">예제 2: 진행도 표시</h2>
          <div
            ref={progressRef}
            className="p-6 rounded-lg bg-blue-50 border-2 border-blue-200"
          >
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  보이는 정도
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            {progressEntry && (
              <p className="text-xs text-gray-500">
                교차 비율: {progressEntry.intersectionRatio.toFixed(3)}
              </p>
            )}
          </div>
        </section>

        {/* 예제 3: 애니메이션 */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">예제 3: 애니메이션</h2>
          <div
            ref={animationRef}
            className="p-8 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 text-white text-center"
            style={{
              opacity,
              transform: `scale(${scale})`,
              transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
            }}
          >
            <p className="text-xl font-bold mb-2">페이드 인 & 스케일</p>
            <p className="text-sm opacity-90">
              스크롤하면 투명도와 크기가 변경됩니다
            </p>
            {animationEntry && (
              <p className="text-xs mt-4 opacity-75">
                교차 비율: {(animationEntry.intersectionRatio * 100).toFixed(1)}
                %
              </p>
            )}
          </div>
        </section>

        {/* 예제 4: triggerOnce */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            예제 4: triggerOnce (한 번만 실행)
          </h2>
          <div
            ref={triggerOnceRef}
            className={`p-6 rounded-lg transition-all duration-300 ${
              hasTriggered || isTriggered
                ? "bg-yellow-100 border-2 border-yellow-500"
                : "bg-gray-100 border-2 border-gray-300"
            }`}
          >
            <p className="text-lg font-medium mb-2">
              {hasTriggered || isTriggered
                ? "✅ 이미 트리거됨 (한 번만 실행)"
                : "⏳ 아직 트리거되지 않음"}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              이 요소가 처음 보일 때만 onChange가 실행됩니다.
              <br />
              콘솔을 확인해보세요!
            </p>
            {triggerEntry && (
              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>교차 비율: {triggerEntry.intersectionRatio.toFixed(2)}</p>
                <p>트리거 시간: {triggerEntry.time.toFixed(0)}ms</p>
              </div>
            )}
          </div>
        </section>

        {/* 스크롤 공간 */}
        <div className="h-screen flex items-center justify-center bg-gray-200 rounded-lg">
          <p className="text-gray-500 text-lg">더 많은 스크롤 공간</p>
        </div>

        {/* 하단 안내 */}
        <footer className="text-center py-8 text-gray-500 text-sm">
          <p>모든 예제를 확인하려면 위로 스크롤하세요</p>
        </footer>
      </div>
    </div>
  );
};

export default UseIntersectionObserverPage;
