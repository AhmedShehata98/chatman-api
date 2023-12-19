import { CommentsService } from './comment.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CreateCommentDto } from 'src/dtos/comments.dto';

@Controller('api/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  @Get(':postId')
  async handleGetComments(
    @Param('postId') postId: string,
    @Query({ transform: (val) => parseInt(val) }) limit: number,
    @Query({ transform: (val) => parseInt(val) }) page: number,
  ) {
    return await this.commentsService.getAllComments({ limit, page, postId });
  }

  @Post()
  async handleAddComment(@Body() comment: CreateCommentDto) {
    return await this.commentsService.createNewComment(comment);
  }
}
