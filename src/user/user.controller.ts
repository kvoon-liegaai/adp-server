import { Controller,  Post, Body,  Inject, Get, Param, UseInterceptors, ClassSerializerInterceptor, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Public } from 'src/decorator/public.decorator';
import { ParseIntPipe } from '@nestjs/common'; 
import { UpdateUserDto } from './dto/update-user.dto';

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
  async register(@Body() createUser: CreateUserDto) {
    return await this.userService.register(createUser);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @ApiResponse({ status: 201, type: [User] })
  // 不返回密码
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    console.log('id',id)

    const user = await this.userService.getProfileByUserId(id);
    return user
  }

  @Patch()
  async updateUser(@Body() updateUser: UpdateUserDto, @Req() req) {
    return await this.userService.updateUser(req.user.id, updateUser)
  }
}
