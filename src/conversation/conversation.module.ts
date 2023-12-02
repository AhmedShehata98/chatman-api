import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { conversationProvider } from 'src/providers/conversation.provider';
import { ConversationController } from './conversation.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ConversationController],
  providers: [...conversationProvider, ConversationService],
})
export class ConversationModule {}
