import { v2 as cloudinary } from 'cloudinary';
import { providerKeys } from 'src/constants/databaseModelsName';

export const CloudinaryProvider = [
  {
    provide: providerKeys.cloudinaryProvider,
    useFactory: function () {
      return cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
    },
  },
];
