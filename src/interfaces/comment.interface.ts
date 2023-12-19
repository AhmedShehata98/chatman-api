import { IUser } from './user.interface';

export interface IComment {
  _id: string;
  postId: string;
  commentUser: IUser;
  comment: {
    text: string;
    media: string;
  };
  createdAt: string;
  updatedAt: string;
}
