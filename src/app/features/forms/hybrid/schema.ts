import z from "zod";
import {
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
  USER_NAME_REGEX,
} from "./constants";

export const formSchema = z
  .object({
    username: z
      .string()
      .min(1, "아이디를 입력해주세요.")
      .regex(
        USER_NAME_REGEX,
        "5~20자의 영문 소문자, 숫자와 특수기호(_)만 사용 가능합니다."
      ),
    password: z
      .string()
      .min(1, "비밀번호를 입력해주세요.")
      .regex(PASSWORD_REGEX, "영문, 숫자, 특수문자를 포함해야 합니다."),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    name: z.string().min(1, "이름을 입력해주세요."),
    phoneNumber: z
      .string()
      .min(1, "휴대전화 번호를 입력해주세요.")
      .regex(PHONE_NUMBER_REGEX, "올바른 휴대전화 번호 형식이 아닙니다."),
    agreements: z.object({
      term1: z.literal(true, "필수"),
      term2: z.literal(true, "필수"),
      term3: z.boolean(),
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });
