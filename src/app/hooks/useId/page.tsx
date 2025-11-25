"use client";

import Input from "./Input";

const UseIdPage = () => {
  return (
    <div className="p-10 space-y-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold">useId 예제</h1>
      <section className="p-6 border rounded-xl shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-6">📍 ID 조합 패턴</h2>

        <Input label="이메일" name="email" />
        <Input label="비밀번호" name="password" />
      </section>
    </div>
  );
};

export default UseIdPage;
