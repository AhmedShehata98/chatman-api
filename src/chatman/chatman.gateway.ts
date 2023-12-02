import { Logger, NotFoundException } from '@nestjs/common';
import {
  SubscribeMessage,
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChatmanService } from './chatman.service';
import { WS_EVENT_KEY } from 'src/constants/websocketEvents';
import { CreateMessageDto } from 'src/dtos/message.dto';

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class ChatmanGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private userId: string;
  constructor(private chatmanService: ChatmanService) {}
  private readonly logger = new Logger(ChatmanGateway.name);
  @WebSocketServer() io: Server;
  //
  // @SubscribeMessage(WS_EVENT_KEY.auth)
  // handleMessage(client: any, payload: any): string {
  //   console.log('line 27');
  //   console.log(payload);
  //   return 'hello';
  // }
  async afterInit(server: any) {
    this.logger.log('initialized websocket server ✅');
  }

  handleConnection(client: Socket) {
    console.log(`CONNECTED CLIENT ${client.id}`);

    client.on(WS_EVENT_KEY.auth, async (payload) => {
      const { token } = payload;
      if (!token) throw new NotFoundException(`Auth token not found`);
      const decoded = (await this.chatmanService.verifyToken(token)) as any;
      this.chatmanService.changeUserStatus({
        userId: decoded._id,
        status: 'ONLINE',
      });
      this.chatmanService.changeUserLastSeen({
        userId: decoded._id,
        lastSeen: Date.now(),
      });
      this.userId = decoded._id;
    });
  }
  handleDisconnect(client: Socket) {
    console.log(`DISCONNECTED CLIENT ${client.id}`);
    this.chatmanService.changeUserStatus({
      userId: this.userId,
      status: 'OFFLINE',
    });
    this.chatmanService.changeUserLastSeen({
      userId: this.userId,
      lastSeen: Date.now(),
    });

    client.off(WS_EVENT_KEY.auth, () => {});
  }

  @SubscribeMessage(WS_EVENT_KEY.joinConversation)
  handleJoinConversation(client: Socket, conversationsId: string) {
    client.join(conversationsId);
    console.log(client.rooms);
  }

  @SubscribeMessage(WS_EVENT_KEY.message)
  async handleSendMessage(client: Socket, payload: CreateMessageDto) {
    const message = await this.chatmanService.createMessage(payload);
    return this.io
      .to(payload.conversationId)
      .emit(WS_EVENT_KEY.incomingMessage, message);
  }
}
