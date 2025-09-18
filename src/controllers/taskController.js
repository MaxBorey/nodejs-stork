import {
  createTaskService,
  getTasksService,
  updateTaskStatusService,
} from '../services/task.service.js';

export const createTaskController = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const ownerId = req.user._id;

    const task = await createTaskService({ title, description, ownerId });

    res.status(201).json({
      status: 201,
      message: 'Task created successfully!',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasksController = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const tasks = await getTasksService(ownerId);

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

    const updatedTask = await updateTaskStatusService({
      taskId,
      status,
      ownerId,
    });

    res.status(200).json({
      status: 200,
      message: 'Task status updated successfully!',
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};
