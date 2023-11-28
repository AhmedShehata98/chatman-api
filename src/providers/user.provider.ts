import { Connection } from 'mongoose';
import { userSchema } from '../schemas/user.schema';
import { DB_MODELS_KEYS, providerKeys } from 'src/constants/databaseModelsName';

export const userProviders = [
  {
    provide: providerKeys.userProvider,
    useFactory: (connection: Connection) =>
      connection.model(DB_MODELS_KEYS.userModel, userSchema),
    inject: [providerKeys.dbProvider],
  },
];
