import { apiClient } from "@/infrastructure/api/client";
import { z } from "zod";

const ImageSchema = z.object({
  author: z.string(),
  download_url: z.string(),
  height: z.number(),
  id: z.string(),
  url: z.string(),
  width: z.number(),
});
export const ImagesSchema = z.array(ImageSchema);

export type Image = z.infer<typeof ImageSchema>;
export type Images = z.infer<typeof ImagesSchema>;

export const fetchImages = async (page: number): Promise<Images> => {
  const images = await apiClient.get<Images>(`https://picsum.photos/v2/list`, {
    params: { page, limit: 30 },
  });

  return images;
};
