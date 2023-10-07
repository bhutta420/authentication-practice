
import * as bcrypt from 'bcrypt'
export function hash(message: string){
  const SALT = bcrypt.genSaltSync()
  return bcrypt.hash(message, SALT)
}
export function hashCompare(message: string, hash: string){
  return bcrypt.compareSync(message,hash)
}