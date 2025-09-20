import { Schema, model, Types } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true
    },
    userId: {
      type: Types.ObjectId,
      ref: 'users',
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);


taskSchema.index({ userId: 1, completed: 1, date: -1, _id: -1 });

export const Task = model('tasks', taskSchema);
