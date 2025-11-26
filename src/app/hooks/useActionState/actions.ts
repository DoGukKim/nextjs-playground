'use server';

// --- 1. 폼 예제용 타입 및 액션 ---
export type FormState = {
  message: string;
  success: boolean;
  error?: string;
};

export async function updateMessageAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // 인위적인 지연 시간 (1초)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const inputMessage = formData.get('message') as string;

  if (!inputMessage || inputMessage.length < 2) {
    return {
      success: false,
      message: '',
      error: '메시지는 2글자 이상이어야 합니다.',
    };
  }

  return {
    success: true,
    message: `서버에 저장됨: "${inputMessage}"`,
  };
}

// --- 2. 일반 비동기 예제용 액션 ---
// FormData 대신 step(숫자)을 직접 받습니다.
export async function incrementCounterAction(
  prevState: number,
  step: number // runAction 호출 시 넘겨주는 인자
): Promise<number> {
  // 인위적인 지연 시간 (0.5초)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 이전 값에 step만큼 더해서 반환
  return prevState + step;
}

