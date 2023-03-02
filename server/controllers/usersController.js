const User = require('../models/userModel');

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    if (!user || user.length === 0) {
      return next({
        log: 'Error in usersController.js getUserByUsername middleware',
        message: 'DB could not create user. Please try again',
      });
    }

    res.locals.newUser = user;

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
    const user = await User.findOne({ username });

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

exports.checkCredentials = (req, res, next) => {
  console.log(req.body);
  console.log(
    `NEED TO CHECK FOR CREDENTIALS HERE IN USERCONTROLLER.JS CHECKCREDENTIALS`
  );

  next();
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
