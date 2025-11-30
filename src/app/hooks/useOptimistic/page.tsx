"use client";

import { useOptimistic, useState } from "react";

type Todo = {
  id: string;
  text: string;
  isPending: boolean;
};

const addTodoReducer = (state: Todo[], newTodo: Todo): Todo[] => {
  return [...state, { id: newTodo.id, text: newTodo.text, isPending: true }];
};

const UseOptimisticPage = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Hello", isPending: false },
  ]);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic<Todo[], Todo>(
    todos,
    addTodoReducer
  );

  const formAction = async (formData: FormData) => {
    const text = formData.get("todo") as string;

    addOptimisticTodo({ id: crypto.randomUUID(), text, isPending: true });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, isPending: false },
    ]);
  };

  return (
    <div>
      <form action={formAction}>
        <input type="text" name="todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            {todo.isPending ? <span>(저장중...)</span> : <span>✅</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UseOptimisticPage;
