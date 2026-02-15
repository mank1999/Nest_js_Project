import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/provider/user.service';
import { CreatePostDto } from '../dto/create.post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../posts.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UserService,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}
  public findPosts(userId: string) {
    const fewPosts = this.usersService.getFewPosts(userId);
    return fewPosts;
  }

  public async createPost(createPostDto: CreatePostDto) {
    try {
      const newPost = await this.postRepository.create(createPostDto);

      const Post = await this.postRepository.save(newPost);
      return Post;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
