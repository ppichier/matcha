const pool = require("../db");
const error = require("./error");

exports.getUsersReports = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal Error",
      });
    }
    connection.query(
      "SELECT user.UserName as pseudo, user.Uuid as uuid, count(*) as count  FROM user_report INNER JOIN user ON user.UserId = user_report.UserReportReceiver GROUP BY user_report.UserReportReceiver ORDER BY count DESC",
      [],
      (err, result) => {
        if (err) {
          error.handleError(res, err, "Internal error", 500, connection);
        } else {
          connection.release();
          return res.json(result);
        }
      }
    );
  });
};

exports.isAdmin = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal Error",
      });
    }
    connection.query(
      "SELECT isAdmin FROM User WHERE Uuid = ?",
      [req.userUuid],
      (err, result) => {
        if (err) {
          error.handleError(res, err, "Internal error", 500, connection);
        } else if (result[0].isAdmin) {
          connection.release();
          return res.json({ auth: true });
        } else {
          connection.release();
          return res.json({ auth: false });
        }
      }
    );
  });
};

exports.deleteUser = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal Error",
      });
    }
    connection.query(
      "DELETE FROM `user` WHERE Uuid = ?",
      [req.body.uuid],
      (err, result) => {
        if (err) {
          error.handleError(res, err, "Internal error", 500, connection);
        } else {
          connection.release();
          return res.json({ msg: "Utilisateur supprimé." });
        }
      }
    );
  });
};
