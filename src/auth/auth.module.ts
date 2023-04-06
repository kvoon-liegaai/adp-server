import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

const day = (num: number) => 60 * 24 * num

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: `${day(7)}s` },
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [ AuthService ],
})
export class AuthModule {}