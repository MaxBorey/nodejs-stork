import { clearSession, isSessionValid, loginUser, logoutUser, refreshUsersSession, registerUser } from "../services/auth.js";
import { ONE_DAY } from "../constants/index.js";
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { loginOrSignupWithGoogle } from '../services/auth.js';

const COOKIE_OPTS = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/',
};

const setupSession = (res, session) => {
  const sessionId =
    session?._id?.toString?.() ??
    session?.sessionId ??
    session?.id;

  if (!sessionId) {
    throw new Error('No sessionId in session object');
  }

  res.clearCookie('refreshToken', COOKIE_OPTS);
  res.clearCookie('sessionId', COOKIE_OPTS);


  res.cookie('refreshToken', session.refreshToken, {
    ...COOKIE_OPTS,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', sessionId, {
    ...COOKIE_OPTS,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.status(200).json({
    message: "Successfully logged in a user!",
    data: { accessToken: session.accessToken },
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession(
    req.cookies.sessionId,
    req.cookies.refreshToken,
  );

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed session!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId', COOKIE_OPTS);
  res.clearCookie('refreshToken', COOKIE_OPTS);

  res.status(204).send();
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: { url },
  });
};

export const loginWithGoogleController = async (req, res, next) => {
  try {
    const session = await loginOrSignupWithGoogle(req.body.code);

    setupSession(res, session);

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in via Google OAuth!',
      data: { accessToken: session.accessToken },
    });
  } catch (e) {
    next(e);
  }
};

export const checkSessionController = async (req, res) => {
  try {
    const { sessionId, refreshToken } = req.cookies || {};
    const valid = await isSessionValid(sessionId, refreshToken);

    if (!valid) {
      clearSession(res);
    }

    return res.status(200).json({ valid });
  } catch {
    clearSession(res);
    return res.status(200).json({ valid: false });
  }
};
