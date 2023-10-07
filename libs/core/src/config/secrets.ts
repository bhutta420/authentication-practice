import { registerAs } from '@nestjs/config'
export default registerAs('secrets',()=>({
  password_secret: process.env.PASSWORD_SECRET || '',
}))