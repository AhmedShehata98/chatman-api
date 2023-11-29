import { Connection } from 'mongoose';
import { DB_MODELS_KEYS, providerKeys } from 'src/constants/databaseModelsName';
import { conversationSchema } from 'src/schemas/conversation.schema';

export const conversationProvider = [
  {
    provide: providerKeys.conversationProvider,
    useFactory: (connection: Connection) =>
      connection.model(DB_MODELS_KEYS.conversationModel, conversationSchema),
    inject: [providerKeys.conversationProvider],
  },
];
