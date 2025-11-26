"use client";

import { useFormStatus } from "react-dom";

const Button = () => {
  const { pending, data, method } = useFormStatus();

  const rawName = data?.get("name");
  const name = typeof rawName === "string" ? rawName : "";

  return (
    <div>
      <p>name: {name}</p>
      <p>method: {method}</p>
      <p>pending: {pending ? "true" : "false"}</p>
      <button disabled={pending}>전송</button>
    </div>
  );
};

export default Button;
