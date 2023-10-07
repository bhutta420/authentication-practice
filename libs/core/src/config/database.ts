import { registerAs } from "@nestjs/config";

export default registerAs('database',()=>({
  database: process.env.DB_NAME || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  logging: Boolean(process.env.DB_LOGGING),
  synchronize: Boolean(process.env.DB_SYNCHRONIZE),
}))