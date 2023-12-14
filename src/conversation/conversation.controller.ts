import {
  Controller,
  Get,
  Post,
  Put,
  Request,
  Delete,
  Inject,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from 'src/dtos/conversation.dto';
import { AuthGuard } from 'src/app.guard';
import { Request as ExpressRequest } from 'express';

@Controller('/api/conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createConversation(
    @Body() createConversationDto: CreateConversationDto,
  ) {
    return await this.conversationService.createConversation(
      createConversationDto,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUserConversation(
    @Request() req: ExpressRequest,
    @Query('q') q: string,
  ) {
    const { userId } = req.params;
    return await this.conversationService.getUserConversation({
      userId,
      query: q,
    });
  }

  @Put()
  @UseGuards(AuthGuard)
  async addLastMessage(
    @Body('conversationId') conversationId: string,
    @Body('lastMessageId') lastMessageId: string,
  ) {
    return await this.conversationService.addLastMessage({
      conversationId,
      lastMessageId,
    });
  }

  @Delete('/:conversationId')
  @UseGuards(AuthGuard)
  async deleteConversation(@Param('conversationId') conversationId: string) {
    return await this.conversationService.deleteConversation(conversationId);
  }
}
