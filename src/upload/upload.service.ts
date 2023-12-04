import { Injectable } from '@nestjs/common';
import { UploadApiResponse as CloudinaryResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
const streamifier = require('streamifier');

@Injectable()
export class UploadService {
  async uploadImg(imageFile: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(imageFile.buffer).pipe(uploadStream);
    });
  }
}
