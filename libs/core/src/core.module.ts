import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EncryptionsModule } from './modules';
import config from './config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AllExceptionsFilter } from './filters';
import { FileLogger } from './logger';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ValidationErrorException } from './exceptions';
import * as _ from 'lodash'
import { AuthGuard } from './guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env',
      ],
      load: config
    }),
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
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return [
          {
            ttl: configService.get('throttle.ttl'),
            limit: configService.get('throttle.limit'),
          },
        ]
      },
    }),
    EncryptionsModule,
  ],
  exports: [
    EncryptionsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: FileLogger,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        stopAtFirstError: false,
        exceptionFactory(errors) {
          let new_errors = _.keyBy(errors,'property')
          throw new ValidationErrorException(new_errors)
        },
      })
    }
  ],
})
export class CoreModule {}