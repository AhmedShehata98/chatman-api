import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { DB_MODELS_KEYS, providerKeys } from 'src/constants/databaseModelsName';
import { createPostDto } from 'src/dtos/post.dto';
import { IPost } from 'src/interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(
    @Inject(providerKeys.postsProvider) private postService: Model<IPost>,
  ) {}

  async createPost(post: createPostDto) {
    try {
      const postResult = await new this.postService({
        ...post,
      }).populate([
        {
          path: 'publisher',
          model: DB_MODELS_KEYS.userModel,
        },
        {
          path: 'feedRoom',
          model: DB_MODELS_KEYS.feeds,
        },
      ]);
      postResult.save();
      return postResult;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllPosts({
    feedId,
    limit = 8,
    page = 1,
  }: {
    feedId: string;
    limit: number;
    page: number;
  }) {
    try {
      const skip = (page - 1) * limit;
      const posts = await this.postService
        .find({ feedRoom: feedId })
        .populate([
          {
            path: 'publisher',
            model: DB_MODELS_KEYS.userModel,
          },
          {
            path: 'feedRoom',
            model: DB_MODELS_KEYS.feeds,
          },
        ])
        .limit(limit)
        .skip(skip);
      const totalPosts = await this.postService.countDocuments();

      return { total: totalPosts, posts };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
