import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { AuthService } from 'src/auth/provider/auth,service';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dto/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
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

  public async createUser(CreateUserDto: CreateUserDto) {
    const existingUser = await this.UserRepository.findOne({
      where: {
        email: CreateUserDto.email,
      },
    });

    if (existingUser) {
      return 'user already exist';
    }

    let newUser = this.UserRepository.create(CreateUserDto);

    newUser = await this.UserRepository.save(newUser);
    return newUser;
  }
}
