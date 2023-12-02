import mongoose from 'mongoose';

export const conversationSchema = new mongoose.Schema(
  {
    conversationAdmin: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
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
        ref: 'User',
        required: true,
      },
    ],
    conversationType: {
      type: String,
      enum: ['PRIVATE', 'GROUP'],
      default: 'PRIVATE',
      required: true,
    },
  },
  { timestamps: true },
);
