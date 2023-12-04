import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
import { CreateMessageDto, CreateTypingDto } from 'src/dtos/message.dto';

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class ChatmanGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private chatmanService: ChatmanService) {}
  private readonly logger = new Logger(ChatmanGateway.name);
  @WebSocketServer() io: Server;

  async afterInit(server: any) {
    this.logger.log('initialized websocket server ✅');
  }

  handleConnection(client: Socket) {
    console.log(`CONNECTED CLIENT ${client.id}`);

    client.on(WS_EVENT_KEY.auth, async (payload) => {
      const { token } = payload;
      if (!token) throw new NotFoundException(`Auth token not found`);
      const decoded = (await this.chatmanService.verifyToken(token)) as any;
      if (!decoded)
        throw new UnauthorizedException('Unauthorized user try again');
    });
  }
  async handleDisconnect(client: Socket) {
    console.log(`DISCONNECTED CLIENT ${client.id}`);
    client.off(WS_EVENT_KEY.auth, () => {});
    client.off(WS_EVENT_KEY.joinConversation, () => {});
    client.off(WS_EVENT_KEY.typing, () => {});
    client.off(WS_EVENT_KEY.message, () => {});
  }

  @SubscribeMessage(WS_EVENT_KEY.joinConversation)
  handleJoinConversation(client: Socket, conversationsId: string) {
    client.join(conversationsId);
    console.log('Joined to room : ' + conversationsId);
  }

  @SubscribeMessage(WS_EVENT_KEY.message)
  async handleSendMessage(client: Socket, payload: CreateMessageDto) {
    const message = await this.chatmanService.createMessage(payload);
    return this.io
      .to(payload.conversationId)
      .emit(WS_EVENT_KEY.incomingMessage, message);
  }

  @SubscribeMessage(WS_EVENT_KEY.typing)
  handleBroadcastTyping(client: Socket, payload: CreateTypingDto) {
    return this.io
      .to(payload.conversationId)
      .emit(WS_EVENT_KEY.typing, payload);
  }
  @SubscribeMessage(WS_EVENT_KEY.finishTyping)
  handleBroadcastFinishTyping(client: Socket, payload) {
    return this.io
      .to(payload.conversationId)
      .emit(WS_EVENT_KEY.finishTyping, payload);
  }
}
