import { registerAs } from '@nestjs/config'
export default registerAs('app',()=>({
  port: parseInt(process.env.APP_PORT || '5000'),
  url: process.env.APP_URL || 'https://localhost:5000/',
  cors_allow_domains: process.env.APP_CORS_ALLOW_DOMAINS || '*',
}))