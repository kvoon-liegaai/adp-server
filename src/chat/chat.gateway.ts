import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayInit, WebSocketServer, OnGatewayDisconnect, WsResponse } from '@nestjs/websockets';
import { Inject, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Server } from 'typeorm';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { MessageService } from 'src/message/message.service';
import { ChatService } from './chat.service';
import { Message } from 'src/message/entity/message.entity';
import { Observable, from, map, mergeMap, of, toArray, zip } from 'rxjs'
import { User } from 'src/user/entities/user.entity';

@WebSocketGateway(4004, {
  cors: {
    // 配置 socket.io polling 跨域
    origin: [
      'https://localhost:3021',
      'https://192.168.8.105:9000',
      'https://192.168.0.153:3021',
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger()
  constructor(
    @Inject(ChatService)
    private readonly chatService: ChatService,
    @Inject(MessageService)
    private readonly messageService: MessageService
  ) {}

  @WebSocketServer()
  server: Server;

  private clients = new Map<string, Socket>();

  afterInit(server: Server) {
    console.log('chat websocket init finish: ', server)
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const userId =
      typeof client.handshake.query.userId === 'string'
        ? client.handshake.query.userId
        : void
    console.log('client.handshake.query.userId', client.handshake.query.userId)
    const id = userId ? userId : client.id
    this.clients.set(id, client);

  }

  handleDisconnect(client: Socket) {
    console.log('client disconnected: ' + client.id);
    this.clients.delete(client.id);
  }

  @SubscribeMessage('fetch-chat-history')
  async fetchChatHistory(@MessageBody() msgBody: { chatId?: number, userIdList?: [ userId1: number, userId2: number] }) {
    const { chatId, userIdList } = msgBody
    let messageList: Message[] = []

    if(chatId)
      messageList = await this.messageService.findAllByChatId(msgBody.chatId)

    else if(
      userIdList
      .filter(item => typeof item === 'number')
      .length === 2
    ) 
      messageList = await this.messageService.findAllByUserIdList(userIdList)

    return messageList
  }

  @SubscribeMessage('fetch-all-chat')
  fetchAllChat(@MessageBody() msgBody: { userId: number }): Observable<{chatId: number, targetUser: User, message: Message}[]>{
    const { userId } = msgBody
    const chatList$ = from(this.chatService.findAllByUserId(userId))

    return chatList$.pipe(
      mergeMap((chatList) => {
        return from(chatList).pipe(
          mergeMap(chat => {
            return zip(
              of(chat.id),
              from(this.chatService.findTargetUser(chat.id, userId)),
              from(this.chatService.findLatestMessage(chat.id)),
            )
            .pipe(
              map(([chatId, targetUser, message]) => ({
                chatId,
                targetUser,
                message,
              }))
            )
          }),
          toArray()
        )
      })
    )
  }

  @SubscribeMessage('sendMsg')
  async sendMsg(@MessageBody() createMsgDto: CreateMessageDto) {
    const msg =  await this.messageService.create(createMsgDto)

    // 如果接收方在线，立即发送消息
    const targetClient = this.clients.get(String(createMsgDto.targetUserId))
    if(targetClient) {
      targetClient.emit('sendMsg', msg)
    }

    return msg
  }
}
