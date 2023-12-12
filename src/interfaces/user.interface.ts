import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  profilePictureUrl: string;
  createdAt: string;
  updatedAt: string;
  status: StatusType;
  lastSeenDate: number;
}

export type StatusType = 'OFFLINE' | 'ONLINE' | 'IDLE';
