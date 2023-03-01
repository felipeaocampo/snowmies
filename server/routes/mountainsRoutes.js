const express = require(`express`);

const mountainsController = require(`../controllers/mountainsController`);

const router = express.Router();

//FIND ALL COMMENTS IN COMMENTS PROPERTY
router.get(`/name/:name`, mountainsController.getMountainByName, (req, res) => {
  res.status(200).json({ status: `success`, data: res.locals.mountain });
});

//FIND ALL COMMENTS IN COMMENTS PROPERTY
router.get(`/id/:id`, mountainsController.getMountainById, (req, res) => {
  res.status(200).json({ status: `success`, data: res.locals.mountain });
});

router.post(`/`, mountainsController.createNewMountain, (req, res) => {
  res.status(200).json({ status: `success`, data: res.locals.newMountain });
});

router.patch(
  `/addcomment`,
  mountainsController.updateMountainCommentsAdd,
  (req, res) => {
    res.status(200).json({ status: `success`, data: res.locals.comments });
  }
);

router.patch(
  `/:id/deletecomment`,
  mountainsController.updateMountainCommentsDelete,
  (req, res) => {
    res
      .status(200)
      .json({ status: `success`, data: res.locals.updatedMountain });
  }
);

router.patch(
  `/:id/liked`,
  mountainsController.updateMountainCommentsLiked,
  (req, res) => {
    res
      .status(200)
      .json({ status: `success`, data: res.locals.updatedMountain });
  }
);

router.delete(`/:id`, mountainsController.deleteMountain, (req, res) => {
  res.status(200).json({ status: `success` });
});

module.exports = router;
