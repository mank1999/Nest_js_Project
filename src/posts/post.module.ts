import { UsersModules } from 'src/users/users.module';
import { PostController } from './post.controller';
import { PostsService } from './provider/post.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PostController],
  providers: [PostsService],
  imports: [UsersModules], // for using user service function to add in import UserModules here
})
export class PostModule {}
