import { Module } from '@nestjs/common';
import { CoreModule } from '@app/core';
import { DatabaseModule } from '@app/database';
import { AuthModule } from './auth';
import { CorsAllowedDomainModule } from './cors-allowed-domain';
import { ErrorCaptureModule } from './error-capture';
import { UsersModule } from './users';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    ErrorCaptureModule,
    CorsAllowedDomainModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
