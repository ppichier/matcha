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
          connection.release();
          let commonTags = result.map(e => {
            return {
              value: e.Label,
              label: e.Label
            };
          });
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
                  connection.release();
                  console.log(result);
                  let profiles = [
                    {
                      pseudo: "CHAR856",
                      firstName: "Charlotte",
                      score: 125,
                      age: 28,
                      distance: 2.5,
                      userUuid: "434e497d-b71e-4d4d-b5b1-602040a46a35"
                    },
                    {
                      pseudo: "waf",
                      firstName: "wafae",
                      score: 89,
                      age: 28,
                      distance: 2.5,
                      userUuid: "33d79c12-97aa-40a8-8b91-fe8720e08a28"
                    },
                    {
                      pseudo: "ppichier",
                      firstName: "Pier'Antonio",
                      score: 1,
                      age: 28,
                      distance: 2.5,
                      userUuid: "cd2b1f92-aa86-40f6-af4f-9285613dbda4"
                    },
                    {
                      pseudo: "clia",
                      firstName: "cola",
                      score: 452,
                      age: 21,
                      distance: 2.5,
                      userUuid: "d58fe372-88c8-45f2-978d-6224f82d92d6"
                    }
                  ];
                  return res.json({
                    profiles
                  });
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
