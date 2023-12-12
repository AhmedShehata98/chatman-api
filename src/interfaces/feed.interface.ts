import { IPost } from './post.interface';
import { IUser } from './user.interface';

export interface IFeeds {
  feedName: string;
  feedCover: string;
  isPrivate: boolean;
  description: string;
  owner: IUser;
  posts: IPost[];
  followers: IUser[] | string[];
  followersLength: number;
}
