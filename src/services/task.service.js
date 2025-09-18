import createHttpError from 'http-errors';
import { Task } from '../db/models/task.js';

export const createTaskService = async ({ title, description, ownerId }) => {
  const newTask = await Task.create({
    title,
    description,
    owner: ownerId,
  });
  return newTask.toObject();
};

export const getTasksService = async (ownerId) => {
  const tasks = await Task.find({ owner: ownerId }).sort({ createdAt: -1 });
  return tasks;
};

export const updateTaskStatusService = async ({ taskId, status, ownerId }) => {
  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId, owner: ownerId },
    { status },
    { new: true, runValidators: true },
  );

  if (!updatedTask) {
    throw createHttpError(
      404,
      'Task not found or you do not have permission to update it.',
    );
  }

  return updatedTask.toObject();
};
