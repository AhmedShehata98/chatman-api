import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { DatabaseModule } from 'src/database/database.module';
import { feedProvider } from 'src/providers/feed.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [FeedController],
  providers: [FeedService, ...feedProvider],
})
export class FeedModule {}
