import { registerAs } from "@nestjs/config";

export default registerAs('app',()=>({
  port: process.env.APP_PORT || 3000,
  url: process.env.APP_URL || '',
  cors: process.env.APP_CORS?.split(',') ?? [],
}))