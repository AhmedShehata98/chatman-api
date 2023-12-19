import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsNotEmpty()
  @IsString()
  commentUser: string;

  @IsNotEmptyObject()
  @IsObject()
  comment: {
    text: string;
    media: string;
  };
}
