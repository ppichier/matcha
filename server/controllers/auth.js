exports.signup = (req, res) => {
  //   console.log("req.body", req.body);
  /* const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }

    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  }); */

  // Check infos format dans req.body
  

  //Envoyer email confirmation
  console.log("req.body", req.body);
  res.json({ msg: "bonjour" });
};
