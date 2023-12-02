import { Document } from 'mongoose';

export interface IMessage extends Document {
  _id: string;
  conversationId: string;
  sender: string;
  message: string;
  media: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
