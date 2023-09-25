import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtCustomModule } from './jwt-custom/jwt-custom.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env'
      ],
      load: config
    }),
    JwtCustomModule,
  ],
})
export class BootingModule {}
