import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatService } from 'src/chat/chat.service';
import { Chat } from 'src/chat/entities/chat.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    @Inject(ChatService)
    private readonly chatService: ChatService,
  ) {}

  async create(createMsgDto: CreateMessageDto) {
    const { userId, targetUserId, chatId } = createMsgDto
    console.log('createMsgDto',createMsgDto)

    let chat: Chat
    if(!chat && chatId)
      chat = await this.chatService.findById(chatId)
      console.log('chat1', chat)
    if(!chat && userId && targetUserId)
      chat = await this.chatService.findByUserIdList([ userId, targetUserId ])

    console.log('chat',chat)
    
    if(!chat)
      chat = await this.chatService.create({
        userId1: userId,
        userId2: targetUserId
      })
    
    const msg = new Message()
    msg.chat = chat
    msg.content = createMsgDto.content
    msg.userId = createMsgDto.userId
    msg.messageType = createMsgDto.messageType

    return await this.messageRepo.save(msg)
  }

  async find(id: number) {
    return await this.messageRepo.findOne({ where: { id } })
  }

  async findAllByChatId(chatId: number) {
    const chat = await this.chatService.findById(chatId)
    return chat.messages
  }

  // message.service.ts
  async findAllByUserIdList(userIdList: [ userId1: number, userId2: number ]): Promise<Message[]>{
    const chatId = (await this.chatService.findByUserIdList(userIdList)).id
    return await this.chatService.findAllMessage(chatId)
  }
}
