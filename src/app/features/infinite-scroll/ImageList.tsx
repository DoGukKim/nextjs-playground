"use client";
import { useEffect, useRef, useState } from "react";
import { fetchImages, type Images } from "./api";
import ImageItem from "./ImageItem";

const ImageList = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<Images>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef(1);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    const onIntersect = async () => {
      if (isLoadingRef.current) return;

      isLoadingRef.current = true;
      setIsLoading(true);

      const data = await fetchImages(pageRef.current);
      setImages((prev) => [...prev, ...data]);

      pageRef.current += 1;
      isLoadingRef.current = false;
      setIsLoading(false);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 500px 0px" }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div role="feed" aria-busy={isLoading} aria-label="이미지 피드">
      <ul aria-label="이미지 목록">
        {images.map((image, index) => (
          <ImageItem
            key={image.id}
            image={image}
            aria-setsize={-1}
            aria-posinset={index + 1}
          />
        ))}
      </ul>

      <div ref={triggerRef} className="h-px" aria-hidden="true" />

      <div role="status" aria-live="polite" className="sr-only">
        {isLoading
          ? "이미지를 불러오는 중입니다"
          : `${images.length}개의 이미지가 로드되었습니다`}
      </div>
    </div>
  );
};

export default ImageList;
