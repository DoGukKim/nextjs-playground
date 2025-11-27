"use client";

import { useState } from "react";

const NormalForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
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
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleNameChange} />

      <select name="age" id="age" onChange={handleAgeChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>

      <div>
        {["female", "male", "other"].map((sex) => (
          <div key={sex}>
            <label htmlFor={sex}>{sex}</label>
            <input id={sex} name="sex" value={sex} onChange={handleSexChange} />
          </div>
        ))}
      </div>

      <button type="submit">제출</button>
    </form>
  );
};

export default NormalForm;
