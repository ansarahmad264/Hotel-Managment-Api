// validators/restaurantValidator.js
import Joi from 'joi';

export const restaurantSignupSchema = Joi.object({
  name: Joi.string()
    .max(150)
    .trim()
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.max': 'Name must be at most 150 characters',
    }),

  email: Joi.string()
    .email()
    .max(150)
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
      'string.max': 'Email must be at most 150 characters',
    }),

  password: Joi.string()
    .min(8)       
    .max(128)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must be at most 128 characters',
    }),
});

export const restaurantLoginSchema = Joi.object({
  email: Joi.string()
    .email()
    .max(150)
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
      'string.max': 'Email must be at most 150 characters',
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must be at most 128 characters',
    }),
});
