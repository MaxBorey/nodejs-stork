import { Schema, model } from 'mongoose';

const babyStateSchema = new Schema({
  analogy: { type: String },
  weekNumber: { type: Number, required: true, unique: true },
  babySize: { type: Number },
  babyWeight: { type: Number },
  image: { type: String },
  babyActivity: { type: String },
  babyDevelopment: { type: String },
  interestingFact: { type: String },
  momDailyTips: { type: [String] },
});

export const BabyState = model('BabyState', babyStateSchema, 'baby_states');