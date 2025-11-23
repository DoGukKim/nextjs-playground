import Image from "next/image";
import type { Image as ImageType } from "./api";

interface ImageItemProps {
  image: ImageType;
}

const ImageItem = ({ image }: ImageItemProps) => {
  return (
    <div>
      <p>{image.author}</p>
      <Image
        src={image.download_url}
        alt={image.author}
        width={100}
        height={100}
      />
    </div>
  );
};

export default ImageItem;
