"use client";

import { useState } from "react";

const NormalForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("30");
  const [sex, setSex] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(e.target.value);
  };

  const handleSexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSex(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(name, age, sex);
    alert("제출되었습니다.");
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="name">이름</label>
      <input
        id="name"
        type="text"
        name="name"
        onChange={handleNameChange}
        className="border border-slate-500"
      />

      <div>
        <label htmlFor="age">나이</label>
        <select
          name="age"
          id="age"
          value={age}
          onChange={handleAgeChange}
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
              id={sex}
              name="sex"
              value={sex}
              onChange={handleSexChange}
            />
          </div>
        ))}
      </div>

      <button
        className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-700 active:scale-[0.98]"
        type="submit"
      >
        제출
      </button>
    </form>
  );
};

export default NormalForm;
