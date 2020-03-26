const error = require("./error");
const pool = require("../db");

exports.getMatchUsers = (req, res) => {
  let userId = req.userId;

  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(
        "SELECT Uuid AS uuid, UserName AS userName FROM user WHERE user.UserId IN (SELECT C.LikeSender FROM user_like C WHERE EXISTS (SELECT T.LikeReceiver FROM user_like T WHERE T.LikeSender = ?) AND C.LikeReceiver = ?)",
        [userId, userId],
        (err, result) => {
          if (err) {
            error.handleError(res, err, "Internal error", 500, connection);
          } else {
            console.log(result);
            connection.release();
            return res.json({ matchPeople: result });
          }
        }
      );
    }
  });
};
