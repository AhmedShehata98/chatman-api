import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { DB_MODELS_KEYS } from 'src/constants/databaseModelsName';
import { CreateFeedDto } from 'src/dtos/feeds.dto';
import { IFeeds } from 'src/interfaces/feed.interface';

@Injectable()
export class FeedService {
  constructor(
    @Inject(DB_MODELS_KEYS.feeds) private feedService: Model<IFeeds>,
  ) {}

  async getAllFeeds({
    limit = 7,
    page = 1,
  }: {
    limit: number;
    page: number;
  }): Promise<{ total: number; data: IFeeds[] }> {
    try {
      const skip = (+page - 1) * limit;
      const feeds = await this.feedService
        .find()
        .skip(skip)
        .limit(limit)
        .select('feedName feedCover isPrivate createdAt followers');
      const totalCount = await this.feedService.countDocuments();
      return { total: totalCount, data: feeds };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOneFeed(feedId: string) {
    try {
      const feed = await this.feedService
        .findById(feedId)
        .select(
          'feedName followers feedCover isPrivate createdAt followers owner',
        );
      feed.followersLength = feed.followers.length || 0;
      return feed;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createFeed(createFeedDto: CreateFeedDto) {
    try {
      const feed = await new this.feedService({ ...createFeedDto }).populate([
        { path: 'posts', model: DB_MODELS_KEYS.posts },
        {
          path: 'owner',
          model: DB_MODELS_KEYS.userModel,
          select: 'fullName profilePictureUrl username',
        },
      ]);
      feed.save();
      return feed;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
