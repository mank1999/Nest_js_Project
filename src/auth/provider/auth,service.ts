import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public isAuth() {
    return true;
  }
}
