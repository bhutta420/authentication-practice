import { registerAs } from '@nestjs/config'
export default registerAs('throttle',()=>({
  ttl: parseInt(process.env.THROTTLER_TTL_SECONDS || '60')*1000,
  limit: parseInt(process.env.THROTTLER_LIMIT || '10'),
}))