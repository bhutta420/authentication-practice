import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { encrypt, decrypt, hash, hashCompare } from '@app/core';
@Injectable()
export class EncryptionsServices {
  constructor(
    private configService: ConfigService
  ){}
  encrypt(message){
    return encrypt(this.configService.get('secrets.password_secret'),message)
  }
  decrypt(encryptedMessage){
    return decrypt(this.configService.get('secrets.password_secret'),encryptedMessage)
  }
  async encryptCompare(message,encryptedMessage){
    const store_message = await decrypt(this.configService.get('secrets.password_secret'),encryptedMessage)
    return store_message==message
  }
  hash(message: string){
    return hash(message)
  }
  hashCompare(message: string, hash: string){
    return hashCompare(message,hash)
  }
}