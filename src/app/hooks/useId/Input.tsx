import { useId } from "react";

interface InputProps {
  label: string;
  name: string;
}

const Input = ({ label, name }: InputProps) => {
  const id = useId();
  const inputId = `${id}-${name}`;

  return (
    <div className="mb-4">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <p className="text-xs text-gray-400 mt-1">아이디 값: {id}</p>
      <input
        type="text"
        id={inputId}
        name={name}
        className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
};

export default Input;
