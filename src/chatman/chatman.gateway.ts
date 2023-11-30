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
      this.userId = decoded._id;
    });
  }
  handleDisconnect(client: Socket) {
    console.log(`DISCONNECTED CLIENT ${client.id}`);
    console.log(this.userId);
    client.off(WS_EVENT_KEY.auth, () => {});
  }

  @SubscribeMessage(WS_EVENT_KEY.joinConversation)
  async handleJoinMessage(
    client: Socket,
    {
      senderId,
      receiverId,
      conversationsId,
    }: {
      senderId: string;
      receiverId: string;
      conversationsId: string;
    },
  ) {
    const conversation = await this.chatmanService.createPrivateConversation({
      senderId: this.userId,
      receiverId,
    });
    const contact = await this.chatmanService.addContact({
      conversationId: conversation._id,
      receiverId,
    });
    const addContactToUser = await this.chatmanService.addContactToUser({
      userId: this.userId,
      contactId: contact._id,
    });
    if (conversationsId) {
      client.join(conversationsId);
    } else {
      client.join(conversation._id.toString());
    }
  }

  @SubscribeMessage(WS_EVENT_KEY.joinConversation)
  async handleSendMessage(
    client: Socket,
    {
      senderId,
      conversationsId,
    }: {
      senderId: string;
      conversationsId: string;
    },
  ) {}
}
