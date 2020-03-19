const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const login = async (req, res, next) => {
  const { username, password } = req.body;
  
  let existingUser;

  try {
    existingUser = await User.findOne({username: username });
  } catch (err) {
    const error = new HttpError(
      'Login failed, please try again.', 
      500
    );
    return next(error);
  }
  
  if (!existingUser) {
    const error = new HttpError(
      'Invalid credential could not log you in.',
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
  isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = newHttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credential could not log you in.',
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Login failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    token: token
  });

};

exports.login = login;