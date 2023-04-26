import { Inject, Logger } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateHrApplyDto } from './dto/HrApply.dto';
import { NotificationService } from './notification.service';
import { helpResourceApplyMsgState, HelpResourceReqMsgStatus, ReturnCode } from 'src/common/ws';
import { HelpResourceStatus, helpResourceStatus } from 'src/help_resource/entities/help_resource.entity';
import { HelpResourceService } from 'src/help_resource/help_resource.service';

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
  constructor(
    private readonly notificationService: NotificationService,
    @Inject(HelpResourceService)
    private readonly helpResourceService: HelpResourceService,
  ) {}

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

  // 发送申请
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

  // 处理申请
  @SubscribeMessage('handle-apply')
  async handleApply(@MessageBody() msgBody: { helpResourceId: number, userId: number, status: HelpResourceReqMsgStatus }, @ConnectedSocket() client: Socket) {
    return await this.notificationService.updateHrApplyStatus(msgBody.helpResourceId, msgBody.userId, msgBody.status)
  }

  // provider to receiver
  @SubscribeMessage('update-hr')
  async updateHr(@MessageBody() msgBody: { helpResourceId: number, status: HelpResourceStatus}) {
    this.logger.debug(msgBody)
    const result = await this.notificationService.updateHrStatus(msgBody.helpResourceId, msgBody.status)

    // const hr = await this.helpResourceService.findOneById(msgBody.helpResourceId, ['receiver'])
    // const receiverId = hr.receiver.id

    // // ongoing -> notice receiver
    // if(msgBody.status === helpResourceStatus.ONGOING && result.code === ReturnCode.success) {
    //   const receiverClient = this.clients.get(String(receiverId))
    //   if(receiverClient) {
    //     receiverClient.emit('appoint-event', { helpResourceId: msgBody.helpResourceId, status: helpResourceStatus.ONGOING })
    //   }
    // }

    return result
  }
}
