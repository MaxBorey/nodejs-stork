import { Task } from "../db/models/task.js";


export const createTask = async (payload, userId) => {
  return await Task.create({ ...payload, userId });
};

export const getAllTasks = async (userId) => {
  return await Task.find({ userId })
    .sort({ date: -1, _id: -1 })
    .lean();
};

export const setTaskCompleted = async (userId, taskId, completed) => {
  return await Task.findOneAndUpdate(
    { _id: taskId, userId },
    { completed: !!completed },
    { new: true, runValidators: true }
  );
};
