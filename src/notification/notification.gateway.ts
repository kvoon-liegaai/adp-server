import { Logger } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateHrApplyDto } from './dto/HrApply.dto';
import { NotificationService } from './notification.service';
import { HelpResourceReqMsgStatus, ReturnCode } from 'src/common/ws';

@WebSocketGateway(4003, {
  cors: {
    // 配置 socket.io polling 跨域
    origin: [
      'https://localhost:9000',
      'https://192.168.8.105:9000',
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
})
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger()
  constructor(private readonly notificationService: NotificationService) {}

  @WebSocketServer()
  server: Server;

  private clients = new Map<string, Socket>();

  afterInit(server: Server) {
    console.log('websocket init finish: ', server)
  }

  handleConnection(client: Socket, ...args: any[]) {
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

  @SubscribeMessage('apply-hr')
  async apply(@MessageBody() createHrApplyDto: CreateHrApplyDto, @ConnectedSocket() client: Socket) {
    const result = await this.notificationService.createHrApply(createHrApplyDto)

    // 如果接收方在线，立即发送消息
    if(result.code === ReturnCode.success) {
      const providerClient = this.clients.get(String(createHrApplyDto.providerId))
      if(providerClient) {
        providerClient.emit('apply-hr', { userId: createHrApplyDto.userId, helpResourceId: createHrApplyDto.helpResourceId })
      }
    }

    return result
  }

  @SubscribeMessage('update-hr')
  async reject(@MessageBody() msgBody: { helpResourceId: number, userId: number, status: HelpResourceReqMsgStatus }, @ConnectedSocket() client: Socket) {
    return await this.notificationService.updateHrApplyStatus(msgBody.helpResourceId, msgBody.userId, msgBody.status)
  }
}
