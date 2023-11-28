import * as mongoose from 'mongoose';
import { providerKeys } from 'src/constants/databaseModelsName';

export const databaseProviders = [
  {
    provide: providerKeys.dbProvider,
    useFactory: function (): Promise<typeof mongoose> {
      return mongoose.connect(process.env.DATABASE_URL);
    },
  },
];
