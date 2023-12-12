import mongoose from 'mongoose';
import { DB_MODELS_KEYS } from 'src/constants/databaseModelsName';

export const postSchema = new mongoose.Schema(
  {
    publisher: {
      type: mongoose.Types.ObjectId,
      ref: DB_MODELS_KEYS.userModel,
      required: true,
    },
    feedRoom: {
      type: mongoose.Types.ObjectId,
      ref: DB_MODELS_KEYS.feeds,
      required: true,
    },
    content: {
      text: {
        type: String,
        required: true,
      },
      media: {
        type: String,
      },
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: DB_MODELS_KEYS.comments,
      },
    ],
    share: {
      shareCount: {
        type: Number,
        default: 0,
      },
      shareUser: {
        type: mongoose.Types.ObjectId,
        ref: DB_MODELS_KEYS.userModel,
      },
    },
  },
  { timestamps: true },
);
