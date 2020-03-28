const error = require("./error");
const pool = require("../db");

exports.getMatchUsers = (req, res) => {
  let userId = req.userId;

  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(
        "SELECT Uuid AS uuid, UserName AS userName, LastConnection AS online FROM user WHERE user.UserId IN (SELECT C.LikeSender FROM user_like C WHERE EXISTS (SELECT T.LikeReceiver FROM user_like T WHERE C.LikeSender = T.LikeReceiver AND T.LikeSender = C.LikeReceiver ) AND C.LikeReceiver = ?)",
        [userId],
        (err, result) => {
          if (err) {
            error.handleError(res, err, "Internal error", 500, connection);
          } else {
            connection.release();
            return res.json({ matchPeople: result });
          }
        }
      );
    }
  });
};
