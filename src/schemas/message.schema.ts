import mongoose from 'mongoose';
import { DB_MODELS_KEYS } from 'src/constants/databaseModelsName';

export const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Types.ObjectId,
      ref: DB_MODELS_KEYS.conversationModel,
      required: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: DB_MODELS_KEYS.userModel,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
    media: {
      type: String,
    },
  },
  { timestamps: true },
);
