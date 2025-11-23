import { apiClient } from "@/infrastructure/api/client";
import { Images } from "./schema";

export const fetchImages = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<Images> => {
  const images = await apiClient.get<Images>(`https://picsum.photos/v2/list`, {
    params: { page, limit },
  });

  return images;
};
