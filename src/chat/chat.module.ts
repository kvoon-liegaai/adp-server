import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { UserModule } from 'src/user/user.module';
import { Message } from 'src/message/entity/message.entity';
import { MessageService } from 'src/message/message.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      Chat,
      Message,
    ]),
  ],
  providers: [ChatGateway, ChatService, MessageService],
  exports: [
    ChatService,
  ]
})
export class ChatModule {}
