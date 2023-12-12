import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { async } from 'rxjs';
import { CreateFeedDto } from 'src/dtos/feeds.dto';
import { AuthGuard } from 'src/app.guard';

@Controller('/api/feeds')
export class FeedController {
  constructor(private feedsService: FeedService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllFeeds(
    @Query('limit', { transform: (value) => parseInt(value) }) limit: number,
    @Query('page', { transform: (value) => parseInt(value) }) page: number,
  ) {
    return await this.feedsService.getAllFeeds({ limit, page });
  }

  @Get('/:feedId')
  @UseGuards(AuthGuard)
  async getFeedsById(@Param('feedId') feedId: string) {
    return await this.feedsService.getOneFeed(feedId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async addFeed(@Body() feed: CreateFeedDto) {
    return await this.feedsService.createFeed(feed);
  }
}
