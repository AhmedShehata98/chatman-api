import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { providerKeys } from 'src/constants/databaseModelsName';
import { IContact } from 'src/interfaces/contact.interface';
import { IConversation } from 'src/interfaces/conversation.interface';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class ChatmanService {
  constructor(
    @Inject(providerKeys.userProvider) private userService: Model<IUser>,
    @Inject(providerKeys.conversationProvider)
    private conversationService: Model<IConversation>,
    @Inject(providerKeys.contactProvider)
    private contactService: Model<IContact>,
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
  async createPrivateConversation({
    senderId,
    receiverId,
  }: {
    senderId: string;
    receiverId: string;
  }): Promise<IConversation> {
    try {
      const conversation = await new this.conversationService({
        participants: [senderId, receiverId],
        conversationType: 'PRIVATE',
      });
      return conversation;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async addContactToUser({
    contactId,
    userId,
  }: {
    contactId: string;
    userId: string;
  }) {
    try {
      const user = await this.userService.findByIdAndUpdate(userId, {
        userContacts: [
          {
            user: contactId,
          },
        ],
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async addContact({
    conversationId,
    receiverId,
  }: {
    conversationId: string;
    receiverId: string;
  }) {
    try {
      const contact = await new this.contactService({
        user: receiverId,
        conversation: conversationId,
      });
      return contact;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
