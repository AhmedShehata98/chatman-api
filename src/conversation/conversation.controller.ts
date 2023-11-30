import {
  Controller,
  Get,
  Post,
  Request,
  Delete,
  Inject,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from 'src/dtos/conversation.dto';
import { AuthGuard } from 'src/app.guard';
import { Request as ExpressRequest } from 'express';

@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Post()
  async createConversation(
    @Body() createConversationDto: CreateConversationDto,
  ) {
    return await this.conversationService.createConversation(
      createConversationDto,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUserConversation(@Request() req: ExpressRequest) {
    const { userId } = req.params;
    return await this.conversationService.getConversation(userId);
  }
}
