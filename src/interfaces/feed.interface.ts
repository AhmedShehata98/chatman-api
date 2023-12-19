import { Document } from 'mongoose';
import { IPost } from './post.interface';
import { IUser } from './user.interface';

export interface IFeeds extends Document {
  feedName: string;
  feedCover: string;
  isPrivate: boolean;
  description: string;
  owner: IUser;
  posts: IPost[];
  followers: IUser[] | string[];
  followersLength: number;
}
