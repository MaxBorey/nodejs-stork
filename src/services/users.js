import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const updateUsersMe = async (userId, payload) => {
  try {
    const user = await User.findByIdAndUpdate(userId, payload, { new: true });

    return user;
  } catch (error) {
    throw createHttpError(500, error.details);
  }
};
