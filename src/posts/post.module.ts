import { UsersModules } from 'src/users/users.module';
import { PostController } from './post.controller';
import { PostsService } from './provider/post.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './posts.entity';

@Module({
  controllers: [PostController],
  providers: [PostsService],
  imports: [UsersModules,TypeOrmModule.forFeature([PostEntity])], // for using user service function to add in import UserModules here
})
export class PostModule {}
