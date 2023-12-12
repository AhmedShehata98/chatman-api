import { Connection } from 'mongoose';
import { DB_MODELS_KEYS, providerKeys } from 'src/constants/databaseModelsName';
import { feedsSchema } from 'src/schemas/feed.schema';

export const feedProvider = [
  {
    provide: DB_MODELS_KEYS.feeds,
    useFactory: (connection: Connection) =>
      connection.model(DB_MODELS_KEYS.feeds, feedsSchema),
    inject: [providerKeys.dbProvider],
  },
];
