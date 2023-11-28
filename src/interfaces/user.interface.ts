import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  displayName: string;
  phone: string;
  profilePictureUrl: string;
  userContacts: string;
  userGroups: string;
  createdAt: string;
  updatedAt: string;
}
