import { Controller,  Post, Body,  Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Public } from 'src/decorator';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({ status: 201, type: [User] })
  @Public()
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }
}
