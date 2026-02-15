import {
  Injectable,
  forwardRef,
  Inject,
  BadGatewayException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/provider/auth,service';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dto/create.user.dto';
import { SignInUserDTO } from '../dto/signIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptProvider } from './bscrypt.provider';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    //inject auth service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    //inject UserEntity
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    //inject BcryptProvider
    @Inject()
    private bcryptProvider: BcryptProvider,

    //inject jwtService
    private readonly jwtService: JwtService,
    //inject JWT env Config
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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

  public async createUser(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.UserRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (existingUser) {
        throw new BadRequestException('User already exist with mail id');
      }

      let newUser = this.UserRepository.create({
        ...createUserDto,
        password: await this.bcryptProvider.hashPassword(
          createUserDto.password,
        ),
      });

      newUser = await this.UserRepository.save(newUser);
      return newUser;
    } catch (error) {
      return error;
    }
  }

  public async signInuser(signInUserDTO: SignInUserDTO) {
    try {
      let user = await this.UserRepository.findOne({
        where: { email: signInUserDTO.email },
      });

      if (!user) {
        return new BadGatewayException('no user find out with this mmail id');
      }
      console.log(user.password);
      const verifyPass = await this.bcryptProvider.comparePassword(
        signInUserDTO.password,
        user.password,
      );
      console.log(verifyPass)
      if (!verifyPass) {
        return new BadGatewayException('Incorrect Password');
      }

      // Generate access token
      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      );
      return {
        accessToken,
      };
    } catch (error) {
      return new BadGatewayException(error);
    }
  }
}
