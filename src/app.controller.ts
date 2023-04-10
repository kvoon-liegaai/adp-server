import { Body, Controller, Get, Inject, Post,  UseGuards, Request, Logger } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt_auth.guard';
import { LocalAuthGuard } from './auth/local_auth.guard';
import { Public } from './decorator/public.decorator';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)
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
    const theUser = await this.authService.login(user)
    this.logger.debug('theUser', theUser);
    return theUser
  }

  @ApiOperation({summary: '获取用户资料'})
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('req',req.user)
    return req.user;
  }
}
