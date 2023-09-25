import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/database';
import { JwtStratergy } from '@app/booting';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ])
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    JwtStratergy,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule {}
