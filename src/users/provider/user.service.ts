import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { AuthService } from 'src/auth/provider/auth,service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public findAll(id: number, page: number, offset: number) {
    const isAuth = this.authService.isAuth();

    console.log(isAuth);
    return [
      {
        name: 'manish',
        email: 'manish@gm.com',
      },
      {
        name: 'alice',
        email: 'alice@gm.com',
      },
    ];
  }

  public getFewPosts(param: string) {
    return {
      topic: 'biology',
      id: 12,
      user: 'Ventec',
    };
  }
}
