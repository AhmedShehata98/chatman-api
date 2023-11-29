import { Document } from 'mongoose';
import { IUser } from './user.interface';

export interface IConversation extends Document {
  _id: string;
  participants: Array<IUser>;
  conversationType: 'PRIVATE' | 'GROUP';
  createdAt: string;
  updatedAt: string;
}
