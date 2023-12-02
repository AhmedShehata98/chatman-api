import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { DB_MODELS_KEYS, providerKeys } from 'src/constants/databaseModelsName';
import { CreateConversationDto } from 'src/dtos/conversation.dto';
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
        conversationAdmin: createConversationDto.conversationAdmin,
        conversationName: createConversationDto.conversationName,
        conversationDescription: createConversationDto.conversationDescription,
        conversationImage: createConversationDto.conversationImage,
      });
      await conversation.save();
      return conversation;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getUserConversation(userId: string): Promise<any> {
    try {
      const conversation = await this.conversationService
        .find({ participants: userId })
        .populate({
          path: 'participants',
          model: DB_MODELS_KEYS.userModel,
          select: 'username profilePictureUrl fullName',
        })
        .lean();
      return conversation;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
