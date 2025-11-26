"use client";

import { useState, useTransition, useMemo } from "react";

/**
 * React 19 useTransition Hook 예제
 *
 * useTransition은 UI 블로킹 없이 상태를 업데이트할 수 있게 해주는 훅입니다.
 * React 19에서는 startTransition에 비동기 함수를 전달할 수 있습니다.
 */

// 무거운 리스트를 시뮬레이션하기 위한 데이터 생성
const generateItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `아이템 ${i + 1}`,
    category: ["전자기기", "의류", "식품", "가구"][i % 4],
  }));

const allItems = generateItems(10000);

export default function UseTransitionPage() {
  // 탭 전환 예제
  const [activeTab, setActiveTab] = useState<"search" | "async">("search");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
            useTransition
          </h1>
          <p className="text-slate-400">
            UI 블로킹 없이 상태를 업데이트하는 React 19 훅
          </p>
        </header>

        {/* 탭 네비게이션 */}
        <nav className="flex justify-center gap-2 mb-8">
          {[
            { key: "search", label: "🔍 검색 필터" },
            { key: "async", label: "⚡ 비동기 페칭" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                startTransition(() => {
                  setActiveTab(key as "search" | "async");
                });
              }}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === key
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* 트랜지션 펜딩 인디케이터 */}
        {isPending && (
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full">
              <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-purple-300 text-sm">전환 중...</span>
            </div>
          </div>
        )}

        {/* 컨텐츠 영역 */}
        <div
          className={`transition-opacity duration-300 ${
            isPending ? "opacity-50" : "opacity-100"
          }`}
        >
          {activeTab === "search" && <SearchFilterExample />}
          {activeTab === "async" && <AsyncFetchExample />}
        </div>
      </div>
    </div>
  );
}

/**
 * 검색 필터 예제
 * 대량의 데이터를 필터링할 때 useTransition으로 UI 반응성 유지
 */
function SearchFilterExample() {
  const [query, setQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 입력값은 즉시 반영 (높은 우선순위)
    setQuery(value);

    // 필터링은 트랜지션으로 처리 (낮은 우선순위)
    startTransition(() => {
      setFilterQuery(value);
    });
  };

  const filteredItems = useMemo(
    () =>
      allItems.filter((item) =>
        item.name.toLowerCase().includes(filterQuery.toLowerCase())
      ),
    [filterQuery]
  );

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h2 className="text-xl font-semibold text-white mb-4">
        🔍 대용량 데이터 검색
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        10,000개의 아이템을 필터링합니다. 입력은 즉시 반영되고, 무거운 필터링은
        백그라운드에서 처리됩니다.
      </p>

      {/* 검색 입력 */}
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="검색어를 입력하세요..."
          className="w-full px-5 py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl
                     text-white placeholder-slate-500
                     focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                     focus:outline-none transition-all"
        />
        {isPending && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* 결과 카운트 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-400 text-sm">
          총{" "}
          <span className="text-purple-400 font-semibold">
            {filteredItems.length.toLocaleString()}
          </span>
          개의 결과
        </span>
        {isPending && (
          <span className="text-purple-400 text-sm animate-pulse">
            필터링 중...
          </span>
        )}
      </div>

      {/* 결과 리스트 */}
      <ul
        className={`max-h-80 overflow-auto space-y-2 pr-2 transition-opacity duration-200 
                      ${isPending ? "opacity-60" : "opacity-100"}`}
      >
        {filteredItems.slice(0, 100).map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg
                       hover:bg-slate-900/50 transition-colors"
          >
            <span className="text-slate-200">{item.name}</span>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                item.category === "전자기기"
                  ? "bg-blue-500/20 text-blue-300"
                  : item.category === "의류"
                  ? "bg-pink-500/20 text-pink-300"
                  : item.category === "식품"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-yellow-500/20 text-yellow-300"
              }`}
            >
              {item.category}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 비동기 페칭 예제 (React 19 신기능)
 * startTransition에 async 함수를 직접 전달할 수 있습니다.
 */
interface Post {
  id: number;
  title: string;
  body: string;
}

function AsyncFetchExample() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleFetch = () => {
    // ✨ React 19: startTransition에 async 함수 직접 전달!
    startTransition(async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      );
      const data = await response.json();
      setPosts(data);
    });
  };

  const handleClear = () => {
    startTransition(() => {
      setPosts([]);
    });
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h2 className="text-xl font-semibold text-white mb-4">
        ⚡ 비동기 데이터 페칭
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        React 19에서는 startTransition에 async 함수를 직접 전달할 수 있습니다.
        isPending은 비동기 작업이 완료될 때까지 true를 유지합니다.
      </p>

      {/* 버튼 그룹 */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleFetch}
          disabled={isPending}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                     text-white font-medium rounded-xl
                     hover:shadow-lg hover:shadow-purple-500/30 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              로딩 중...
            </span>
          ) : (
            "게시글 불러오기"
          )}
        </button>

        {posts.length > 0 && (
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-slate-700/50 text-slate-300 font-medium rounded-xl
                       hover:bg-slate-600/50 transition-all duration-300"
          >
            초기화
          </button>
        )}
      </div>

      {/* 결과 리스트 */}
      {posts.length > 0 && (
        <ul className="space-y-3">
          {posts.map((post, index) => (
            <li
              key={post.id}
              className="p-4 bg-slate-900/30 rounded-xl border border-slate-700/30
                         transform transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-white font-medium mb-2 line-clamp-1">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm line-clamp-2">{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      {posts.length === 0 && !isPending && (
        <div className="text-center py-12 text-slate-500">
          버튼을 클릭하여 데이터를 불러오세요
        </div>
      )}
    </div>
  );
}
