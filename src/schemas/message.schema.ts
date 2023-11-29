import mongoose from 'mongoose';

export const message = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Types.ObjectId,
      ref: 'conversation',
      required: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
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
