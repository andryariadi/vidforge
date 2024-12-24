import { z } from "zod";

export const videoSchema = z.object({
  topic: z.string().min(1),
  theme: z.string().min(1),
  duration: z.string().min(1),
});
