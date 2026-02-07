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

//localhost:3000/users
@Controller('users')
export class UserController {
  @Get('/:id/:sample')
  public getUser(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', new DefaultValuePipe(27), ParseIntPipe) page: number,
    @Query('offset', new DefaultValuePipe(1), ParseIntPipe) offset: number,
  ) {
    console.log(typeof id);
    console.log(page);
    console.log('offset', offset);
    return 'hello from users routes';
  }

  @Get('/user/:id')
  public findUser(@Param( new ValidationPipe()) param : getUserDTO){
    console.log(getUserDTO)
    return 'user find successfully'
  }


  @Post('/create')
  public createUser(
    @Body(new ValidationPipe()) createUserReq : CreateUserDto ,
    @Headers() header: any,
  ) {

    console.log(createUserReq)
    console.log(header);
    // console.log(body);
    return 'User created successfully';
  }
}
