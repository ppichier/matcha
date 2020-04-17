const error = require("./error");
const pool = require("../db");

exports.getMatchUsers = (req, res) => {
  let userId = req.userId;

  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(
        "SELECT UserId as id, Uuid AS uuid, UserName AS userName, LastConnection AS online FROM user WHERE user.UserId IN (SELECT C.LikeSender FROM user_like C WHERE EXISTS (SELECT T.LikeReceiver FROM user_like T WHERE C.LikeSender = T.LikeReceiver AND T.LikeSender = C.LikeReceiver ) AND C.LikeReceiver = ?)",
        [userId],
        (err, result) => {
          if (err) {
            error.handleError(res, err, "Internal error", 500, connection);
          } else {
            let ids = result.map((e) => {
              return { id: e.id, uuid: e.uuid };
            });
            // ids = [...ids, { id: userId, uuid: req.userUuid }];
            let guestIds = result.map((e) => e.id);
            let matchPeople = result.map((e) => {
              return { ...e, id: undefined };
            });

            connection.query(
              "SELECT LastMessageFrom AS `from`, LastMessageTo AS `to`, LastMessageContent AS msg FROM last_message WHERE (LastMessageFrom = ? AND LastMessageTo IN (?) ) OR (LastMessageFrom IN (?) AND LastMessageTo = ?)",
              [userId, guestIds, guestIds, userId],
              (err, result) => {
                if (err) {
                  error.handleError(
                    res,
                    err,
                    "Internal error",
                    500,
                    connection
                  );
                } else {
                  let lastMessages = result.map((e) => {
                    // const f = ids.find(r => r.id === e.to);
                    // if (!f) return;
                    if (e.from === userId) {
                      return {
                        with: ids.find((r) => r.id === e.to).uuid,
                        from: req.userUuid,
                        // to: ids.find(r => r.id === e.to).uuid,
                        msg: e.msg,
                      };
                    } else {
                      return {
                        with: ids.find((r) => r.id === e.from).uuid,
                        from: ids.find((r) => r.id === e.from).uuid,
                        // to: req.userUuid,
                        msg: e.msg,
                      };
                    }
                  });
                  connection.release();
                  return res.json({ matchPeople, lastMessages });
                }
              }
            );
          }
        }
      );
    }
  });
};
