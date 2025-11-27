"use client";
/**
 * Phase 1: HTML Form 기초
 *
 * 이 페이지에서 학습할 내용:
 * 1. 다양한 input 타입들 (text, password, email, number, tel, date, checkbox, radio, file)
 * 2. textarea, select 요소
 * 3. label을 통한 접근성 향상
 * 4. fieldset과 legend를 활용한 그룹화
 * 5. HTML5 내장 유효성 검사 속성들 (required, pattern, min, max, minLength, maxLength)
 */

const BasicFormElementsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <h1 className="mb-2 text-4xl font-bold text-emerald-400">
            Phase 1: HTML Form 기초
          </h1>
          <p className="text-slate-400">
            다양한 form 요소들과 HTML5 내장 유효성 검사를 학습합니다.
          </p>
        </header>

        <form
          className="space-y-8 rounded-2xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            console.log(
              "📋 Form Data:",
              Object.fromEntries(formData.entries())
            );
            alert("콘솔에서 제출된 데이터를 확인하세요!");
          }}
        >
          {/* ========================================
              Section 1: 텍스트 입력 요소들
          ======================================== */}
          <fieldset className="space-y-4 rounded-xl border border-slate-600 p-6">
            <legend className="px-3 text-lg font-semibold text-emerald-300">
              📝 텍스트 입력 요소들
            </legend>

            {/* Text Input */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-300"
              >
                사용자명 (text)
                <span className="ml-1 text-rose-400">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="홍길동"
                required
                minLength={2}
                maxLength={20}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-xs text-slate-500">
                2~20자 사이로 입력하세요 (minLength, maxLength)
              </p>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300"
              >
                이메일 (email)
                <span className="ml-1 text-rose-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-xs text-slate-500">
                email 타입은 자동으로 이메일 형식을 검증합니다
              </p>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300"
              >
                비밀번호 (password)
                <span className="ml-1 text-rose-400">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                minLength={8}
                pattern="^(?=.*[a-zA-Z])(?=.*\d).+$"
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-xs text-slate-500">
                8자 이상, 영문과 숫자 포함 (pattern 속성으로 정규표현식 검증)
              </p>
            </div>

            {/* Tel Input */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-300"
              >
                전화번호 (tel)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="010-1234-5678"
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-xs text-slate-500">
                모바일에서는 숫자 키패드가 표시됩니다
              </p>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-slate-300"
              >
                자기소개 (textarea)
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                placeholder="간단한 자기소개를 작성해주세요..."
                maxLength={500}
                className="w-full resize-none rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-xs text-slate-500">
                여러 줄 입력이 필요할 때 사용 (최대 500자)
              </p>
            </div>
          </fieldset>

          {/* ========================================
              Section 2: 숫자 및 날짜 입력
          ======================================== */}
          <fieldset className="space-y-4 rounded-xl border border-slate-600 p-6">
            <legend className="px-3 text-lg font-semibold text-amber-300">
              🔢 숫자 및 날짜 입력
            </legend>

            {/* Number Input */}
            <div className="space-y-2">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-slate-300"
              >
                나이 (number)
              </label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="25"
                min={1}
                max={150}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-xs text-slate-500">
                min=1, max=150으로 범위 제한
              </p>
            </div>

            {/* Range Input */}
            <div className="space-y-2">
              <label
                htmlFor="satisfaction"
                className="block text-sm font-medium text-slate-300"
              >
                만족도 (range): <span id="rangeValue">50</span>%
              </label>
              <input
                type="range"
                id="satisfaction"
                name="satisfaction"
                min={0}
                max={100}
                defaultValue={50}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-600 accent-emerald-500"
                onChange={(e) => {
                  const span = document.getElementById("rangeValue");
                  if (span) span.textContent = e.target.value;
                }}
              />
              <p className="text-xs text-slate-500">
                슬라이더로 값을 선택할 수 있습니다
              </p>
            </div>

            {/* Date Input */}
            <div className="space-y-2">
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium text-slate-300"
              >
                생년월일 (date)
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                max={new Date().toISOString().split("T")[0]}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-xs text-slate-500">
                오늘 날짜까지만 선택 가능 (max 속성)
              </p>
            </div>

            {/* Time Input */}
            <div className="space-y-2">
              <label
                htmlFor="meetingTime"
                className="block text-sm font-medium text-slate-300"
              >
                미팅 시간 (time)
              </label>
              <input
                type="time"
                id="meetingTime"
                name="meetingTime"
                min="09:00"
                max="18:00"
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-xs text-slate-500">
                업무 시간 내(09:00~18:00)로 제한
              </p>
            </div>
          </fieldset>

          {/* ========================================
              Section 3: 선택 요소들
          ======================================== */}
          <fieldset className="space-y-4 rounded-xl border border-slate-600 p-6">
            <legend className="px-3 text-lg font-semibold text-sky-300">
              ☑️ 선택 요소들
            </legend>

            {/* Select */}
            <div className="space-y-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-slate-300"
              >
                국가 (select)
              </label>
              <select
                id="country"
                name="country"
                defaultValue=""
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="" disabled>
                  국가를 선택하세요
                </option>
                <optgroup label="아시아">
                  <option value="kr">🇰🇷 대한민국</option>
                  <option value="jp">🇯🇵 일본</option>
                  <option value="cn">🇨🇳 중국</option>
                </optgroup>
                <optgroup label="북미">
                  <option value="us">🇺🇸 미국</option>
                  <option value="ca">🇨🇦 캐나다</option>
                </optgroup>
                <optgroup label="유럽">
                  <option value="uk">🇬🇧 영국</option>
                  <option value="de">🇩🇪 독일</option>
                  <option value="fr">🇫🇷 프랑스</option>
                </optgroup>
              </select>
              <p className="text-xs text-slate-500">
                optgroup으로 옵션들을 그룹화할 수 있습니다
              </p>
            </div>

            {/* Radio Buttons */}
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
                    />
                    <span className="text-slate-200">{option.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                같은 name을 가진 radio는 하나만 선택됩니다
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <span className="block text-sm font-medium text-slate-300">
                관심 분야 (checkbox)
              </span>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { value: "frontend", label: "프론트엔드" },
                  { value: "backend", label: "백엔드" },
                  { value: "mobile", label: "모바일" },
                  { value: "devops", label: "DevOps" },
                  { value: "ai", label: "AI/ML" },
                  { value: "security", label: "보안" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 transition-colors hover:border-emerald-500/50 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-500/10"
                  >
                    <input
                      type="checkbox"
                      name="interests"
                      value={option.value}
                      className="h-4 w-4 rounded accent-emerald-500"
                    />
                    <span className="text-slate-200">{option.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                checkbox는 여러 개를 동시에 선택할 수 있습니다
              </p>
            </div>

            {/* Single Checkbox for Agreement */}
            <div className="space-y-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-600 p-4 transition-colors hover:border-emerald-500/50 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-500/10">
                <input
                  type="checkbox"
                  name="agreement"
                  required
                  className="h-5 w-5 rounded accent-emerald-500"
                />
                <span className="text-slate-200">
                  개인정보 처리방침에 동의합니다
                  <span className="ml-1 text-rose-400">*</span>
                </span>
              </label>
            </div>
          </fieldset>

          {/* ========================================
              Section 4: 파일 및 기타
          ======================================== */}
          <fieldset className="space-y-4 rounded-xl border border-slate-600 p-6">
            <legend className="px-3 text-lg font-semibold text-violet-300">
              📎 파일 및 기타
            </legend>

            {/* File Input */}
            <div className="space-y-2">
              <label
                htmlFor="profileImage"
                className="block text-sm font-medium text-slate-300"
              >
                프로필 이미지 (file)
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:transition-colors hover:file:bg-emerald-600"
              />
              <p className="text-xs text-slate-500">
                accept=&quot;image/*&quot;로 이미지 파일만 선택 가능
              </p>
            </div>

            {/* Color Input */}
            <div className="space-y-2">
              <label
                htmlFor="favoriteColor"
                className="block text-sm font-medium text-slate-300"
              >
                좋아하는 색상 (color)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  id="favoriteColor"
                  name="favoriteColor"
                  defaultValue="#10b981"
                  className="h-12 w-20 cursor-pointer rounded-lg border border-slate-600 bg-slate-700"
                />
                <span className="text-sm text-slate-400">
                  색상 피커를 클릭하세요
                </span>
              </div>
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-slate-300"
              >
                웹사이트 (url)
              </label>
              <input
                type="url"
                id="website"
                name="website"
                placeholder="https://example.com"
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-xs text-slate-500">
                URL 형식(https://...)을 자동으로 검증합니다
              </p>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-slate-300"
              >
                검색 (search)
              </label>
              <input
                type="search"
                id="search"
                name="search"
                placeholder="검색어를 입력하세요..."
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-xs text-slate-500">
                브라우저에 따라 X 버튼이 표시될 수 있습니다
              </p>
            </div>

            {/* Hidden Input */}
            <input type="hidden" name="formVersion" value="1.0" />
            <div className="rounded-lg bg-slate-700/50 p-3">
              <p className="text-xs text-slate-400">
                💡 <strong>hidden input</strong>: 사용자에게 보이지 않지만 폼과
                함께 전송됩니다.
                <br />
                <code className="mt-1 block text-emerald-400">
                  {`<input type="hidden" name="formVersion" value="1.0" />`}
                </code>
              </p>
            </div>
          </fieldset>

          {/* ========================================
              Section 5: 특수 속성 데모
          ======================================== */}
          <fieldset className="space-y-4 rounded-xl border border-slate-600 p-6">
            <legend className="px-3 text-lg font-semibold text-rose-300">
              ⚙️ 특수 속성 데모
            </legend>

            {/* Disabled Input */}
            <div className="space-y-2">
              <label
                htmlFor="disabledField"
                className="block text-sm font-medium text-slate-300"
              >
                비활성화 필드 (disabled)
              </label>
              <input
                type="text"
                id="disabledField"
                name="disabledField"
                value="이 필드는 수정할 수 없습니다"
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-slate-500"
              />
              <p className="text-xs text-slate-500">
                disabled 필드는 폼 제출 시 포함되지 않습니다
              </p>
            </div>

            {/* Readonly Input */}
            <div className="space-y-2">
              <label
                htmlFor="readonlyField"
                className="block text-sm font-medium text-slate-300"
              >
                읽기 전용 필드 (readOnly)
              </label>
              <input
                type="text"
                id="readonlyField"
                name="readonlyField"
                defaultValue="이 값은 폼과 함께 제출됩니다"
                readOnly
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-slate-400"
              />
              <p className="text-xs text-slate-500">
                readOnly 필드는 수정할 수 없지만 폼 제출 시 포함됩니다
              </p>
            </div>

            {/* Autofocus & Autocomplete */}
            <div className="space-y-2">
              <label
                htmlFor="autocompleteField"
                className="block text-sm font-medium text-slate-300"
              >
                자동완성 필드 (autoComplete)
              </label>
              <input
                type="text"
                id="autocompleteField"
                name="fullName"
                autoComplete="name"
                placeholder="브라우저 자동완성이 동작합니다"
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-xs text-slate-500">
                autoComplete=&quot;name&quot;으로 브라우저 자동완성 힌트 제공
              </p>
            </div>
          </fieldset>

          {/* ========================================
              Submit Buttons
          ======================================== */}
          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              className="flex-1 cursor-pointer rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]"
            >
              제출하기 (submit)
            </button>
            <button
              type="reset"
              className="cursor-pointer rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-700 active:scale-[0.98]"
            >
              초기화 (reset)
            </button>
            <button
              type="button"
              onClick={() => alert("일반 버튼 클릭!")}
              className="cursor-pointer rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-700 active:scale-[0.98]"
            >
              일반 버튼 (button)
            </button>
          </div>

          {/* Info Box */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <h3 className="mb-2 font-semibold text-emerald-400">
              💡 학습 포인트
            </h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>
                •{" "}
                <code className="text-emerald-300">
                  type=&quot;submit&quot;
                </code>
                : 폼을 제출합니다
              </li>
              <li>
                •{" "}
                <code className="text-emerald-300">type=&quot;reset&quot;</code>
                : 모든 필드를 초기값으로 되돌립니다
              </li>
              <li>
                •{" "}
                <code className="text-emerald-300">
                  type=&quot;button&quot;
                </code>
                : 폼 제출 없이 클릭 이벤트만 발생합니다
              </li>
              <li>
                • HTML5 유효성 검사가 실패하면 브라우저가 자동으로 에러 메시지를
                표시합니다
              </li>
            </ul>
          </div>
        </form>

        {/* Quick Reference */}
        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
          <h2 className="mb-4 text-xl font-bold text-slate-200">
            📖 빠른 참조: 주요 유효성 검사 속성
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-700/50 p-4">
              <h3 className="mb-2 font-semibold text-emerald-400">필수 입력</h3>
              <code className="text-sm text-slate-300">required</code>
            </div>
            <div className="rounded-lg bg-slate-700/50 p-4">
              <h3 className="mb-2 font-semibold text-amber-400">길이 제한</h3>
              <code className="text-sm text-slate-300">
                minLength, maxLength
              </code>
            </div>
            <div className="rounded-lg bg-slate-700/50 p-4">
              <h3 className="mb-2 font-semibold text-sky-400">범위 제한</h3>
              <code className="text-sm text-slate-300">min, max</code>
            </div>
            <div className="rounded-lg bg-slate-700/50 p-4">
              <h3 className="mb-2 font-semibold text-violet-400">패턴 검증</h3>
              <code className="text-sm text-slate-300">
                pattern=&quot;정규표현식&quot;
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicFormElementsPage;
