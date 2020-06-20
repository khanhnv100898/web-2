const express = require('express');
const UsersModel = require('./users.model');
const bcryptjs = require('bcryptjs');
const joi = require('@hapi/joi');

const userRouter = express.Router();

// Dang ky
userRouter.post('/register', async (req, res) => {
  // validate
  const bodyValidation = joi.object({
    email: joi.string()
      .required()
      .pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      .error(() => {
        return new Error('invalid email ..!');
      }),
    password: joi.string()
      .required()
      .pattern(/^[a-zA-Z0-9]{6,30}$/)
      .error(() => {
        return new Error('Password only allow alphanumeric, at least 6 characters!');
      }),
    fullName: joi.string()
      .required()
      .min(3)
      .max(100)
      .error(() => {
        return new Error('Fullname at least 3 characters!');
      }),
  });
  const validateResult = bodyValidation.validate(req.body);
  if (validateResult.error) {
    res.status(400).json({
      success: false,
      message: validateResult.error.message,
    });
  }
  const existedEmail = await UsersModel.findOne({ email: req.body.email }).lean();
  if (existedEmail) {
    res.status(400).json({
      success: false,
      message: 'Email has been used!'
    });
  }

  // hash password
  const hashPassword = bcryptjs.hashSync(req.body.password);

  // save to database
  const newUser = {
    email: req.body.email,
    fullName: req.body.fullName,
    password: hashPassword,
  };
  await UsersModel.create(newUser);
  res.status(201).json({
    success: true,
    message: 'Create account success!',
  });
});

// Dang nhap
userRouter.post('/login', async (req, res) => {
  try {
    // check email account
    const existedEmail = await UsersModel.findOne({ email: req.body.email }).lean();
    if (!existedEmail) {
      res.status(400).json({
        success: false,
        message: 'Email didnt exists!',
      });
    } else {
      const comparePasswordResult = bcryptjs.compareSync(req.body.password, existedEmail.password);
      if (!comparePasswordResult) {
        res.status(400).json({
          success: false,
          message: 'Wrong password',
        });
      } else {
        // session storage
        req.session.currentUser = {
          _id: existedEmail._id,
          email: existedEmail.email,
        }
        res.status(200).json({
          success: true,
          message: 'Login success!',
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Dang xuat
userRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({
    success: true,
    message: 'Logout success!',
  });
});

// Test session user
userRouter.get('/get-current-user', (req, res) => {
  if (req.session.currentUser) {
    res.status(200).json({
      success: true,
      data: {
        _id: req.session.currentUser._id,
        email: req.session.currentUser.email,
      },
    });
  } else {
    res.status(200).json({
      success: false,
      message: 'Current user not found.'
    });
  }
});

module.exports = userRouter;