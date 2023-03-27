import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @Length(10,30)
  username: string;

  @ApiProperty()
  @Length(10,30)
  nickname: string;

  @ApiProperty()
  // @IsStrongPassword()
  @IsString()
  password: string;

  @ApiProperty()
  // @IsEmail()
  @IsString()
  email: string;
}
