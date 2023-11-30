import { DB_MODELS_KEYS, providerKeys } from 'src/constants/databaseModelsName';
import { Connection } from 'mongoose';
import { contactsSchema } from 'src/schemas/contacts.schema';

export const contactProvider = [
  {
    provide: providerKeys.contactProvider,
    useFactory: (connection: Connection) =>
      connection.model(DB_MODELS_KEYS.contactProvider, contactsSchema),
    inject: [providerKeys.dbProvider],
  },
];
