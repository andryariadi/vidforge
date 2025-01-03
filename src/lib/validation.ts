import { z } from "zod";

export const videoSchema = z.object({
  topic: z.string().min(1, { message: "Topic is required" }),
  imageStyle: z.string().min(1, { message: "Image style is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
});
