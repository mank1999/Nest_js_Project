import { CreateUserDto } from './create.user.dto';

import { PickType } from '@nestjs/swagger';

export class SignInUserDTO extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
