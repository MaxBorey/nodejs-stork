import createHttpError from 'http-errors';
import { Task } from '../db/models/task.js';

export const createTaskController = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const ownerId = req.user._id;

    const newTask = await Task.create({
      title,
      description,
      owner: ownerId,
    });

    res.status(201).json({
      status: 201,
      message: 'Task created successfully!',
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasksController = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const tasks = await Task.find({ owner: ownerId }).sort({ createdAt: -1 });

    res.status(200).json({
      status: 200,
      message: 'Tasks retrieved successfully!',
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatusController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const ownerId = req.user._id;

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

    res.status(200).json({
      status: 200,
      message: 'Task status updated successfully!',
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};
