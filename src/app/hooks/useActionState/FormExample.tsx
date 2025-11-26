"use client";

import { useActionState } from "react";
import { updateMessageAction, FormState } from "./actions";

const initialState: FormState = {
  message: "",
  success: false,
};

export default function FormExample() {
  const [state, formAction, isPending] = useActionState(
    updateMessageAction,
    initialState
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        1. Form 제출 예제
      </h2>
      <form action={formAction} className="space-y-4">
        <div>
          <input
            name="message"
            type="text"
            placeholder="메시지 입력..."
            disabled={isPending}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 text-black"
          />
          {state.error && (
            <p className="mt-1 text-sm text-red-500">{state.error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors font-medium"
        >
          {isPending ? "전송 중..." : "전송하기"}
        </button>

        {state.success && (
          <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
            ✅ {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
