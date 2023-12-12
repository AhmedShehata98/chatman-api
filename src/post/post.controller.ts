import { createPostDto } from 'src/dtos/post.dto';
import { PostService } from './post.service';
import {
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
  Controller,
} from '@nestjs/common';

@Controller('api/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  addPost(@Body() post: createPostDto) {
    return this.postService.createPost(post);
  }

  @Get(':feedId')
  getAllPosts(
    @Param('feedId') feedId: string,
    @Query('limit', { transform: (val) => parseInt(val) }) limit: number,
    @Query('page', { transform: (val) => parseInt(val) }) page: number,
  ) {
    return this.postService.getAllPosts({
      feedId,
      limit,
      page,
    });
  }
}
