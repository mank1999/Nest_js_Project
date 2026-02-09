import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/provider/user.service';
@Injectable()
export class PostsService {
  constructor(private readonly usersService: UserService) {}
  public findPosts(userId: string) {
    const fewPosts = this.usersService.getFewPosts(userId);
    return fewPosts;
  }
}
