const express = require(`express`);

const usersController = require(`../controllers/usersController`);

const router = express.Router();

router.post(
  `/login`,
  usersController.getUserByUsername,
  usersController.checkCredentials,
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

module.exports = router;
