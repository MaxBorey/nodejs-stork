import { loginUser, logoutUser, registerUser } from "../services/auth.js";
import { ONE_DAY } from "../constants/index.js";

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

  const cookieOpts = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: ONE_DAY
  };

  res.cookie("refreshToken", session.refreshToken, cookieOpts);
  res.cookie("sessionId", session._id, cookieOpts);

  res.status(200).json({
    message: "Successfully logged in a user!",
    data: { accessToken: session.accessToken }
  });
};


export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
