import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  try {

    const h = req.get('authorization') || req.get('Authorization');
    let accessToken = h?.startsWith('Bearer ') ? h.split(' ')[1] : null;

    if (!accessToken) {
      accessToken = req.cookies?.accessToken || null;
    }
    if (!accessToken) {
      res.set('WWW-Authenticate', 'Bearer realm="api", error="missing_token"');
      throw createHttpError(401, 'No access token');
    }

    const session = await Session.findOne({ accessToken });
    if (!session) {
      res.set('WWW-Authenticate', 'Bearer realm="api", error="invalid_token"');
      throw createHttpError(401, 'Session not found!');
    }

    if (new Date(session.accessTokenValidUntil) < new Date()) {
      await Session.findByIdAndDelete(session._id);
      res.set('WWW-Authenticate', 'Bearer realm="api", error="invalid_token", error_description="expired"');
      throw createHttpError(401, 'Access token expired!');
    }

    const user = await User.findById(session.userId);
    if (!user) {
      await Session.findByIdAndDelete(session._id);
      throw createHttpError(401, 'User not found!');
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
