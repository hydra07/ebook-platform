import { v2 as cloudinary } from "cloudinary";
import { env } from "@/lib/validateEnv";
// const CLOUDINARY_CLOUD_NAME = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
// const CLOUDINARY_API_KEY = env.CLOUDINARY_API_KEY;
// const CLOUDINARY_API_SECRET = env.CLOUDINARY_API_SECRET;

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME as string,
  api_key: env.CLOUDINARY_API_KEY as string,
  api_secret: env.CLOUDINARY_API_SECRET as string,
});
 console.log(cloudinary.config());

export default cloudinary;
