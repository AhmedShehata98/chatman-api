import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { CommentsService } from './comment.service';
import { commentsProvider } from 'src/providers/comment.provider';
import { CommentsController } from './comment.controller';

@Module({
  controllers: [CommentsController],
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [CommentsService, ...commentsProvider],
})
export class CommentModule {}
