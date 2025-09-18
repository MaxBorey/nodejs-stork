import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const getUsersMe = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    return user;
  } catch (error) {
    console.error(error);
    throw createHttpError(
      500,
      'Unable to fetch user information due to a server error',
    );
  }
};

export const updateUsersMe = async (userId, payload) => {
  try {
    const user = await User.findByIdAndUpdate(userId, payload, { new: true });

    return user;
  } catch (error) {
    throw createHttpError(500, error.details);
  }
};
