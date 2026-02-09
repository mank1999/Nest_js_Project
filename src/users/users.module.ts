import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './provider/user.service';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [forwardRef(() => AuthModule)],
})
export class UsersModules {}
