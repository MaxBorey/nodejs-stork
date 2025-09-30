import { User } from "../db/models/user.js";
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { Session } from "../db/models/session.js";
import { randomBytes } from "node:crypto";
import { getFullNameFromGoogleTokenPayload, validateCode } from '../utils/googleOAuth2.js';
import crypto from 'crypto';


const createSession = (userId) => ({
  accessToken: crypto.randomBytes(30).toString('base64'),
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15), //15 min
  refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30 days
  userId,
});


export const clearSession = (res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    // sameSite: 'none',
    // secure: true,
    path: '/',
  });
};

export const registerUser = async (payload) => {
    const user = await User.findOne({ email: payload.email });

    if (user) throw createHttpError(409, 'Email in use');

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await User.create({
    ...payload,
    password: encryptedPassword,
  });
};



export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const arePasswordsEqual = await bcrypt.compare(password, user.password);

  if (!arePasswordsEqual) {
    throw createHttpError(401, 'Invalid email or password');
  }

  await Session.deleteOne({ userId: user._id });

  const session = await Session.create(createSession(user._id));

  return session;
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    await Session.findByIdAndDelete(sessionId);
    throw createHttpError(401, 'Session expired!');
  }

  const user = await User.findById(session.userId);

  if (!user) {
    await Session.findByIdAndDelete(sessionId);
    throw createHttpError(401, 'Session not found!');
  }

  await Session.findByIdAndDelete(sessionId);
  const newSession = await Session.create(createSession(user._id));

  return newSession;
};


export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload?.email) throw createHttpError(401);

  let user = await User.findOne({ email: payload.email });
  if (!user) {
    const password = await bcrypt.hash(randomBytes(10).toString('hex'), 10);
    user = await User.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPayload(payload),
      password,
    });
  }

  await Session.findOneAndDelete({ userId: user._id });

  // ❗️Створюємо і одразу ОТРИМУЄМО документ із _id
  const createdSession = await Session.create(createSession(user._id));

  // Повертаємо все, що треба, включно з _id
  return {
    _id: createdSession._id,                     // <— додали
    userId: user._id.toString(),
    accessToken: createdSession.accessToken,
    refreshToken: createdSession.refreshToken,
    refreshTokenValidUntil: createdSession.refreshTokenValidUntil,
  };
};
