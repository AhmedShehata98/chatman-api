import { IsString, IsArray, IsEnum } from 'class-validator';

export class CreateConversationDto {
  @IsArray()
  participants: Array<string>;

  @IsEnum({ PRIVATE: 'PRIVATE', GROUP: 'GROUP' })
  conversationType: 'PRIVATE' | 'GROUP';
}

export class UserConversationDto {
  @IsString()
  _id: string;

  @IsArray()
  participants: Array<string>;

  @IsEnum({ PRIVATE: 'PRIVATE', GROUP: 'GROUP' })
  conversationType: 'PRIVATE' | 'GROUP';

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
