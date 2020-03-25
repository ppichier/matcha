const error = require("./error");
const pool = require("../db");

exports.getMatchUsers = (req, res) => {
  let userId = req.userId;
  let userUuid = req.userUuid;

  //   SELECT user_like.LikeReceiver FROM user_like WHERE user_like.LikeSender = 121
  //   UNION
  //   SELECT user_like.LikeSender FROM user_like WHERE user_like.LikeReceiver = 121;

  //   console.log(userId);
  //     pool.getConnection((err, connection) => {
  //       if (err) {
  //         error.handleError(res, err, "Internal error", 500, connection);
  //       } else {
  //         connection.query("SELECT UserId, u", [userUuid], (err, result) => {
  //           if (err) {
  //             error.handleError(res, err, "Internal error", 500, connection);
  //           } else {
  //             console.log(result);
  //             connection.release();
  //           }
  //         });
  //       }
  //     });

  return res.json({ msg: "ok" });
};
