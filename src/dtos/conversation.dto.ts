import { IsString, IsArray, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsArray()
  participants: Array<string>;

  @IsNotEmpty()
  @IsEnum({ PRIVATE: 'PRIVATE', GROUP: 'GROUP' })
  conversationType: 'PRIVATE' | 'GROUP';

  @IsString()
  conversationAdmin: string;

  @IsString()
  conversationName: string;

  @IsString()
  conversationDescription: string;

  @IsString()
  conversationImage: string;
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
