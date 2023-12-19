import { Document } from 'mongoose';
import { IFeeds } from './feed.interface';
import { IUser } from './user.interface';

export interface IPost extends Document {
  _id: string;
  publisher: string;
  feedRoom: IFeeds;
  content: {
    text: string;
    media: string;
  };
  comments: Array<string>;
  share: {
    shareCount: number;
    shareUser: string;
  };
  reaction: IUser[];
}
