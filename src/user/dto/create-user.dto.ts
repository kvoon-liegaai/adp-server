import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsStrongPassword, Length } from 'class-validator'
import { Role } from 'src/role/role.enum';

export class CreateUserDto {
  @ApiProperty()
  @Length(5,30)
  username: string;

  @ApiProperty()
  @Length(5,30)
  nickname: string;

  @ApiProperty()
  @IsStrongPassword()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @IsEnum(Role)
  role: Role[]
}
