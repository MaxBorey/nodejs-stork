import { model, Schema, Types } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    owner: {
      type: Types.ObjectId,
      ref: 'users', // Посилання на модель користувача
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Task = model('tasks', taskSchema);
