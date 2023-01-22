import { body } from 'express-validator';
import { UserCredentials } from '../models';

const register = [
  body('firstName').trim().not().isEmpty().isLength({ max: 255 }),
  body('lastName').trim().not().isEmpty().isLength({ max: 255 }),
  body('phone').trim().not().isEmpty().isLength({ max: 255 }),
  body('companyName').trim().not().isEmpty().isLength({ max: 255 }),
  body('password')
    .isLength({ min: 8, max: 255 })
    .withMessage('Password has to be more than 8 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value: string) => {
      return UserCredentials.findOne({ where: { email: value } }).then(
        (user) => {
          if (user) return Promise.reject('Email address already exists');
        }
      );
    })
    .normalizeEmail({ gmail_remove_dots: false }),
];

const passwordReset = [
  body('password')
    .isLength({ min: 8, max: 255 })
    .withMessage('Password has to be more than 8 characters'),
];

const updateInfo = [
  body('firstName').trim().not().isEmpty().isLength({ max: 255 }),
  body('lastName').trim().not().isEmpty().isLength({ max: 255 }),
  body('phone').trim().not().isEmpty().isLength({ max: 255 }),
  body('companyName').trim().not().isEmpty().isLength({ max: 255 }),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value: string, { req }) => {
      return UserCredentials.findOne({ where: { email: value } }).then(
        (user) => {
          if (user && +user?.id !== +req.user.userId)
            return Promise.reject('Email address already exists');
        }
      );
    })
    .normalizeEmail({ gmail_remove_dots: false }),
  // body('currentPassword').not().isEmpty(),
];

const updatePassword = [
  body('currentPassword').not().isEmpty(),
  body('newPassword')
    .isLength({ min: 8, max: 255 })
    .withMessage('Password has to be more than 8 characters'),
];

export default { register, passwordReset, updateInfo, updatePassword };
