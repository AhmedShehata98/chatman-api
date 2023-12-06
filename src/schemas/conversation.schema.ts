import mongoose from 'mongoose';
import { DB_MODELS_KEYS } from 'src/constants/databaseModelsName';

export const conversationSchema = new mongoose.Schema(
  {
    conversationAdmin: {
      type: mongoose.Types.ObjectId,
      ref: DB_MODELS_KEYS.userModel,
    },
    conversationName: {
      type: String,
      trim: true,
    },
    conversationDescription: {
      type: String,
      trim: true,
    },
    conversationImage: {
      type: String,
    },
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: DB_MODELS_KEYS.userModel,
        required: true,
      },
    ],
    conversationType: {
      type: String,
      enum: ['PRIVATE', 'GROUP'],
      default: 'PRIVATE',
      required: true,
    },
    lastMessage: {
      type: mongoose.Types.ObjectId,
      ref: DB_MODELS_KEYS.messageModel,
      default: null,
    },
  },
  { timestamps: true },
);
