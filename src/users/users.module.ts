import { AuthTokenEntity, UserEntity } from '@app/database';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers';
import { UsersService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AuthTokenEntity,
    ]),
  ],
  controllers: [
    UsersController,
  ],
  providers: [
    JwtService,
    UsersService,
  ],
  exports: [
    UsersService
  ],
})
export class UsersModule {}
