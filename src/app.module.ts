import { BootingModule } from '@app/booting';
import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BootingModule,
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
