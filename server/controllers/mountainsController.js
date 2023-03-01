const mongoose = require(`mongoose`);

const Mountain = require(`../models/mountainModel`);
const Comment = require(`../models/commentModel`);

exports.createNewMountain = async (req, res, next) => {
  const mountain = await Mountain.create(req.body);

  res.locals.newMountain = mountain;

  next();
};

exports.getMountainByName = async (req, res, next) => {
  const mountain = await Mountain.find({ name: req.params.name });
  console.log(mountain);

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
  const { mountainId, commentId } = req.body;

  const mountain = await Mountain.findById(mountainId);

  const commentIndex = mountain.comments.findIndex((comment) => {
    return comment._id.toString() === commentId;
  });

  mountain.comments.splice(commentIndex, 1);

  const updatedMountain = await mountain.save();

  res.locals.updatedMountain = updatedMountain;

  next();
};

exports.updateMountainCommentsLiked = async (req, res, next) => {
  const { mountainId, commentId } = req.body;

  const mountain = await Mountain.findById(mountainId);

  const commentIndex = mountain.comments.findIndex((comment) => {
    return comment._id.toString() === commentId;
  });

  mountain.comments[commentIndex].liked = true;

  const updatedMountain = await mountain.save();
  console.log(updatedMountain);
  res.locals.updatedMountain = updatedMountain;

  next();
};

exports.deleteMountain = async (req, res, next) => {
  await Mountain.findByIdAndDelete(req.params.id);

  next();
};
