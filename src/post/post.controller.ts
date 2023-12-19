import { createPostDto } from 'src/dtos/post.dto';
import { PostService } from './post.service';
import { Request as ExpressRequest } from 'express';
import {
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
  Controller,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/app.guard';

@Controller('api/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  addPost(@Body() post: createPostDto) {
    return this.postService.createPost(post);
  }

  @Get(':feedId')
  async getAllPosts(
    @Param('feedId') feedId: string,
    @Query('limit', { transform: (val) => parseInt(val) }) limit: number,
    @Query('page', { transform: (val) => parseInt(val) }) page: number,
  ) {
    return await this.postService.getAllPosts({
      feedId,
      limit,
      page,
    });
  }

  @Get('post-details/:postId')
  async handleGetPostById(@Param('postId') postId: string) {
    return await this.postService.getOnePost(postId);
  }

  @Delete(':postId')
  @UseGuards(AuthGuard)
  async handleDeletedPost(@Param('postId') postId: string) {
    return await this.postService.removePost({ postId });
  }

  @Put(':postId')
  @UseGuards(AuthGuard)
  handleUpdatePost(@Param('postId') postId: string) {}

  @Get('reaction/:postId')
  async handleGetReactions(@Param('postId') postId: string) {
    return await this.postService.getReactions({ postId });
  }

  @Put('reaction/:postId')
  @UseGuards(AuthGuard)
  async handleAddReaction(
    @Param('postId') postId: string,
    @Request() req: ExpressRequest,
  ) {
    const { userId } = req.params;
    return await this.postService.addReaction({ postId, userId });
  }

  @Delete('reaction/:postId')
  @UseGuards(AuthGuard)
  async handleDeleteReaction(
    @Param('postId') postId: string,
    @Request() req: ExpressRequest,
  ) {
    const { userId } = req.params;
    return await this.postService.removeReaction({ postId, userId });
  }
}
