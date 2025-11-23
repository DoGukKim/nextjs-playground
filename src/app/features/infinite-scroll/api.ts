import { apiClient } from "@/infrastructure/api/client";
import { type Images } from "./schema";

export { type Image, type Images } from "./schema";

export const fetchImages = async (page: number): Promise<Images> => {
  const images = await apiClient.get<Images>(`https://picsum.photos/v2/list`, {
    params: { page, limit: 30 },
  });

  return images;
};
