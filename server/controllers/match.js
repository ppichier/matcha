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
            const genreId = result[0].GenreId;
            const sexualOrientationId = result[0].SexualOrientationId;
            connection.query(
              `SELECT *, ( 6371 * ACOS( COS(RADIANS(${lat})) * COS(RADIANS(Lat)) * COS(RADIANS(Lng) - RADIANS(${lng})) + SIN(RADIANS(${lat})) * SIN(RADIANS(Lat)))) AS DISTANCE FROM user WHERE GenreId = ? AND SexualOrientationId = ? ORDER BY DISTANCE ASC LIMIT 0,10;
            SELECT count(*) AS nombre , user_tag.UserId FROM user_tag, user WHERE (tagId IN (${tagsParams})) AND (user.GenreId = ?) AND (user.SexualOrientationId = ?) GROUP BY user_tag.UserId ORDER BY count(*) DESC`,
              [sexualOrientationId, genreId, sexualOrientationId, genreId],
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

// SELECT
// *,
// (
//     6371 * ACOS(
//         COS(RADIANS(48.86550000)) * COS(RADIANS(Lat)) * COS(RADIANS(Lng) - RADIANS(2.35510000)) + SIN(RADIANS(48.86550000)) * SIN(RADIANS(Lat))
//     )
// ) AS DISTANCE
// FROM
// USER

// LEFT JOIN (SELECT count(*) AS nombre , user_tag.UserId FROM user_tag, user)

// ON USER.UserId = user_tag.UserId
// WHERE
// user.GenreId = 1 AND user.SexualOrientationId = 2 AND (user_tag.tagId IN (3)) AND (user.GenreId = 2) AND (user.SexualOrientationId = 1)
// ORDER BY
// DISTANCE ASC
// LIMIT 0, 10
