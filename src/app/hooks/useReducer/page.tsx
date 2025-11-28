"use client";

import { useReducer, useRef } from "react";

type Todo = {
  id: string;
  text: string;
};
type Todos = Todo[];

type Action =
  | { type: "ADD_TODO"; payload: Pick<Todo, "text"> }
  | { type: "DELETE_TODO"; payload: Pick<Todo, "id"> };

const reducer = (state: Todos, action: Action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: crypto.randomUUID(), text: action.payload.text }];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);
  }
};

const UseReducerPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <div>
      <div>
        <input type="text" ref={inputRef} />
        <button
          onClick={() =>
            dispatch({
              type: "ADD_TODO",
              payload: {
                text: inputRef.current?.value ?? "",
              },
            })
          }
        >
          Add
        </button>
      </div>

      <ul>
        {state.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2">
            <li>
              <span>{todo.id}: </span>
              <span>{todo.text}</span>
            </li>
            <button
              onClick={() =>
                dispatch({ type: "DELETE_TODO", payload: { id: todo.id } })
              }
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              삭제
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UseReducerPage;
