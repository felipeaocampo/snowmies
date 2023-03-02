const mongoose = require(`mongoose`);

const Mountain = require(`../models/mountainModel`);
const Comment = require(`../models/commentModel`);

exports.createNewMountain = async (req, res, next) => {
  try {
    const mountain = await Mountain.create(req.body);

    if (!mountain || mountain.length === 0) {
      return next({
        log: 'Error in mountainsController.js createNewMountain middleware',
        message: 'Error in DB creating this mountain',
      });
    }

    res.locals.newMountain = mountain;

    next();
  } catch (error) {
    return next({
      log: 'Error in mountainsController.js createNewMountain middleware',
      message: error.message,
    });
  }
};

exports.getMountainById = async (req, res, next) => {
  try {
    const mountain = await Mountain.findById({ _id: req.params.id });

    if (!mountain || mountain.length === 0) {
      return next({
        log: 'Error in mountainsController.js getMountainById middleware',
        message: 'No mountain for this id in DB',
      });
    }

    res.locals.mountain = mountain;

    next();
  } catch (error) {
    return next({
      log: 'Error in usersController.js getMountainById middleware',
      message: error.message,
    });
  }
};

exports.getMountainByName = async (req, res, next) => {
  try {
    const mountain = await Mountain.find({ name: req.params.name });

    if (!mountain || mountain.length === 0) {
      return next({
        log: 'Error in mountainsController.js getMountainByName middleware',
        message: 'No mountain for this name in DB',
      });
    }

    res.locals.mountain = mountain;

    next();
  } catch (error) {
    return next({
      log: 'Error in usersController.js getMountainByName middleware',
      message: error.message,
    });
  }
};

exports.updateMountainCommentsAdd = async (req, res, next) => {
  try {
    //PARAMS.ID IS THE MOUNTAIN ID, NOT COMMENT ID
    const { id } = req.params;
    const { comment } = req.body;

    const newComment = await Comment.create(comment);

    const mountain = await Mountain.findByIdAndUpdate(
      { _id: id },
      { $push: { comments: newComment } },
      { new: true }
    );

    if (!mountain || mountain.length === 0) {
      return next({
        log: 'Error in mountainsController.js updateMountainCommentsAdd middleware',
        message: 'No mountain for this id in DB',
      });
    }

    res.locals.comments = mountain;

    next();
  } catch (error) {
    return next({
      log: 'Error in usersController.js updateMountainCommentsAdd middleware',
      message: error.message,
    });
  }
};

exports.updateMountainCommentsLiked = async (req, res, next) => {
  try {
    //PARAMS.ID IS THE MOUNTAIN ID, NOT COMMENT ID
    const { id } = req.params;
    const { commentId } = req.body;

    const mountain = await Mountain.findById(id);

    if (!mountain || mountain.length === 0) {
      return next({
        log: 'Error in mountainsController.js updateMountainCommentsLiked middleware',
        message: 'No mountain for this id in DB',
      });
    }

    const commentIndex = mountain.comments.findIndex((comment) => {
      return comment._id.toString() === commentId;
    });

    //STEP2
    const comment = await Comment.findById({ _id: commentId });
    const currentLikedVal = comment.liked;

    const updatedComment = await Comment.findByIdAndUpdate(
      { _id: commentId },
      { liked: !currentLikedVal },
      { new: true }
    );

    if (!updatedComment || updatedComment.length === 0) {
      return next({
        log: 'Error in mountainsController.js updateMountainCommentsLiked middleware',
        message: 'No comment for this id in DB',
      });
    }

    //STEP 3... the mountain.comments[commentIndex].liked to be reassigned directly and then saved (even tho it was logging correctly just not updating on DB, WEIRD.. so I'm just replacing the whole object w/ updated copy in comments collection)
    mountain.comments[commentIndex] = comment;

    const updatedMountain = await mountain.save();

    res.locals.updatedMountain = updatedMountain;

    next();
  } catch (error) {
    return next({
      log: 'Error in usersController.js updateMountainCommentsLiked middleware',
      message: error.message,
    });
  }
};

exports.updateMountainCommentsDelete = async (req, res, next) => {
  try {
    //PARAMS.ID IS THE MOUNTAIN ID, NOT COMMENT ID
    const { id } = req.params;
    const { commentId } = req.body;

    const mountain = await Mountain.findById(id);

    if (!mountain || mountain.length === 0) {
      return next({
        log: 'Error in mountainsController.js updateMountainCommentsDelete middleware',
        message: 'No mountain for this id in DB',
      });
    }

    const commentIndex = mountain.comments.findIndex((comment) => {
      return comment._id.toString() === commentId;
    });

    if (commentIndex === -1) {
      return next({
        log: 'Error in mountainsController.js updateMountainCommentsDelete middleware',
        message: 'No comment for this id in mountains collection',
      });
    }

    mountain.comments.splice(commentIndex, 1);

    const updatedMountain = await mountain.save();

    res.locals.updatedMountain = updatedMountain;

    await Comment.findByIdAndDelete({ _id: commentId });
    console.log(`PASSED SECOND DELETE`);

    next();
  } catch (error) {
    return next({
      log: 'Error in usersController.js updateMountainCommentsDelete middleware',
      message: error.message,
    });
  }
};

exports.deleteMountain = async (req, res, next) => {
  try {
    await Mountain.findByIdAndDelete(req.params.id);
    console.log(`INSIDE DELETE`);

    next();
  } catch (error) {
    return next({
      log: 'Error in usersController.js updateMountainCommentsDelete middleware',
      message: error.message,
    });
  }
};
