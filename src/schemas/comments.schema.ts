import mongoose from 'mongoose';
import { DB_MODELS_KEYS } from 'src/constants/databaseModelsName';

export const commentsSchema = new mongoose.Schema(
  {
    commentUser: {
      type: mongoose.Types.ObjectId,
      ref: DB_MODELS_KEYS.userModel,
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: DB_MODELS_KEYS.posts,
    },
    comment: {
      text: { type: String, required: true, default: null },
      media: { type: String, default: null },
    },
  },
  { timestamps: true },
);
