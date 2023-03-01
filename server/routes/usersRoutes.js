const express = require(`express`);

const router = express.Router();

router.get(`/:id`, (req, res) => {
  res.status(200).json({ status: 'WORKING ON IT' });
});

router.post(`/`, (req, res) => {
  res.status(200).json({ status: 'WORKING ON IT' });
});

router.patch(`/:id`, (req, res) => {
  res.status(200).json({ status: `WORKING ON IT` });
});

module.exports = router;
