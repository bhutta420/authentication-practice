import { registerAs } from '@nestjs/config'
export default registerAs('database',()=>({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  name: process.env.DB_NAME || '',
  sync: process.env.DB_SYNC=='true',
}))