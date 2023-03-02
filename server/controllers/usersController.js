const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    if (!user || user.length === 0) {
      return next({
        log: 'Error in usersController.js getUserByUsername middleware',
        message: 'DB could not create user. Please try again',
      });
    }

    const foundUser = await User.findById(user._id);

    res.locals.newUser = foundUser;

    next();
  } catch (error) {
    return next({
      log: 'Error in usersController.js createUser middleware',
      message: error.message,
    });
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    //THE SELECT METHOD HELPS US SPECIFICALLY GET THE PROPERTY THAT WAS SELECTED FALSE, MEANING IT WONT SHOW UP ON NORMAL LOOKUPS
    const user = await User.findOne({ username }).select('+password');

    if (!user || user.length === 0) {
      return next({
        log: 'Error in usersController.js getUserByUsername middleware',
        status: 400,
        message: 'No user for this username in DB',
      });
    }

    res.locals.user = user;

    next();
  } catch (error) {
    return next({
      log: 'Error in usersController.js getUserByUsername middleware',
      message: error.message,
    });
  }
};

exports.checkUserPassword = async (req, res, next) => {
  try {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      res.locals.user.password
    );
    // console.log(passwordMatch);

    if (!passwordMatch) {
      return next({
        log: 'Error in usersController.js checkUserPassword middleware',
        status: 400,
        message: 'Password does not match',
      });
    }

    res.locals.user = await User.findOne({ username: req.body.username });

    next();
  } catch (error) {
    return next({
      log: 'Error in usersController.js getUserByUsername middleware',
      message: error.message,
    });
  }
};

exports.updateUserProfileDescription = async (req, res, next) => {
  try {
    console.log(`START OF MIDDLEWARE`);
    if (!req.body.profileDescription) {
      return next({
        log: 'Error in usersController.js getUserByUsername middleware',
        message: 'Please send profileDescription in request body',
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { profileDescription: req.body.profileDescription },
      { new: true }
    );

    if (!updatedUser || updatedUser.length === 0) {
      return next({
        log: 'Error in usersController.js getUserByUsername middleware',
        message: 'No user for this username in DB',
      });
    }

    res.locals.updatedUser = updatedUser;

    console.log(`END OF MIDDLEWARE`);
    next();
  } catch (error) {
    return next({
      log: 'Error in usersController.js updateUserProfileDescription middleware',
      message: error.message,
    });
  }
};
