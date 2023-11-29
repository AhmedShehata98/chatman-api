import { Controller, Get, Post, Delete, Inject, Body } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Post()
  async createConversation(@Body() createConversationDto) {
    return 'createConversation';
  }
}
