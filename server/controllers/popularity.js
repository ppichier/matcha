const error = require("./error");
const pool = require("../db");

exports.getUserLike = (req, res) => {
  let userId = req.userId;
  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(
        "SELECT user_like.LikeDate AS `date`, user.Uuid as uuid, user.UserName AS pseudo, user.Age AS age FROM user_like INNER JOIN user ON user_like.LikeSender = user.UserId  WHERE LikeReceiver = ? ORDER BY LikeDate DESC  LIMIT 30",
        [userId],
        (err, result) => {
          if (err) {
            error.handleError(res, err, "Internal error", 500, connection);
          } else {
            connection.release();
            return res.json({ people: result });
          }
        }
      );
    }
  });
};

exports.getUserVisit = (req, res) => {
  let userId = req.userId;
  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(
        "SELECT user_visit.UserVisitDate AS `date`, user.Uuid as uuid, user.UserName AS pseudo, user.Age AS age FROM user_visit INNER JOIN user ON user_visit.UserVisitor = user.UserId  WHERE UserVisited = ? ORDER BY UserVisitDate DESC  LIMIT 30",
        [userId],
        (err, result) => {
          if (err) {
            error.handleError(res, err, "Internal error", 500, connection);
          } else {
            connection.release();
            return res.json({ people: result });
          }
        }
      );
    }
  });
};
