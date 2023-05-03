import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UserService } from 'src/user/user.service';
import { Message } from 'src/message/entity/message.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChatService {
  private readonly logger = new Logger()
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
    @Inject(UserService)
    private readonly userService: UserService,
  ) { }

  async create(createChatDto: CreateChatDto) {
    this.logger.debug('create chat')
    // create chat
    const user1 = await this.userService.findOneById(createChatDto.userId1)
    const user2 = await this.userService.findOneById(createChatDto.userId2)
    const chat = new Chat()
    chat.users = [user1, user2]
    // chat.users.push(user1)
    // chat.users.push(user2)

    return await this.chatRepo.save(chat)
  }

  // find all by one user id ( without relation )
  async findAllByUserId(userId: number): Promise<Chat[]> {
    return await this.chatRepo.find({
      where: {
        users: { id: userId }
      }
    })
  }

  // fine one by chat id
  async findById(id: number) {
    return await this.chatRepo.findOne({ where: { id } })
  }


  //without relation
  async findByUserIdList(userIdList: [userId1: number, userId2: number]): Promise<Chat> {
    const [userId1, userId2] = userIdList
    const result = await this.chatRepo
      .createQueryBuilder('chat') // 指定查询的实体为chat
      .leftJoinAndSelect('chat.users', 'user') // 添加左连接查询条件，连接chat的users字段与User实体
      .where(qb => {
        const subquery1 = qb
          .subQuery()
          .select('chat.id')
          .from('chat', 'chat')
          .leftJoin('chat.users', 'user1')
          .where('user1.id = :user1Id', { user1Id: userId1 })
          .getQuery();

        const subquery2 = qb
          .subQuery()
          .select('chat.id')
          .from('chat', 'chat')
          .leftJoin('chat.users', 'user2')
          .where('user2.id = :user2Id', { user2Id: userId2 })
          .getQuery();
          
        return 'chat.id IN (' + subquery1 + ') AND chat.id IN (' + subquery2 + ')';
      })
      .getOne();

    console.log('result2',result)

    return result
  }

  async findAllMessage(chatId: number): Promise<Message[]> {
    const chat = await this.chatRepo.findOne({
      where: {
        id: chatId
      },
      relations: ['messages']
    })
    return chat.messages
  }

  async findLatestMessage(chatId: number) {
    const messages = await this.findAllMessage(chatId)
    return messages[messages.length - 1]
  }

  async findAllUser(chatId: number): Promise<User[]> {
    const chat = await this.chatRepo.findOne({
      where: {
        id: chatId
      },
      relations: ['users']
    })
    return chat.users
  }

  async findLatestUser(chatId: number) {
    const users = await this.findAllUser(chatId)
    return users[users.length - 1]
  }

  async findTargetUser(chatId: number, userId: number) {
    const chat = await this.chatRepo.findOne({
      where: {
        id: chatId,
      },
      relations: ['users']
    })

    return chat.users.find(user => user.id !== userId)
  }
}
