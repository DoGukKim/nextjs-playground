"use client";

import { useState } from "react";

const NormalFormWithObject = () => {
  const [form, setForm] = useState({
    name2: "",
    age2: "20",
    sex2: "",
    agreement: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(form);
    alert("제출되었습니다.");
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">NormalFormWithObject</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="name2">이름</label>
        <input
          id="name2"
          type="text"
          name="name2"
          value={form.name2}
          onChange={handleInputChange}
          className="border border-slate-500"
        />

        <div>
          <label htmlFor="age2">나이</label>
          <select
            name="age2"
            id="age2"
            value={form.age2}
            onChange={handleSelectChange}
            className="border border-slate-500"
          >
            <option value="" disabled>
              나이를 선택하세요
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        <div className="flex flex-start gap-4">
          {["남성", "여성"].map((sex) => (
            <div key={sex}>
              <label htmlFor={sex}>{sex}</label>
              <input
                required
                type="radio"
                id={`${sex}2`}
                name="sex2"
                value={sex}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-600 p-4 transition-colors hover:border-emerald-500/50 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-500/10">
            <input
              type="checkbox"
              name="agreement"
              required
              className="h-5 w-5 rounded accent-emerald-500"
              checked={form.agreement}
              onChange={handleInputChange}
            />
            <span className="text-slate-200">
              개인정보 처리방침에 동의합니다
              <span className="ml-1 text-rose-400">*</span>
            </span>
          </label>
        </div>

        <button
          className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-700 active:scale-[0.98]"
          type="submit"
        >
          제출
        </button>
      </form>
    </div>
  );
};

export default NormalFormWithObject;
