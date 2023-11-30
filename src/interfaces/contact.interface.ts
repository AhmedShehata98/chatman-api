import { Document } from 'mongoose';

export interface IContact extends Document {
  _id: string;
  user: string;
  conversation: string;
  createdAt: string;
  updatedAt: string;
}
