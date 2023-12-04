import {
  Injectable,
  Inject,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { DB_MODELS_KEYS, providerKeys } from 'src/constants/databaseModelsName';
import { CreateMessageDto } from 'src/dtos/message.dto';
import { IConversation } from 'src/interfaces/conversation.interface';
import { IMessage } from 'src/interfaces/message.interface';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class ChatmanService {
  constructor(
    @Inject(providerKeys.userProvider) private userService: Model<IUser>,
    @Inject(providerKeys.conversationProvider)
    private conversationService: Model<IConversation>,
    @Inject(providerKeys.messageProvider)
    private messageService: Model<IMessage>,
    private jwtService: JwtService,
  ) {}

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      return decoded;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createMessage(createMessageDto: CreateMessageDto): Promise<IMessage> {
    try {
      const message = await new this.messageService({
        ...createMessageDto,
      }).populate([
        {
          path: 'sender',
          select: 'fullName username profilePictureUrl _id',
          model: DB_MODELS_KEYS.userModel,
        },
      ]);
      message.save();
      return message;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
