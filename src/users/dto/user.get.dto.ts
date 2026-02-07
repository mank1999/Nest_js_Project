import { Type } from 'class-transformer';
import { IsInt, IsNumber, isNumber, isString } from 'class-validator';

export class getUserDTO {
  @IsInt()
  @Type(() => Number)
  id: number;
}
