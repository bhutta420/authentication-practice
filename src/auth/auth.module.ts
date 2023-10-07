import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { UsersService } from 'src/users';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokenEntity, UserEntity } from '@app/database';
import { JwtService } from '@nestjs/jwt';
import { EncryptionsServices } from '@app/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AuthTokenEntity,
    ]),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    JwtService,
    AuthService,
    UsersService,
    EncryptionsServices
  ],
})
export class AuthModule {}
