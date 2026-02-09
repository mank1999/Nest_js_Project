import { Controller, Post } from '@nestjs/common';
import { UserService } from 'src/users/provider/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  //   @Post()
  // //   public login(id:string,user){}

  // public isAuth() {
  //   return 'Sample_token';
  // }
}
