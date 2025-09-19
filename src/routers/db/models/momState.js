import { Schema, model } from 'mongoose';

const momStateSchema = new Schema({
  weekNumber: { type: Number, required: true, unique: true },
  feelings: {
    states: [String],
    sensationDescr: String,
  },
  comfortTips: [
    {
      category: { type: String },
      tip: { type: String },
    },
  ],
});

export const MomState = model('MomState', momStateSchema, 'mom_states');