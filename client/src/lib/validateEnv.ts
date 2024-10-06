import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { z } from "zod";
config();
export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:5000/api/"),
  },
  server: {
    NEXTAUTH_SECRET: z.string().default("secret"),
    GOOGLE_CLIENT_ID: z
    .string()
    ,
    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    GOOGLE_CLIENT_SECRET: z
      .string(),
    CLOUDINARY_API_SECRET: z.string(),

  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
});