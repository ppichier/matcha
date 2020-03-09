const fs = require("fs");
const error = require("./error");
const pool = require("../db");

exports.readCommonTag = async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(`SELECT tag.Label FROM  tag`, (err, result) => {
        if (err) {
          error.handleError(res, err, "Intenal error", 500, connection);
        } else {
          let commonTags = result.map(e => {
            return {
              value: e.Label,
              label: e.Label
            };
          });
          connection.release();
          return res.json({
            commonTags: commonTags
          });
        }
      });
    }
  });
};
exports.filterProfile = (req, res) => {
  const { age, location, popularite, userSize } = req.body;
};

exports.sortProfile = (req, res) => {
  const {} = req.body;
};
