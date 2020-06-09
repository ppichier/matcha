const pool = require("../db");
const error = require("../controllers/error");
const utils = require("../utility/utils");

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

exports.userIsBlocked = (req, res, next) => {
  // req.body.userUuid
  let userUuid = req.userUuid;
  let guestUuid = req.body.guestUuid || req.body.userUuid; //TODO attention checker variable !!!!!!
  pool.getConnection(async (err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      try {
        let { userId, userLikedId } = await utils.getIds(
          userUuid,
          guestUuid,
          connection
        );
        connection.release();
        let usersBlockedByGuest = await utils.getUsersBlocked(userLikedId);
        if (
          usersBlockedByGuest.findIndex(
            (x) => x.UserBlockedReceiver === userId
          ) !== -1
        ) {
          return res
            .status(401)
            .json({ err: "Cette action n'est pas disponible" });
        } else {
          next();
        }
      } catch (e) {
        return res.status(404).json({ err: "Content Not found" });
      }
    }
  });
};
