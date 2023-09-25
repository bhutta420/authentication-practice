import { Module } from '@nestjs/common';
import { JwtModule, JwtService, } from '@nestjs/jwt';
import { JwtCustomService } from './services';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory(configService: ConfigService) {
        return {
          global: true,
          secret: configService.get('jwt.secret'),
          secretOrPrivateKey: configService.get('jwt.secret'),
          signOptions: {
            expiresIn: configService.get('jwt.expire'),
          },
        }
      },
      inject: [
        ConfigService,
      ],
    })
  ],
  providers: [
    JwtService,
    JwtCustomService,
  ],
  exports: [
    JwtCustomService,
  ],
})
export class JwtCustomModule {}
