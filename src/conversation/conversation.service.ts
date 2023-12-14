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
  async getUserConversation({
    query,
    userId,
  }: {
    userId: string;
    query: string;
  }): Promise<any> {
    try {
      // const regex = new RegExp(query, 'ig');
      if (query !== '' || query !== undefined) {
        let newConversation = [];
        const conversation = await this.conversationService
          .find({ participants: userId })

          .populate([
            {
              path: 'participants',
              model: DB_MODELS_KEYS.userModel,
              select: 'username profilePictureUrl fullName status',
            },

            {
              path: 'lastMessage',
              model: DB_MODELS_KEYS.messageModel,
              select: 'sender message media',
            },
          ])
          .lean()
          .finally()
          .then((conversation) => {
            const newConvers = conversation.filter((convers) => {
              const participantIdx = convers.participants.findIndex(
                (participant) => participant.id !== userId,
              );
              return convers.participants[participantIdx].fullName.includes(
                query,
              );
            });
            newConversation = newConvers;
          });
        return newConversation;
      } else {
        const conversation = await this.conversationService
          .find({ participants: userId })

          .populate([
            {
              path: 'participants',
              model: DB_MODELS_KEYS.userModel,
              select: 'username profilePictureUrl fullName status',
            },

            {
              path: 'lastMessage',
              model: DB_MODELS_KEYS.messageModel,
              select: 'sender message media',
            },
          ])
          .lean();

        return conversation;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async addLastMessage({
    conversationId,
    lastMessageId,
  }: {
    lastMessageId: string;
    conversationId: string;
  }) {
    try {
      const conversation = await this.conversationService
        .findByIdAndUpdate(conversationId, { lastMessage: lastMessageId })
        .populate([
          {
            path: 'lastMessage',
            model: DB_MODELS_KEYS.messageModel,
            select: 'sender message media',
          },
        ]);
      conversation.save();
      return conversation;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteConversation(conversationId: string) {
    try {
      const conversation = await this.conversationService.deleteOne({
        _id: conversationId,
      });
      return conversation;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
