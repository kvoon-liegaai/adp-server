import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core/constants';
import { JwtAuthGuard } from './auth/jwt_auth.guard';
import { RolesGuard } from './role/role.guard';
import { HelpModule } from './help/help.module';
import { ChatModule } from './chat/chat.module';
import { HelpResourceModule } from './help_resource/help_resource.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // password: '1',
      // co
      password: '1234',
      database: 'aid-platform-db',
      entities: [ User ],
      // synchronize: true,
    }),
    UserModule,
    AuthModule,
    HelpModule,
    ChatModule,
    HelpResourceModule
  ] ,
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
