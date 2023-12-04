import { UploadService } from './upload.service';
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';

@Module({
  controllers: [UploadController],
  providers: [UploadService, ...CloudinaryProvider],
})
export class UploadModule {}
