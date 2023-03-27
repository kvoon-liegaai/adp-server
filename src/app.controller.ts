import { Body, Controller, Get, Inject, Post,  UseGuards, Request } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt_auth.guard';
import { LocalAuthGuard } from './auth/local_auth.guard';
import { Public } from './decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(AuthService)
    private readonly authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({summary: '登录'})
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: any) {
    return this.authService.login(user)
  }

  @ApiOperation({summary: '获取用户资料'})
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
