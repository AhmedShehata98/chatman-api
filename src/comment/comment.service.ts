import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { DB_MODELS_KEYS, providerKeys } from 'src/constants/databaseModelsName';
import { CreateCommentDto } from 'src/dtos/comments.dto';
import { IComment } from 'src/interfaces/comment.interface';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(providerKeys.commentsProvider)
    private commentsService: Model<IComment>,
  ) {}

  async getAllComments({
    limit = 5,
    page = 1,
    postId,
  }: {
    postId: string;
    limit: number;
    page: number;
  }) {
    try {
      const skip = (page - 1) * limit;
      const comments = await this.commentsService
        .find({ postId })
        .limit(limit)
        .skip(skip)
        .populate([
          {
            path: 'commentUser',
            model: DB_MODELS_KEYS.userModel,
            select: 'username profilePictureUrl fullName status',
          },
        ])
        .sort({ field: 'ascending', createdAt: -1 })
        .lean();
      return comments;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createNewComment(comment: CreateCommentDto) {
    try {
      const comments = await new this.commentsService({
        ...comment,
      });
      await comments.save();

      return comments;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
