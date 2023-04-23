import { Logger } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'typeorm';
import { CreateHrApplyDto } from './dto/HrApply.dto';
import { NotificationService } from './notification.service';

@WebSocketGateway(4003, {})
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger()
  constructor(private readonly notificationService: NotificationService) {}

  @WebSocketServer()
  server: Server;

  private clients = new Map();

  afterInit(server: Server) {
    console.log('websocket init finish: ', server)
  }

  handleConnection(client: any, ...args: any[]) {
    const userId = args[0]?.query?.userId;
    console.log('userId', args[0]?.query)
    const id = userId ? userId : client.id
    console.log('client connected: ' + id);
    this.clients.set(id, client);
  }

  handleDisconnect(client: any) {
    console.log('client disconnected: ' + client.id);
    this.clients.delete(client.id);
  }

  @SubscribeMessage('apply-hr')
  apply(@MessageBody() data: CreateHrApplyDto, @ConnectedSocket() client: Socket) {
    const result = this.notificationService.create(data)
    return
  }

  @SubscribeMessage('agree')
  agree() {
    return 
  }
}
