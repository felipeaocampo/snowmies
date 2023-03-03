const express = require(`express`);
const multer = require(`multer`);

const usersController = require(`../controllers/usersController`);

const upload = multer({ dest: 'server/public' });
const router = express.Router();

router.post(
  `/login`,
  usersController.getUserByUsername,
  usersController.checkUserPassword,
  (req, res) => {
    res.status(200).json({ status: 'success', data: res.locals.user });
  }
);

router.post(`/signup`, usersController.createUser, (req, res) => {
  res.status(200).json({ status: 'success', data: res.locals.newUser });
});

router.patch(
  `/:id/update-profile-description`,
  usersController.updateUserProfileDescription,
  (req, res) => {
    console.log(`START OF MIDDLEWARE`);
    res.status(200).json({ status: `success`, data: res.locals.updatedUser });
  }
);

router.patch(
  `/:id/update-photo`,
  (req, res, next) => {
    console.log(`MADE IT TO BEGINNING OF UPDATE PHOTO`);
    console.log(`BODY `, req.body);
    console.log(`FILE `, req.file);

    next();
  },
  usersController.uploadUserPhoto,
  usersController.updateDBWithPhotoPath,
  (req, res) => {
    console.log(`FILE `, req.file);

    res.status(200).json({ status: `success`, data: res.locals.updatedUser });
  }
);

//FIRST WAY OF USING MULTER.. UPLOADS FILE BUT IN A HUGE BINARY KINDA WAY
// router.patch(`/update-photo`, upload.single('photo'), (req, res) => {
//   console.log(`BODY `, req.body);
//   console.log(`FILE `, req.file);

//   res.send(`TESTING TESTING`);
// });

module.exports = router;
