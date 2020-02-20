var formidable = require("formidable");

exports.profile = (req, res) => {
  console.log("youhou");
  return res.json({
    msg: req.userId
  });
};
exports.uploadImage = (req, res) => {
  return res.json({
    msg: req.userId,
    path
  });
};
