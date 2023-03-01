const mongoose = require(`mongoose`);

const Mountain = require(`../models/mountainModel`);
const Comment = require(`../models/commentModel`);

exports.createNewMountain = async (req, res, next) => {
  const mountain = await Mountain.create(req.body);

  res.locals.newMountain = mountain;

  next();
};

exports.getMountainById = async (req, res, next) => {
  const mountain = await Mountain.findById({ _id: req.params.id });

  res.locals.mountain = mountain;

  next();
};

exports.getMountainByName = async (req, res, next) => {
  const mountain = await Mountain.find({ name: req.params.name });

  res.locals.mountain = mountain;

  next();
};

exports.updateMountainCommentsAdd = async (req, res, next) => {
  const { id, comment } = req.body;

  const newComment = await Comment.create(comment);

  const moutain = await Mountain.findByIdAndUpdate(
    { _id: id },
    { $push: { comments: newComment } },
    { new: true }
  );

  res.locals.comments = moutain.comments;

  next();
};

exports.updateMountainCommentsDelete = async (req, res, next) => {
  const { id } = req.params;
  const { commentId } = req.body;

  const mountain = await Mountain.findById(id);

  const commentIndex = mountain.comments.findIndex((comment) => {
    return comment._id.toString() === commentId;
  });

  mountain.comments.splice(commentIndex, 1);

  const updatedMountain = await mountain.save();
  // console.log(updatedMountain);

  res.locals.updatedMountain = updatedMountain;

  next();
};

exports.updateMountainCommentsLiked = async (req, res, next) => {
  const { id } = req.params;
  const { commentId } = req.body;

  const mountain = await Mountain.findById(id);

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

  //STEP 3... the moutain.comments[commentIndex].liked to be reassigned directly and then saved (even tho it was logging correctly just not updating on DB, WEIRD.. so I'm just replacing the whole object w/ updated copy in comments collection)
  mountain.comments[commentIndex] = comment;

  const updatedMountain = await mountain.save();

  res.locals.updatedMountain = updatedMountain;

  next();
};

exports.deleteMountain = async (req, res, next) => {
  await Mountain.findByIdAndDelete(req.params.id);
  // console.log(`INSIDE DELETE`);

  next();
};
