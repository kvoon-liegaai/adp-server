import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  nickname: string

  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  describe: string


  @ApiProperty()
  @IsNumber()
  ratingScoreSum: number

  @ApiProperty()
  @IsNumber()
  serviceTimes: number
}
