import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './provider/auth,service';
import { UsersModules } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(()=> UsersModules)],
  exports: [AuthService],
})
export class AuthModule {}
