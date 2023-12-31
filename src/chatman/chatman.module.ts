import { Module } from '@nestjs/common';
import { ChatmanGateway } from './chatman.gateway';
import { ChatmanService } from './chatman.service';
import { userProviders } from 'src/providers/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { conversationProvider } from 'src/providers/conversation.provider';
import { messageProvider } from 'src/providers/message.provider';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    ChatmanGateway,
    ChatmanService,
    ...userProviders,
    ...conversationProvider,
    ...messageProvider,
  ],
})
export class ChatmanModule {}
