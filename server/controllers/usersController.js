const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const multer = require(`multer`);

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/public');
  },
  filename: (req, file, cb) => {
    // const fixedName = req.body.name.replaceAll(` `, ``).toLowerCase();
    const ext = file.mimetype.split(`/`)[1].replace(`e`, ``);
    cb(null, `user-${req.params.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images'), false);
  }
};

// const upload = multer({ dest: 'server/assets/imgs/users' });
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single(`photo`);

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

exports.updateDBWithPhotoPath = async (req, res, next) => {
  try {
    console.log(`MADE MADE MADE MADE IT INTO START OF UPDATE PHOTO`);
    //PATH SHOULE EXISTS IN
    console.log(`IN UPDATE TO DB `, req.file.filename);
    const { id } = req.params;

    // FIND USER IN DB AND UPDATE profilePhoto entry
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        profilePhoto: req.file.filename,
      },
      { new: true }
    );

    //RETURN UPDATED USERDATA TO CLIENT
    res.locals.updatedUser = updatedUser;
  } catch (error) {
    return next({
      log: 'Error in usersController.js updateDBWithPhotoPath middleware',
      message: error.message,
    });
  }

  next();
};
