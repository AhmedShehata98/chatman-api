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
    phone: {
      type: String,
      min: [10, 'must be phone at least 10 characters'],
      max: [14, 'must be phone at most 14 characters'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    displayName: {
      type: String,
      min: [3, 'must be display Name at least 3 characters'],
      max: [19, 'must be display Name at most 19 characters'],
      trim: true,
    },
    profilePictureUrl: {
      type: String,
    },
    userContacts: [
      { user: { type: mongoose.Types.ObjectId, ref: 'Contacts' } },
    ],
    userGroup: [{ type: mongoose.Types.ObjectId, ref: 'Groups' }],
  },
  { timestamps: true },
);
