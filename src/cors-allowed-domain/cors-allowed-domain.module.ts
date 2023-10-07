import { AuthTokenEntity, CorsAllowDomainEntity } from '@app/database';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorsAllowedDomainController } from './controllers';
import { CorsAllowedDomainService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CorsAllowDomainEntity,
      AuthTokenEntity,
    ])
  ],
  providers: [
    JwtService,
    CorsAllowedDomainService,
  ],
  controllers: [
    CorsAllowedDomainController,
  ],
})
export class CorsAllowedDomainModule {}
