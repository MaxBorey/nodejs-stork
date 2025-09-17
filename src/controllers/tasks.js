import { createTask, getAllTasks, setTaskCompleted} from "../services/tasks.js";
import { createTaskSchema} from "../validation/tasks.js";
import { toUtcMidnight } from "../utils/date.js";
import mongoose from "mongoose";


export const postTaskController = async (req, res, next) => {
  try {
     const { value, error } = createTaskSchema.validate(req.body, {
      abortEarly: false,
      convert: true,
      stripUnknown: true,
    });
    if (error) {
      const message = error.details?.map(d => d.message).join(', ') || error.message;
      return res.status(400).json({ status: 400, message });
    }

    let normalizedDate;
    try {
      normalizedDate =
        value.date instanceof Date ? toUtcMidnight(value.date) : toUtcMidnight(String(value.date));
    } catch {
      return res.status(400).json({ status: 400, message: 'Invalid date format' });
    }

    const task = await createTask(
      {
        title: value.title,
        date: normalizedDate,
        completed: Boolean(value.completed)
      },
      req.user._id
    );

    return res.status(201).json({
      status: 201,
      message: 'Successfully created a task!',
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

export const getTaskController = async (req, res, next) => {
  try {
    const tasks = await getAllTasks(req.user._id);

    const response = {
    status: 200,
    message: 'Successfully found tasks!',
    data: tasks,
  };

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(response, null, 2));
} catch (err) {
    next(err);
  }
};

export const setCompletedController = async (req, res, next) => {
  try {
    if (!req.user._id) {
      return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }

    const id = req.params.taskId;


    if (typeof req.body?.completed === 'undefined') {
      return res.status(400).json({ status: 400, message: 'completed is required' });
    }

    const raw = req.body.completed;
    const completed =
      typeof raw === 'boolean'
        ? raw
        : String(raw).toLowerCase() === 'true' || Number(raw) === 1;

    const task = await setTaskCompleted(req.user._id, id, completed);
    if (!task) {
      return res.status(404).json({ status: 404, message: 'Task not found' });
    }

    return res.json({ status: 200, data: task });
  } catch (err) {
    next(err);
  }
};
