const Mountain = require(`../models/mountainModel`);

exports.createNewMountain = async (req, res, next) => {
  const mountain = await Mountain.create(req.body);

  res.locals.newMountain = mountain;

  next();
};
