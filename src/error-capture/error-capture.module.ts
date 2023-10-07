import { Module } from '@nestjs/common';
import { ErrorCaptureService } from './services';
import { ErrorCaptureController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokenEntity, ErrorCaptureEntity } from '@app/database';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ErrorCaptureEntity,
      AuthTokenEntity,
    ]),
  ],
  providers: [ 
    JwtService,
    ErrorCaptureService
  ],
  controllers: [
    ErrorCaptureController
  ]
})
export class ErrorCaptureModule {}
