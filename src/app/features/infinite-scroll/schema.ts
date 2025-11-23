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
