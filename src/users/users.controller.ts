import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  Headers,
  Head,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { getUserDTO } from './dto/user.get.dto';
import { updateCreateUserDto } from './dto/user.patch.dto';
import { UserService } from './provider/user.service';
//localhost:3000/users

//service nothing but api bussines logic how its perform
@Controller('users')
export class UserController {
  //injecting user service (adding instance of user service)
  constructor(private readonly userService: UserService) {}

  @Get('/:id/:sample')
  public getUser(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', new DefaultValuePipe(27), ParseIntPipe) page: number,
    @Query('offset', new DefaultValuePipe(1), ParseIntPipe) offset: number,
  ) {
    console.log(typeof id);
    console.log(page);
    console.log('offset', offset);
    return this.userService.findAll(id, page, offset);
  }

  @Get('/user/:id')
  public findUser(@Param(new ValidationPipe()) param: getUserDTO) {
    console.log(getUserDTO);
    return "user data get"
  }

  @Post('/create')
  public createUser(
    @Body(new ValidationPipe()) createUserReq: CreateUserDto,
    @Headers() header: any,
  ) {
    console.log(createUserReq);
    console.log(header);
    // console.log(body);
    return 'User created successfully';
  }

  @Patch('/update')
  public updateUser(
    @Body(new ValidationPipe()) updateUserDto: updateCreateUserDto,
  ) {
    return 'user update successfully';
  }
}
