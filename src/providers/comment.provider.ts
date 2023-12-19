import { Connection } from 'mongoose';
import { DB_MODELS_KEYS, providerKeys } from 'src/constants/databaseModelsName';
import { commentsSchema } from 'src/schemas/comments.schema';

export const commentsProvider = [
  {
    provide: providerKeys.commentsProvider,
    useFactory: (connection: Connection) =>
      connection.model(DB_MODELS_KEYS.comments, commentsSchema),
    inject: [providerKeys.dbProvider],
  },
];
