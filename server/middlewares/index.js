const pool = require("../db");
const error = require("../controllers/error");

exports.getUserId = (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(
        "SELECT UserId FROM user WHERE Uuid = ?",
        [req.userUuid],
        (err, result) => {
          if (err) {
            error.handleError(res, err, "Internal error", 500, connection);
          } else {
            connection.release();
            req.userId = result[0].UserId;
            next();
          }
        }
      );
    }
  });
};
