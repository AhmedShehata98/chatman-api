import mongoose from 'mongoose';

export const group = new mongoose.Schema(
  {
    groupAdmin: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    groupName: {
      type: String,
      trim: true,
      required: true,
    },
    groupDescription: {
      type: String,
      trim: true,
    },
    groupImage: {
      type: String,
    },
    isMuted: {
      type: Boolean,
      default: false,
    },
    groupMembers: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
  },
  { timestamps: true },
);
