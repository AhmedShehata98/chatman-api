import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { DB_MODELS_KEYS, providerKeys } from 'src/constants/databaseModelsName';
import { IMessage } from 'src/interfaces/message.interface';

@Injectable()
export class MessageService {
  constructor(
    @Inject(providerKeys.messageProvider)
    private messageService: Model<IMessage>,
  ) {}
  //   async createMessage(createMessageDto: CreateMessageDto): Promise<IMessage> {
  //     try {
  //       const message = await new this.messageService({
  //         ...createMessageDto,
  //       });
  //       message.save();
  //       return message;
  //     } catch (error) {
  //       throw new InternalServerErrorException(error);
  //     }
  //   }

  async getUserMessages(conversationId: string): Promise<IMessage[]> {
    try {
      const messages = await this.messageService
        .find({ conversationId })
        .populate([
          {
            path: 'sender',
            select: 'fullName username profilePictureUrl _id',
            model: DB_MODELS_KEYS.userModel,
          },
        ]);
      return messages;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async clearMessages(conversationId: string) {
    try {
      const messages = await this.messageService.deleteMany({ conversationId });
      return { deletedMessagesCount: messages.deletedCount };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteMessageById(messageId: string) {
    try {
      const messages = await this.messageService.findByIdAndDelete({
        _id: messageId,
      });
      return messages;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
