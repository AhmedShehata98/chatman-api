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
      await postResult.save();
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
            select: 'fullName username',
          },
          {
            path: 'feedRoom',
            model: DB_MODELS_KEYS.feeds,
            select: 'feedCover feedName',
          },
          {
            path: 'reaction',
            model: DB_MODELS_KEYS.userModel,
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

  async getOnePost(postId: string) {
    try {
      const post = await this.postService.findOne({ _id: postId }).populate([
        {
          path: 'publisher',
          model: DB_MODELS_KEYS.userModel,
          select: 'fullName username',
        },
        {
          path: 'feedRoom',
          model: DB_MODELS_KEYS.feeds,
          select: 'feedCover feedName',
        },
        {
          path: 'reaction',
          model: DB_MODELS_KEYS.userModel,
        },
      ]);

      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getReactions({ postId }: { postId: string }) {
    try {
      const postReactions = await this.postService
        .find({ _id: postId })
        .select('reaction')
        .populate('reaction', 'fullName username', DB_MODELS_KEYS.userModel);
      return postReactions;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addReaction({ postId, userId }: { postId: string; userId: string }) {
    try {
      const feed = await this.postService
        .findOneAndUpdate({ _id: postId }, { $push: { reaction: userId } })
        .populate('reaction', 'fullName username', DB_MODELS_KEYS.userModel);
      await feed.save();
      return feed;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async removeReaction({ postId, userId }: { postId: string; userId: string }) {
    try {
      const feed = await this.postService
        .findOneAndUpdate({ _id: postId }, { $pull: { reaction: userId } })
        .populate('reaction', 'fullName username', DB_MODELS_KEYS.userModel);
      await feed.save();
      return feed;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async removePost({ postId }: { postId: string }) {
    try {
      const post = await this.postService.findOneAndDelete({ _id: postId });

      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
