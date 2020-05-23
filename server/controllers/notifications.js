const pool = require("../db");
const error = require("../controllers/error");

exports.getNotifications = (req, res) => {
  const userId = req.userId;
  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(
        "SELECT NotificationSender, NotificationType, NotificationDate, user.UserName FROM notification INNER JOIN user ON user.UserId = NotificationSender  WHERE NotificationReceiver = ? ORDER BY NotificationDate DESC LIMIT 30; UPDATE user SET NotificationNumber = 0",
        [userId],
        (err, result) => {
          if (err)
            error.handleError(res, err, "Internal error", 500, connection);
          else {
            connection.release();
            let listNotifications = result[0].map((e) => {
              let title = "";
              let content = "";
              if (e.NotificationType === 1) {
                title = "Nouvelle visite";
                content = `${e.UserName} a visité votre profil.`;
              } else if (e.NotificationType === 2) {
                title = "Like reçu";
                content = `${e.UserName} vous a liké!`;
              } else if (e.NotificationType === 3) {
                title = "Nouveau Match";
                content = `Vous avez matché avec ${e.UserName}!`;
              } else if (e.NotificationType === 4) {
                title = "Nouveau message";
                content = `${e.UserName} vous a envoyé un message.`;
              } else if (e.NotificationType === 5) {
                title = "Match annulé";
                content = `${e.UserName} ne vous like plus.`;
              }
              return {
                sender: e.UserName,
                title,
                content,
                date: e.NotificationDate,
              };
            });
            return res.json({ listNotifications });
          }
        }
      );
    }
  });
};

exports.getNotificationsNumber = (req, res) => {
  const userId = req.userId;
  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(
        "SELECT NotificationNumber FROM user WHERE UserId = ?",
        [userId],
        (err, result) => {
          if (err)
            error.handleError(res, err, "Internal error", 500, connection);
          else {
            connection.release();
            return res.json({
              notificationsNumber: result[0].NotificationNumber,
            });
          }
        }
      );
    }
  });
};
