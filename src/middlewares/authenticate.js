import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next(createHttpError(401, 'Please provide auth header'));
  }

  const [bearer, accessToken] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !accessToken) {
    return next(createHttpError(401, 'Token should be of type Bearer'));
  }

  const session = await Session.findOne({ accessToken });
  if (!session) {
    return next(createHttpError(401, 'Session not found!'));
  }

  const isAccessTokenExpired = Date.now() > new Date(session.accessTokenValidUntil).getTime();
  if (isAccessTokenExpired) {
    res.set(
      'WWW-Authenticate',
      'Bearer realm="api", error="invalid_token", error_description="expired"'
    );
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await User.findById(session.userId);
  if (!user) {
    await Session.findByIdAndDelete(session._id);
    return next(createHttpError(401, 'User, associated with session, is not found!'));
  }

  req.user = user;
  next();
};
