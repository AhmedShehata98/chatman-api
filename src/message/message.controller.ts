import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { IMessage } from 'src/interfaces/message.interface';
import { MessageService } from './message.service';

@Controller('api/message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  //   @Post()
  //   async sendMessage(@Body() createMessageDto: CreateMessageDto) {
  //     return await this.messageService.createMessage(createMessageDto);
  //   }

  @Get(':conversationId')
  async getUserMessage(@Param('conversationId') conversationId: string) {
    return await this.messageService.getUserMessages(conversationId);
  }
}
