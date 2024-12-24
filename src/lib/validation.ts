import { z } from "zod";

export const videoSchema = z.object({
  topic: z.string().min(1, { message: "Topic is required" }),
  //   theme: z.string().min(1),
  duration: z.string().min(1, { message: "Duration is required" }),
});
