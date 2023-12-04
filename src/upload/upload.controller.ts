import {
  UseInterceptors,
  UploadedFile,
  Post,
  Get,
  Body,
  Controller,
} from '@nestjs/common';
import { UploadApiResponse as CloudinaryResponse } from 'cloudinary';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('api/upload')
export class UploadController {
  constructor(private UploadService: UploadService) {}

  @Post('img')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadImage(@UploadedFile() file: Express.Multer.File) {
    const { secure_url, format, url, width, height, bytes, created_at } =
      await this.UploadService.uploadImg(file);
    return { secure_url, format, url, width, height, bytes, created_at };
  }
}
