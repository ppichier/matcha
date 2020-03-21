const error = require("../controllers/error");
const pool = require("../db");
const _ = require("lodash");

exports.getUserTags = userId => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        error.handleError(res, err, "Internal error", 500, connection);
      } else {
        connection.query(
          `SELECT tag.* FROM user_tag INNER JOIN tag ON user_tag.TagId = tag.TagId WHERE UserId = (SELECT UserId FROM user WHERE Uuid = ?);`,
          [userId],
          (err, result) => {
            connection.release();
            if (err) {
              reject("Internal Error");
            } else {
              resolve(result);
            }
          }
        );
      }
    });
  });
};

exports.validatorFilter = selectedTags => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        error.handleError(res, err, "Internal error", 500, connection);
      } else {
        connection.query(
          "SELECT TagId FROM tag WHERE Label IN (?)",
          [selectedTags],
          (err, result) => {
            if (err) {
              reject("Internal Error");
            } else {
              resolve(result);
            }
          }
        );
      }
    });
  });
};

exports.sortProfile = profiles => {
  return _.orderBy(
    profiles,
    ["distance", "tagsNumber", "score"],
    ["asc", "desc", "desc"]
  );
};
