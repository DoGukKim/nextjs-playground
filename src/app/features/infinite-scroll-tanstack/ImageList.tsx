"use client";

import { useEffect, useRef } from "react";
import ImageItem from "./ImageItem";
import { useImagesInfiniteQuery } from "./query";

const ImageList = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isSuccess,
  } = useImagesInfiniteQuery({ page: 1, limit: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  if (!isSuccess) {
    return <div>failed</div>;
  }

  const allImages = data.pages.flatMap((page) => page) ?? [];

  return (
    <div role="feed" aria-busy={isLoading} aria-label="이미지 피드">
      <ul aria-label="이미지 목록">
        {allImages.map((image, index) => (
          <ImageItem
            key={image.id}
            image={image}
            aria-setsize={allImages.length}
            aria-posinset={index + 1}
          />
        ))}
      </ul>

      <div
        ref={triggerRef}
        className="h-px border-b border-red-500"
        aria-hidden="true"
      />

      {isFetchingNextPage && (
        <div role="status" aria-live="polite">
          이미지를 불러오는 중입니다...
        </div>
      )}
    </div>
  );
};

export default ImageList;
