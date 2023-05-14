import { Dependencies, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core/constants';
import { JwtAuthGuard } from './auth/jwt_auth.guard';
import { RolesGuard } from './role/role.guard';
import { ChatModule } from './chat/chat.module';
import { HelpResourceModule } from './help_resource/help_resource.module';
import { HelpResource } from './help_resource/entities/help_resource.entity';
import { User } from './user/entities/user.entity';
import { DataSource } from 'typeorm';
import { EvaluationModule } from './evaluation/evaluation.module';
import { NotificationModule } from './notification/notification.module';
import { HrApply } from './notification/entities/hr-apply.entity';
import { HrRecordModule } from './hr_record/hr_record.module';
import { HrRecord } from './hr_record/entities/hr_record.entity';
import { Evaluation } from './evaluation/entities/evaluation.entity';
import { Chat } from './chat/entities/chat.entity';
import { Message } from './message/entity/message.entity';
import { MessageService } from './message/message.service';
import { MessageModule } from './message/message.module';

@Dependencies(DataSource)
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
      password: '1234',
      database: 'aid-platform-db',
      entities: [
        User,
        HelpResource,
        HrApply,
        HrRecord,
        Evaluation,
        Chat,
        Message,
      ],
      // "entities": [
      //   __dirname + "entities/**/*.entity.ts"
      // ],

      migrationsRun: true,
      // synchronize: true,
    }),
    UserModule,
    AuthModule,
    HelpResourceModule,
    EvaluationModule,
    NotificationModule,
    HrRecordModule,
    ChatModule,
    MessageModule,
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
export class AppModule {
  dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }
}
