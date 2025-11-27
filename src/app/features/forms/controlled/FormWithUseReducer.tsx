"use client";
import { useReducer } from "react";

type FormState = {
  name3: string;
  age3: string;
  gender: string;
  agreement3: boolean;
};

const initialState: FormState = {
  name3: "",
  age3: "",
  gender: "",
  agreement3: false,
};

type FormActionType = "SET_FIELD_VALUE";

type FormAction = {
  type: FormActionType;
  field: keyof FormState;
  payload: {
    name3?: string;
    age3?: string;
    gender?: string;
    agreement3?: boolean;
  };
};

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "SET_FIELD_VALUE":
      return {
        ...state,
        [action.field]: action.payload[action.field],
      };
  }
};

const FormWithUseReducer = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      field: e.target.name as keyof FormState,
      payload: {
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      field: e.target.name as keyof FormState,
      payload: { [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
    alert("제출되었습니다.");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">FormWithUseReducer</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name3">이름</label>
        <input
          type="text"
          id="name3"
          name="name3"
          value={state.name3}
          onChange={handleInputChange}
        />

        <label htmlFor="age3">나이</label>
        <select
          name="age3"
          id="age3"
          className="border border-slate-500"
          value={state.age3}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            나이를 선택하세요
          </option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>

        <label htmlFor="agreement3">동의</label>
        <input
          type="checkbox"
          id="agreement3"
          name="agreement3"
          checked={state.agreement3}
          onChange={handleInputChange}
        />

        <div className="space-y-2">
          <span className="block text-sm font-medium text-slate-300">
            성별 (radio)
            <span className="ml-1 text-rose-400">*</span>
          </span>
          <div className="flex flex-wrap gap-4">
            {[
              { value: "male", label: "남성" },
              { value: "female", label: "여성" },
              { value: "other", label: "기타" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 transition-colors hover:border-emerald-500/50 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-500/10"
              >
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  required
                  className="h-4 w-4 accent-emerald-500"
                  checked={state.gender === option.value}
                  onChange={handleInputChange}
                />
                <span className="text-slate-200">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default FormWithUseReducer;
