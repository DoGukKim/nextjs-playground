"use client";

import { useState } from "react";

const UseStatePage = () => {
  const [count, setCount] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-10 space-y-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold">useState 예제</h1>

      <section className="p-6 border rounded-xl shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">🔢 카운터</h2>
        <div className="flex items-center justify-between">
          <span className="text-4xl font-mono font-bold">{count}</span>
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            증가 (+1)
          </button>
        </div>
      </section>

      <section className="p-6 border rounded-xl shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">📝 사용자 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="이름을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="이메일을 입력하세요"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded text-sm">
          <p className="font-semibold text-gray-500 mb-2">실시간 상태 확인:</p>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(form, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default UseStatePage;
