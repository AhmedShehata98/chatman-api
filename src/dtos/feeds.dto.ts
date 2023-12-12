import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedDto {
  @IsString()
  @IsNotEmpty()
  feedName: string;

  @IsString()
  feedCover: string;

  @IsBoolean()
  @IsNotEmpty()
  isPrivate: boolean;

  @IsString()
  description: string;

  @IsString()
  owner: string;

  @IsArray()
  posts: [];
}
