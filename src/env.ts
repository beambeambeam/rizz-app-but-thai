import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.string(),
    OPEN_AI_API_KEY: z.string().optional(),
  },
  runtimeEnv: {
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
  },
});
