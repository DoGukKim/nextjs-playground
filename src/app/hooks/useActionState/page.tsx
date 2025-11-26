import FormExample from "./FormExample";
import AsyncExample from "./AsyncExample";

export default function UseActionStatePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">
            useActionState 데모
          </h1>
          <p className="text-gray-600 mt-2">
            React 19의 useActionState를 폼(Form)과 일반 비동기 로직에 활용하는
            방법입니다.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 왼쪽: 전통적인 폼 제출 */}
          <FormExample />

          {/* 오른쪽: 일반 비동기 상태 관리 */}
          <AsyncExample />
        </div>
      </div>
    </main>
  );
}
