exports.profile = (req, res) => {
  console.log("youhou");
  return res.json({
    msg: req.userId
  });
};
