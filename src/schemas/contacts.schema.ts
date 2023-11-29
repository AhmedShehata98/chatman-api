import mongoose from 'mongoose';

export const contactsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    conversation: {
      type: mongoose.Types.ObjectId,
      ref: 'conversation',
    },
  },
  { timestamps: true },
);
