import { Inject, Injectable, Logger  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  logger = new Logger()
  constructor(
    @Inject(UserService)
    private readonly usersService: UserService,
    private jwtService: JwtService
  ) {}

  // 被 local 策略使用
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user 
      console.log('result',result)
      return result 
    }
    return null;
  }

  // real login unsafe
  async login(user: any) { // user without password
    const payload = { username: user.username , sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}