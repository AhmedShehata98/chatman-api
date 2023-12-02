import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ChatmanModule } from './chatman/chatman.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';

ConfigModule.forRoot();
@Module({
  imports: [
    UserModule,
    ConversationModule,
    MessageModule,
    ChatmanModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
