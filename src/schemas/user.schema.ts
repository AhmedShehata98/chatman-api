import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: [4, 'must be username at least 4 characters'],
      max: [20, 'must be username at most 20 characters'],
      required: true,
      trim: true,
    },
    password: {
      type: String,
      min: [8, 'must be password at least 8 characters'],
      max: [25, 'must be password at most 25 characters'],
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    fullName: {
      type: String,
      min: [3, 'must be display Name at least 3 characters'],
      max: [19, 'must be display Name at most 19 characters'],
      trim: true,
      required: true,
    },
    profilePictureUrl: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['OFFLINE', 'ONLINE', 'IDLE'],
      default: 'OFFLINE',
    },
    lastSeenDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);
