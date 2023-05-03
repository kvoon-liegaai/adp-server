import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entity/message.entity";
import { ChatModule } from "src/chat/chat.module";
import { Chat } from "src/chat/entities/chat.entity";

@Module({
  imports: [
    ChatModule,
    TypeOrmModule.forFeature([
      Message,
      Chat,
    ]),
  ],
  providers: [
    MessageService,
  ],
  exports: [
    MessageService,
  ]
})
export class MessageModule {}