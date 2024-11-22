import { body, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customError.js'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
//import { param } from 'express/lib/router/index.js';
import { param } from 'express-validator'
import Job from '../models/jobModel.js'
import User from '../models/UserModel.js'



const withValidationErrors = (validateValues) => {
    return [
      validateValues,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
  
          const firstMessage = errorMessages[0];
          console.log(Object.getPrototypeOf(firstMessage));
          if (errorMessages[0].startsWith('no job')) {
            throw new NotFoundError(errorMessages);
          }
          if (errorMessages[0].startsWith('not authorized')) {
            throw new UnauthorizedError('not authorized to access this route');
          }
          throw new BadRequestError(errorMessages);
        }
        next();
      },
    ];
  };


export const validateTest = withValidationErrors([
    body('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({min:3,max:50})
    .withMessage('name must be at least 3 and 50 characters long')
])


export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('location').notEmpty().withMessage('location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid type value')
])

export const validateIdParams = withValidationErrors([
    param('id').custom(async (value, { req }) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if(!isValidId) throw new BadRequestError('invalid MongoDB id');

        const job = await Job.findById(value);

        if(!job) throw new NotFoundError(`no job with id ${value}`)

        const isAdmin = req.user.role === 'admin'
        const isOwner = req.user.userId === job.createdBy.toString();

        if(!isAdmin && !isOwner) throw new UnauthorizedError('NOt authorized to access this route')
    })

    
])

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
        const user = await User.findOne( {email });
        if (user) {
            throw new BadRequestError('email already exists');
        }
    }),
    body('password').notEmpty().withMessage('password is required')
    .isLength({min:6}).withMessage('password must be atleast 6 characters long'),
    body('lastname').notEmpty().withMessage('lastname is required'),
    body('location').notEmpty().withMessage('location is required'),
])

export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('password is required')

])


export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError('email already exists');
      }
    }),

    
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);
