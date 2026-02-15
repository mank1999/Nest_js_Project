import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './provider/post.service';
import { CreatePostDto } from './dto/create.post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId')
  public findPosts(@Param('userId') userId: string) {
    return this.postsService.findPosts(userId);
  }

  @Post('/create')
  public createPost(@Body(new ValidationPipe()) createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }
}
