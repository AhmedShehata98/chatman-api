import { Connection } from 'mongoose';
import { DB_MODELS_KEYS, providerKeys } from 'src/constants/databaseModelsName';
import { postSchema } from 'src/schemas/post.schema';

export const postProvider = [
  {
    provide: providerKeys.postsProvider,
    useFactory: (connection: Connection) =>
      connection.model(DB_MODELS_KEYS.posts, postSchema),
    inject: [providerKeys.dbProvider],
  },
];
