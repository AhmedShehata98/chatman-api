import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { providerKeys } from 'src/constants/databaseModelsName';
import {
  CreateConversationDto,
  UserConversationDto,
} from 'src/dtos/conversation.dto';
import { IConversation } from 'src/interfaces/conversation.interface';

@Injectable()
export class ConversationService {
  constructor(
    @Inject(providerKeys.conversationProvider)
    private conversationService: Model<IConversation>,
  ) {}

  async createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<IConversation> {
    try {
      const conversation = await new this.conversationService({
        participants: createConversationDto.participants,
        conversationType: createConversationDto.conversationType,
      });
      await conversation.save();
      return conversation;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getConversation(userId: string): Promise<any> {
    try {
      const conversation = await this.conversationService.find({ _id: userId });
      return conversation;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
