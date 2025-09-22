import { updateUsersMe } from '../services/users.js';
import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getUsersMeController = async (req, res, next) => {
  res.status(200).json(req.user);
};

export const updateUsersMeController = async (req, res, next) => {
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }

  const user = await updateUsersMe(req.user.id, {
    ...req.body,
    photoURL: photoUrl,
  });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  res.status(200).json({
    status: 200,
    message: 'User profile updated successfully!',
    data: user,
  });
};
