import mongoose from 'mongoose';

export const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    conversationType: {
      type: String,
      enum: ['PRIVATE', 'GROUP'],
      default: 'PRIVATE',
    },
  },
  { timestamps: true },
);
