
import * as CryptoJS from 'crypto-js'
export function encrypt(secret,message){
  return CryptoJS.AES.encrypt(message, secret).toString();
}
export async function decrypt(secret,encryptedMessage){
  const bytes = await CryptoJS.AES.decrypt(encryptedMessage, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
}