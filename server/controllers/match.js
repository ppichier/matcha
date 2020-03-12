const fs = require("fs");
const error = require("./error");
const pool = require("../db");
const utils = require("../utility/utils");

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
  const { age, location, score, userSize, selectedTags } = req.body;
  console.log(age);
  console.log(selectedTags);
};

exports.sortProfile = (req, res) => {
  const { sort } = req.body;
  console.log(sort);
};

exports.firstFilter = (req, res) => {
  const userUuid = req.userUuid;
  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(
        "SELECT * FROM  user WHERE Uuid = ?",
        [userUuid],
        async (err, result) => {
          if (err) {
            error.handleError(res, err, "Intenal error", 500, connection);
          } else {
            let tagsTmp = [];
            try {
              tagsTmp = await utils.getUserTags(userUuid);
            } catch {
              error.handleError(res, err, "Intenal error", 500, connection);
            }
            let tags = tagsTmp.map(tag => tag.TagId);
            let tagsParams = tags.join();

            const lat = result[0].Lat;
            const lng = result[0].Lng;
            connection.query(
              `SELECT * FROM  user WHERE GenreId = (SELECT  SexualOrientationId  FROM user WHERE Uuid = ?) AND SexualOrientationId = (SELECT  GenreId  FROM user WHERE Uuid = ?);
            SELECT *, ( 6371 * ACOS( COS(RADIANS(${lat})) * COS(RADIANS(Lat)) * COS(RADIANS(Lng) - RADIANS(${lng})) + SIN(RADIANS(${lat})) * SIN(RADIANS(Lat)))) AS DISTANCE FROM user ORDER BY DISTANCE ASC LIMIT 0,10;
            SELECT count(*) AS nombre , UserId FROM user_tag WHERE tagId IN (${tagsParams}) GROUP BY userId ORDER BY count(*) DESC`,
              [userUuid, userUuid],
              (err, result) => {
                if (err) {
                  error.handleError(res, err, "Intenal error", 500, connection);
                } else {
                  console.log(result);
                }
              }
            );
          }
        }
      );
    }
  });
};
