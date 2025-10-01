import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw createHttpError(401, 'Please provide auth header');
  }

  const [bearer, accessToken] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !accessToken) {
    throw createHttpError(401, 'Token should be of type Bearer');
  }

  const session = await Session.findOne({ accessToken });
  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  if (session.accessTokenValidUntil < new Date()) {
    await Session.findByIdAndDelete(session._id);
    throw createHttpError(401, 'Access token expired!');
  }

  const user = await User.findById(session.userId);

  if (!user) {
    await Session.findByIdAndDelete(session._id);
    throw createHttpError(401, 'User, associated with session, is not found!');
  }

  req.user = user;

  next();
};
