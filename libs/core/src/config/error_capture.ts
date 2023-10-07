import { registerAs } from "@nestjs/config";

export default registerAs('error_capture',()=>({
  limit: parseInt(process.env.ERRORS_KEEP_RECORD || '300'),
}))