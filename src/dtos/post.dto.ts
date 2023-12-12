import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';

export class createPostDto {
  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  feedRoom: string;

  @IsObject()
  @IsNotEmptyObject()
  content: {
    text: string;
    media: string;
  };

  @IsArray()
  @IsNotEmpty()
  comments: Array<string>;

  @IsObject()
  @IsNotEmptyObject()
  share: {
    shareCount: number;
    shareUser: string;
  };
}
