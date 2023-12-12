import mongoose from 'mongoose';
import { DB_MODELS_KEYS } from 'src/constants/databaseModelsName';

export const feedsSchema = new mongoose.Schema(
  {
    feedName: { type: String, required: true, trim: true },
    feedCover: { type: String, default: undefined },
    isPrivate: { type: Boolean, default: false },
    description: { type: String, trim: true },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: DB_MODELS_KEYS.userModel,
      required: true,
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: DB_MODELS_KEYS.posts,
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: DB_MODELS_KEYS.userModel,
      },
    ],
  },
  { timestamps: true },
);
