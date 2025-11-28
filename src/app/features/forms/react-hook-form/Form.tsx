"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { FieldErrors } from "react-hook-form";

/**
 * Zod v4 스키마 정의
 * - 유효성 검사 규칙과 에러 메시지를 한 곳에서 관리
 */
const formSchema = z
  .object({
    name: z
      .string()
      .min(1, "이름은 필수입니다")
      .min(2, "이름은 2자 이상이어야 합니다")
      .max(20, "이름은 20자 이하여야 합니다")
      .regex(/^[가-힣a-zA-Z]+$/, "한글 또는 영문만 입력 가능합니다"),

    email: z
      .string()
      .min(1, "이메일은 필수입니다")
      .email("올바른 이메일 형식이 아닙니다"),

    password: z
      .string()
      .min(1, "비밀번호는 필수입니다")
      .min(8, "비밀번호는 8자 이상이어야 합니다")
      .max(20, "비밀번호는 20자 이하여야 합니다")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "영문, 숫자, 특수문자를 포함해야 합니다"
      ),

    passwordConfirm: z.string().min(1, "비밀번호 확인은 필수입니다"),

    age: z
      .number({ message: "나이를 입력해주세요" })
      .min(1, "나이는 1세 이상이어야 합니다")
      .max(120, "나이는 120세 이하여야 합니다"),

    phoneNumber: z
      .string()
      .min(1, "전화번호는 필수입니다")
      .regex(
        /^01[0-9]-\d{3,4}-\d{4}$/,
        "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)"
      ),

    agreeTerms: z.literal(true, "약관에 동의해야 합니다"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

/**
 * 폼 데이터 타입 (Zod 스키마에서 추론)
 */
type FormData = z.infer<typeof formSchema>;

/**
 * React Hook Form + Zod 통합 예제
 */
const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      age: 0,
      phoneNumber: "",
      agreeTerms: undefined,
    },
  });

  /**
   * 폼 제출 핸들러 (유효성 검사 통과 시)
   */
  const onSubmit = async (data: FormData) => {
    // 실제 API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("✅ 제출 성공:", data);
    alert("회원가입이 완료되었습니다!");
    reset();
  };

  /**
   * 폼 제출 실패 핸들러 (유효성 검사 실패 시)
   */
  const onError = (errors: FieldErrors<FormData>) => {
    console.log("❌ 유효성 검사 실패:", errors);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">회원가입</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        {/* 이름 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            이름 *
          </label>
          <input
            id="name"
            type="text"
            placeholder="홍길동"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* 이메일 */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            이메일 *
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            비밀번호 *
          </label>
          <input
            id="password"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label
            htmlFor="passwordConfirm"
            className="block text-sm font-medium mb-1"
          >
            비밀번호 확인 *
          </label>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <p className="mt-1 text-sm text-red-500">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>

        {/* 나이 */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium mb-1">
            나이 *
          </label>
          <input
            id="age"
            type="number"
            placeholder="25"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>
          )}
        </div>

        {/* 전화번호 */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium mb-1"
          >
            전화번호 *
          </label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="010-1234-5678"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* 약관 동의 */}
        <div className="flex items-start gap-2">
          <input
            id="agreeTerms"
            type="checkbox"
            className="mt-1"
            {...register("agreeTerms")}
          />
          <label htmlFor="agreeTerms" className="text-sm">
            이용약관 및 개인정보처리방침에 동의합니다 *
          </label>
        </div>
        {errors.agreeTerms && (
          <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "가입 중..." : "가입하기"}
        </button>

        {/* 제출 성공 메시지 */}
        {isSubmitSuccessful && (
          <p className="text-center text-green-600 font-medium">
            ✅ 회원가입이 완료되었습니다!
          </p>
        )}
      </form>
    </div>
  );
};

export default ReactHookForm;
