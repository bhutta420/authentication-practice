import { Module } from '@nestjs/common';
import { EncryptionsServices } from './services';

@Module({
  providers: [
    EncryptionsServices
  ],
  exports: [
    EncryptionsServices
  ],
})
export class EncryptionsModule {}
