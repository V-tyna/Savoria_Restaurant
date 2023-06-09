import { body } from 'express-validator';

export const loginValidators = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid.'),
  body('password')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('Password must be between 6 and 20 characters.'),
];
