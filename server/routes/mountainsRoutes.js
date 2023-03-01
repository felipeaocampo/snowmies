const express = require(`express`);

const mountainsController = require(`../controllers/mountainsController`);

const router = express.Router();

router.get(`/:id`, (req, res) => {
  res.status(200).json({ status: `WORKING ON IT` });
});

router.post(`/`, mountainsController.createNewMountain, (req, res) => {
  res.status(200).json({ status: `success`, data: res.locals.newMountain });
});

router.patch(`/:id`, (req, res) => {
  res.status(200).json({ status: `WORKING ON IT` });
});

router.delete(`/:id`, (req, res) => {
  res.status(200).json({ status: `WORKING ON IT` });
});

module.exports = router;
