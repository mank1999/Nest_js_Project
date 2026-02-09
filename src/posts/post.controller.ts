import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './provider/post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId')
  public findPosts(@Param('userId') userId: string) {
    return this.postsService.findPosts(userId);
  }

}
