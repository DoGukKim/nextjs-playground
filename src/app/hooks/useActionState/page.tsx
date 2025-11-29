"use client";
import { useActionState } from "react";
import { formAction, FormState } from "./actions";

const UseActionStatePage = () => {
  const [state, action, isPending] = useActionState<FormState, FormData>(
    formAction,
    { name: "" }
  );

  return (
    <main>
      <form action={action}>
        <input type="text" name="name" />
        <button type="submit">제출</button>
      </form>
      {state.errors?.name && (
        <p className="text-red-500">{state.errors.name}</p>
      )}
      {isPending && <div>Loading...</div>}
      {state.name && <p>제출하신 이름은 {state.name}입니다.</p>}
    </main>
  );
};

export default UseActionStatePage;
