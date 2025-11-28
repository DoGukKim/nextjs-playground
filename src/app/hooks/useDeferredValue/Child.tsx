"use client";

import { useState, useEffect } from "react";
import { cn } from "@/shared/utils/cn";

interface PhotoItem {
  id: string;
  author: string;
}

const Child = ({ query, isPending }: { query: string; isPending: boolean }) => {
  const [data, setData] = useState<PhotoItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      try {
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${query}&limit=30`
        );

        if (!response.ok) {
          throw new Error("데이터를 가져오는데 실패했습니다.");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
        setData([]);
      }
    };

    fetchData();
  }, [query]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
        오류: {error}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-600 mb-2">
        페이지 {query}의 데이터 ({data.length}개)
      </div>
      <ul
        className={cn("space-y-2 transition-all duration-300", {
          "opacity-50 grayscale": isPending,
        })}
      >
        {data.map((item) => (
          <li key={item.id} className="px-4 py-2 rounded-md dark:bg-gray-800">
            {item.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Child;
