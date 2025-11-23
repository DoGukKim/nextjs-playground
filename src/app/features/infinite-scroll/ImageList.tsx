"use client";
import { useEffect, useRef, useState, useEffectEvent } from "react";
import { fetchImages, type Images } from "./api";
import ImageItem from "./ImageItem";

const ImageList = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<Images>([]);
  const pageRef = useRef(1);
  const isLoadingRef = useRef(false);

  const onIntersect = useEffectEvent(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    const data = await fetchImages(pageRef.current);
    setImages((prev) => [...prev, ...data]);
    pageRef.current += 1;
    isLoadingRef.current = false;
  });

  useEffect(() => {
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
    <div>
      {images.map((image) => (
        <ImageItem key={image.id} image={image} />
      ))}

      <div
        ref={triggerRef}
        className="border-2 border-red-500"
        style={{ height: 1 }}
      />
    </div>
  );
};

export default ImageList;
