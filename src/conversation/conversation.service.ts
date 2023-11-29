import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { providerKeys } from 'src/constants/databaseModelsName';
import { IConversation } from 'src/interfaces/conversation.interface';

@Injectable()
export class ConversationService {
  constructor(
    @Inject(providerKeys.conversationProvider)
    private conversationService: Model<IConversation>,
  ) {}
}
