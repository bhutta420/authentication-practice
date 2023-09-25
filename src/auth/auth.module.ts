import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { UserService } from 'src/user/services';
import { LocalStratergy } from './strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { JwtCustomService } from '@app/booting';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    JwtCustomService,
    JwtService,
    AuthService,
    UserService,
    LocalStratergy,
  ],
})
export class AuthModule {}
