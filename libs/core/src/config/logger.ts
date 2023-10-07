import { registerAs } from '@nestjs/config'
const log_levels = ['warn', 'verbose', 'error', 'debug', 'log']
export default registerAs('logger',()=>({
  levels: log_levels.slice(0,log_levels.indexOf(process.env.LOG_LEVEL || '')+1),
  file_size: parseInt('2000'),
}))