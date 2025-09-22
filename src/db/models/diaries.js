import mongoose, { model } from 'mongoose';

const emotionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const diarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    emotions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Emotions',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false
   },
);

export const EmotionCollection = model('Emotions', emotionSchema);
export const DiarieEntriesCollection = model('Diarie', diarySchema);
