"use client";

import { useRef } from "react";

const UncontrolledForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const rangeValueRef = useRef<HTMLSpanElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    console.log(formRef.current);
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    alert("제출되었습니다.");
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-slate-300"
          >
            사용자명 (text)
            <span className="ml-1 text-rose-400">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="홍길동"
            required
            minLength={2}
            maxLength={20}
            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <p className="text-xs text-slate-500">
            2~20자 사이로 입력하세요 (minLength, maxLength)
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="satisfaction"
            className="block text-sm font-medium text-slate-300"
          >
            만족도 (range): <span id="rangeValue">50</span>%
          </label>
          <span id="rangeValue" ref={rangeValueRef}>
            50
          </span>
          <input
            type="range"
            id="satisfaction"
            name="satisfaction"
            min={0}
            max={100}
            defaultValue={50}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-600 accent-emerald-500"
          />
          <p className="text-xs text-slate-500">
            슬라이더로 값을 선택할 수 있습니다
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="birthdate"
            className="block text-sm font-medium text-slate-300"
          >
            생년월일 (date)
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            max={new Date().toISOString().split("T")[0]}
            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <p className="text-xs text-slate-500">
            오늘 날짜까지만 선택 가능 (max 속성)
          </p>
        </div>

        <button
          type="submit"
          className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-700 active:scale-[0.98]"
        >
          제출
        </button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
