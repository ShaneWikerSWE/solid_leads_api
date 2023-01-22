import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { Clients, UserCredentials } from '../models';
import { ResponseService, JwtService, MailService } from '../services';
import asyncHandler from 'express-async-handler';
import bcrybt from 'bcryptjs';

const register: RequestHandler = asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    ResponseService.validationFailed(res, validationErrors.array());
    return;
  }

  const { email, password, firstName, lastName, companyName, phone } = req.body;

  const hashedPw = await bcrybt.hash(password, 12);

  const response = await Clients.create({
    name: companyName,
    createdAt: new Date(),
    updatedAt: new Date(),
    marketingMargin: 0.3,
  });

  const user = await UserCredentials.create({
    firstName,
    lastName,
    email,
    password: hashedPw,
    companyName,
    phone,
    clientId: response.id,
  });

  const verifyToken = JwtService.generateToken(
    { type: 'verify', userId: user.id },
    '12h'
  );

  MailService.verifyEmail({ email: user.email, token: verifyToken });

  const loginToken = JwtService.generateToken(
    { type: 'login', userId: user.id },
    '3d'
  );

  res.status(201).json({
    msg: 'User created',
    token: loginToken,
    expiresIn: '259200', // Seconds
  });
});

const verifyEmail: RequestHandler = asyncHandler(async (req, res) => {
  const { token } = req.body;

  let decodedToken: any;

  try {
    decodedToken = JwtService.verifyToken(token);
    if (decodedToken.type !== 'verify') throw new Error();
  } catch (err) {
    ResponseService.unauthorized(res);
    return;
  }

  const user = await UserCredentials.findOne({
    where: { id: decodedToken.userId },
  });

  if (Number(user?.verified) === 1) {
    ResponseService.unauthorized(res);
    return;
  }

  await UserCredentials.update(
    { verified: 1, email: decodedToken.newEmail || user?.email },
    { where: { id: user?.id } }
  );

  res.status(200).json({ msg: 'User verified' });
});

const login: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserCredentials.findOne({ where: { email } });
  if (!user) {
    ResponseService.notFound(res);
    return;
  }

  const isEqual = await bcrybt.compare(password, user.password);
  if (!isEqual) {
    ResponseService.unauthorized(res);
    return;
  }

  // if (Number(user?.verified) === 0) {
  //   ResponseService.unauthorized(res);
  //   return;
  // }

  const loginToken = JwtService.generateToken(
    { type: 'login', userId: user.id },
    '3d'
  );

  res.status(200).json({
    msg: 'Token created',
    token: loginToken,
    expiresIn: '259200', // Seconds
  });
});

const passwordResetEmail: RequestHandler = asyncHandler(async (req, res) => {
  const { email } = req.params;

  const user = await UserCredentials.findOne({ where: { email } });
  if (!user) {
    ResponseService.notFound(res);
    return;
  }

  const resetToken = JwtService.generateToken(
    { type: 'resetPassword', userId: user.id },
    '12h',
    user.password
  );

  MailService.resetPassword({
    id: user.id,
    email: user.email,
    token: resetToken,
  });

  res.status(200).json({ msg: 'Email sent' });
});

const passwordResetCheck: RequestHandler = asyncHandler(async (req, res) => {
  const { id, token } = req.params;

  const user = await UserCredentials.findOne({ where: { id } });
  if (!user) {
    ResponseService.notFound(res);
    return;
  }

  let decodedToken: any;

  try {
    decodedToken = JwtService.verifyToken(token, user.password);
    if (decodedToken.type !== 'resetPassword') throw new Error();
  } catch (err) {
    ResponseService.unauthorized(res);
    return;
  }

  res.status(200).json({ msg: 'Valid token' });
});

const passwordReset: RequestHandler = asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    ResponseService.validationFailed(res, validationErrors.array());
    return;
  }

  const { id, token, password } = req.body;

  const user = await UserCredentials.findOne({ where: { id } });
  if (!user) {
    ResponseService.notFound(res);
    return;
  }

  let decodedToken: any;

  try {
    decodedToken = JwtService.verifyToken(token, user.password);
    if (decodedToken.type !== 'resetPassword') throw new Error();
  } catch (err) {
    ResponseService.unauthorized(res);
    return;
  }

  const hashedPw = await bcrybt.hash(password, 12);

  await UserCredentials.update(
    { password: hashedPw },
    { where: { id: decodedToken.userId } }
  );

  res.status(200).json({ msg: 'Password has been reset' });
});

const passwordCheck: RequestHandler = asyncHandler(async (req, res) => {
  const { password } = req.params;

  const user = await UserCredentials.findOne({
    where: { id: req.user.userId },
  });

  const isEqual = await bcrybt.compare(password, user!.password);
  if (!isEqual) {
    ResponseService.unauthorized(res);
    return;
  }

  res.status(200).json({ msg: 'Password matched' });
});

const getInfo: RequestHandler = asyncHandler(async (req, res) => {
  const user = await UserCredentials.findOne({
    where: { id: req.user.userId },
  });

  res.status(200).json({
    msg: 'User info',
    userInfo: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      companyName: user?.companyName,
      email: user?.email,
      phone: user?.phone,
    },
  });
});

const updateInfo: RequestHandler = asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req);
  console.log(validationErrors.array());

  if (!validationErrors.isEmpty()) {
    ResponseService.validationFailed(res, validationErrors.array());
    return;
  }

  const { currentPassword, email, firstName, lastName, companyName, phone } =
    req.body;

  const user = await UserCredentials.findOne({
    where: { id: req.user.userId },
  });

  // const isEqual = await bcrybt.compare(currentPassword, user!.password);
  // if (!isEqual) {
  //   ResponseService.unauthorized(res);
  //   return;
  // }

  if (email !== user!.email) {
    const verifyToken = JwtService.generateToken(
      { type: 'verify', userId: user!.id, newEmail: email },
      '12h'
    );

    // MailService.verifyEmail({ email, token: verifyToken });
  }

  await UserCredentials.update(
    { firstName, lastName, companyName, phone, email },
    { where: { id: user?.id } }
  );

  res.status(200).json({ msg: 'User info has been updated' });
});

const updatePassword: RequestHandler = asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    ResponseService.validationFailed(res, validationErrors.array());
    return;
  }

  const { currentPassword, newPassword } = req.body;

  const user = await UserCredentials.findOne({
    where: { id: req.user.userId },
  });

  const isEqual = await bcrybt.compare(currentPassword, user!.password);
  if (!isEqual) {
    ResponseService.unauthorized(res);
    return;
  }

  const hashedPw: string = await bcrybt.hash(newPassword, 12);

  await UserCredentials.update(
    { password: hashedPw },
    { where: { id: user?.id } }
  );

  res.status(200).json({ msg: 'Password has been updated' });
});

export default {
  register,
  login,
  verifyEmail,
  passwordResetEmail,
  passwordResetCheck,
  passwordReset,
  passwordCheck,
  getInfo,
  updateInfo,
  updatePassword,
};
