import { Connection } from 'mongoose';
import { DB_MODELS_KEYS, providerKeys } from 'src/constants/databaseModelsName';
import { messageSchema } from 'src/schemas/message.schema';

export const messageProvider = [
  {
    provide: providerKeys.messageProvider,
    useFactory: function (connection: Connection) {
      return connection.model(DB_MODELS_KEYS.messageModel, messageSchema);
    },
    inject: [providerKeys.dbProvider],
  },
];
