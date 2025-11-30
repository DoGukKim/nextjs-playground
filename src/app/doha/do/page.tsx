"use client";

import { useState } from "react";
import { formAction } from "./action";

const userNameRegex = /^[a-z0-9_]{5,20}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
const phoneRegex = /^010-?\d{4}-?\d{4}$/;

const handleUsernameValidation = (username: string) => {
  // 양쪽 공백 제거 / 트림처리
  if (username.length === 0) {
    return "아이디를 입력해주세요.";
  }

  if (!userNameRegex.test(username)) {
    return "5~20자의 영문 소문자, 숫자와 특수기호(_)만 사용 가능합니다.";
  }
};

const handlePasswordValidation = (password: string) => {
  if (password.length === 0) {
    return "비밀번호를 입력해주세요.";
  }

  if (!passwordRegex.test(password)) {
    return "8자 이상, 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.";
  }
};

const handlePasswordConfirmValidation = (
  password: string,
  passwordConfirm: string
) => {
  if (passwordConfirm.length === 0) {
    return "비밀번호 확인을 입력해주세요.";
  }
  if (password !== passwordConfirm) {
    return "비밀번호가 일치하지 않습니다.";
  }
};

const handlePhoneNumberValidation = (phoneNumber: string) => {
  if (phoneNumber.length === 0) {
    return "휴대전화 번호를 입력해주세요.";
  }
  if (!phoneRegex.test(phoneNumber)) {
    return "올바른 휴대전화 번호를 입력해주세요. (예: 01012345678)";
  }
};

const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/[^0-9]/g, "");

  if (numbers.length <= 3) {
    return numbers;
  }

  if (numbers.length <= 7) {
    return numbers.replace(/(\d{3})(\d{1,4})/, "$1-$2");
  }

  return numbers.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3");
};

const terms = [
  { id: 1, text: "필수" },
  { id: 2, text: "필수" },
  { id: 3, text: "선택" },
];

const termCheckAll = (isAllCheck: boolean) => {
  const newObj: Record<PropertyKey, boolean> = {};
  const keys = terms.map((i) => i.id);

  for (const key of keys) {
    newObj[key] = isAllCheck;
  }

  console.log(newObj);
  return newObj;
};

const DoPage = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState<string>("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");
  const [name, setName] = useState("");
  const [nameMessage, setNameMessage] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberMessage, setPhoneNumberMessage] = useState<string>("");
  const [agreement, setAgreement] = useState<Record<PropertyKey, boolean>>({});

  return (
    <div>
      <form action={formAction}>
        <div className="flex flex-col">
          <label htmlFor="username" className="flex cursor-pointer">
            아이디
          </label>
          <input
            id="username"
            type="text"
            name="username"
            required
            className="border-2 border-indigo-500"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameMessage(
                handleUsernameValidation(e.target.value) || ""
              );
            }}
          />
          <span>{usernameMessage}</span>
        </div>

        <div>
          <label>비밀번호 입력</label>
          <div className="flex flex-col">
            <input
              id="password"
              type="text" // 변경: type="password"
              name="password"
              required
              className="border-2 border-indigo-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordMessage(
                  handlePasswordValidation(e.target.value) || ""
                );
              }}
            />

            <input
              id="passwordConfirm"
              type="text"
              name="passwordConfirm"
              required
              className="border-2 border-indigo-500"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                setPasswordConfirmMessage(
                  handlePasswordConfirmValidation(password, e.target.value) ||
                    ""
                );
              }}
            />

            <span>
              {passwordMessage}
              {passwordConfirmMessage}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="flex cursor-pointer">
            이름
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="border-2 border-indigo-500"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameMessage(
                e.target.value.length === 0 ? "이름을 입력해주세요." : ""
              );
            }}
          />
          <span>{nameMessage}</span>
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="flex cursor-pointer">
            휴대전화 번호
          </label>
          <div>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              required
              className="border-2 border-indigo-500"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(formatPhoneNumber(e.target.value));
                setPhoneNumberMessage(
                  handlePhoneNumberValidation(e.target.value) || ""
                );
              }}
            />
            <button
              type="button"
              className="border-2 border-indigo-500 disabled:opacity-50 ml-2 px-4 py-2 cursor-pointer"
              style={{
                background:
                  !!phoneNumberMessage || phoneNumber.length === 0
                    ? "red"
                    : "blue",
                cursor:
                  !!phoneNumberMessage || phoneNumber.length === 0
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={!!phoneNumberMessage || phoneNumber.length === 0}
            >
              인증번호 발송
            </button>
          </div>
          <span>{phoneNumberMessage}</span>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setAgreement(termCheckAll(e.target.checked))}
            />
            <span>전체 동의</span>
          </label>

          <div className="flex flex-col">
            {terms.map((term) => {
              return (
                <label key={term.id}>
                  <input
                    type="checkbox"
                    checked={!!agreement[term.id]}
                    onChange={(e) =>
                      setAgreement((prev) => ({
                        ...prev,
                        [term.id]: e.target.checked,
                      }))
                    }
                  />
                  <span>{term.text}</span>
                </label>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoPage;
