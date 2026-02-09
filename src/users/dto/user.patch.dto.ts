import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from './create.user.dto';

import { PartialType } from '@nestjs/swagger';

export class updateCreateUserDto extends PartialType(CreateUserDto) {}
