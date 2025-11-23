import Image from "next/image";
import type { Image as ImageType } from "./api";

interface ImageItemProps {
  image: ImageType;
  "aria-setsize"?: number;
  "aria-posinset"?: number;
  priority?: boolean;
}

const ImageItem = ({
  image,
  "aria-setsize": ariaSetsize,
  "aria-posinset": ariaPosinset,
}: ImageItemProps) => {
  return (
    <li
      role="article"
      aria-setsize={ariaSetsize}
      aria-posinset={ariaPosinset}
      aria-labelledby={`image-author-${image.id}`}
    >
      <p id={`image-author-${image.id}`}>{image.author}</p>
      <Image
        src={image.download_url}
        alt={`${image.author}의 사진`}
        width={100}
        height={100}
        style={{ width: "auto", height: "auto" }}
      />
    </li>
  );
};

export default ImageItem;
