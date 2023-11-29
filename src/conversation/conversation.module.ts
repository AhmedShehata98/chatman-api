import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { conversationProvider } from 'src/providers/conversation.provider';
import { ConversationController } from './conversation.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ConversationController],
  providers: [ConversationService, ...conversationProvider],
})
export class ConversationModule {}
