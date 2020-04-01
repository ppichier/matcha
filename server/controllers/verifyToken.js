const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(403).json({ auth: false, msg: "No token provided." });
  }
  token = authorization.split(" ")[1];
  if (!token)
    return res.status(403).json({ auth: false, msg: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ auth: false, message: "Failed to authenticate token." });
    }

    req.userUuid = decoded._id;
    next();
  });
};
