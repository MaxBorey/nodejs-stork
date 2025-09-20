import mongoose, { model } from 'mongoose';

const emotionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const diarieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    emotions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Emotions',
        required: true,
      },
    ],
  },
  { timestamps: true },
);

export const EmotionCollection = model('Emotions', emotionSchema);
export const DiarieEntriesCollection = model('Diarie', diarieSchema);
