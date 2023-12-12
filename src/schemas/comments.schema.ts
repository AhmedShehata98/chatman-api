import mongoose from 'mongoose';
import { DB_MODELS_KEYS } from 'src/constants/databaseModelsName';

export const comments = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: DB_MODELS_KEYS.userModel,
  },
  comment: {
    text: { type: String, required: true },
    media: { type: String, required: true },
  },
});
