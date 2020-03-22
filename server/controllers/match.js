const fs = require("fs");
const error = require("./error");
const pool = require("../db");
const utils = require("../utility/utils");
const _ = require("lodash");
const chalk = require("chalk");

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

function filterValid(obj , locationFilter) {
  if(obj.distance >= locationFilter[0] && obj.distance <= locationFilter[1])
    return true;
  else
    return false;
}


exports.filterProfile = async (req, res) => {
  const { age, location, score, userSize, selectedTags } = req.body;
  const userUuid = req.userUuid;
  let tagsParams = [];
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
            if (selectedTags.length === 0) {
              try {
                tagsTmp = await utils.getUserTags(userUuid);
              } catch {
                error.handleError(res, err, "Intenal error", 500, connection);
              }
              tagsParams = [0];
              if (tagsTmp.length > 0) {
                let tags = tagsTmp.map(tag => tag.TagId);
                tagsParams = tags.join();
              }
            } else {
              tagsParams = await utils.validatorFilter(selectedTags);
            }
            const ageFilter = age[0] === 0 && age[1] === 0 ? [17, 66] : age;
            const locationFilter =
              location[0] === 0 && location[1] === 0 ? [0, 100000000000] : location;
            const scoreFilter =
              score[0] === 0 && score[1] === 0 ? [0, 1000] : score;
            const userSizeFilter =
              userSize[0] === 0 && userSize[1] === 0 ? [129, 230] : userSize;
            const lat = result[0].Lat;
            const lng = result[0].Lng;
            const userIdUser = result[0].UserId;
            const genreId = result[0].GenreId;
            const sexualOrientationId = result[0].SexualOrientationId;
            const moreProfile = [0, 20];
            connection.query(
              `SELECT *, ( 6371 * ACOS( COS(RADIANS(${lat})) * COS(RADIANS(Lat)) * COS(RADIANS(Lng) - RADIANS(${lng})) + SIN(RADIANS(${lat})) * SIN(RADIANS(Lat)))) AS DISTANCE FROM user WHERE GenreId = ? AND SexualOrientationId = ? AND age > ? AND age < ? AND score > ? And score < ? AND userSize > ? And userSize < ? ORDER BY DISTANCE ASC  LIMIT ?;
               SELECT count(*) AS TagsNumber , T.UserId FROM user_tag T, user U WHERE tagId IN (${tagsParams}) AND U.UserId = T.UserId AND U.GenreId = ? AND U.SexualOrientationId = ? GROUP BY T.UserId ORDER BY count(*) DESC`,
              [
                sexualOrientationId,
                genreId,
                ageFilter[0],
                ageFilter[1],
                scoreFilter[0],
                scoreFilter[1],
                userSizeFilter[0],
                userSizeFilter[1],
                moreProfile,
                sexualOrientationId,
                genreId
              ],
               (err, result) => {
                if (err) {
                  error.handleError(res, err, "Intenal error", 500, connection);
                }  else {
                  connection.release();
                  let a = [];
                  for (let i = 0; i < result.length; i++) {
                    a[i] = _.chain(result[i])
                      .map(r => ({ ...r }))
                      .filter(e => e.UserId !== userIdUser)
                      .value();
                  }
                  let merged = _.chain(_.merge(_.keyBy(a[0], "UserId"), _.keyBy(a[1], "UserId"))).map(e => ({
                      pseudo: e.UserName,
                      firstName: e.FirstName,
                      score: e.Score,
                      age: e.Age,
                      distance: Math.round(e.DISTANCE * 100) / 100,
                      userUuid: e.Uuid,
                      UserId: e.UserId,
                      isLiked: 0, // Modify when implement like
                      tagsNumber: e.TagsNumber ? e.TagsNumber : 0
                    })).value();
                  let profiles = utils.sortProfile(merged);
                  profiles = profiles.map(r => ({ ...r })).filter(e => filterValid(e, locationFilter))
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

exports.sortProfile = (req, res) => {
  const { sort } = req.body;
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
            let tagsParams = [0];
            if (tagsTmp.length > 0) {
              let tags = tagsTmp.map(tag => tag.TagId);
              tagsParams = tags.join();
            }
            const lat = result[0].Lat;
            const lng = result[0].Lng;
            const userIdUser = result[0].UserId;
            const genreId =
              result[0].GenreId === 6 || result[0].GenreId === 5
                ? [1, 2, 5, 6]
                : result[0].GenreId;
            const sexualOrientationId =
              result[0].SexualOrientationId === 6 ||
              result[0].SexualOrientationId === 5
                ? [1, 2, 5, 6]
                : result[0].SexualOrientationId;
            const moreProfile = [0, 20]; ///pour revenyer plus de profile
            connection.query(
              `SELECT *, ( 6371 * ACOS( COS(RADIANS(${lat})) * COS(RADIANS(Lat)) * COS(RADIANS(Lng) - RADIANS(${lng})) + SIN(RADIANS(${lat})) * SIN(RADIANS(Lat)))) AS DISTANCE FROM user WHERE GenreId IN (?) AND SexualOrientationId IN (?) ORDER BY DISTANCE ASC LIMIT ?;
               SELECT count(*) AS TagsNumber , T.UserId FROM user_tag T, user U WHERE tagId IN (${tagsParams}) AND U.UserId = T.UserId AND U.GenreId IN (?) AND U.SexualOrientationId IN (?) GROUP BY T.UserId ORDER BY count(*) DESC`,
              [
                sexualOrientationId,
                genreId,
                moreProfile,
                sexualOrientationId,
                genreId
              ],
              async (err, result) => {
                if (err) {
                  error.handleError(res, err, "Intenal error", 500, connection);
                } else {
                  connection.release();
                  let a = [];
                  for (let i = 0; i < result.length; i++) {
                    a[i] = _.chain(result[i])
                      .map(r => ({ ...r }))
                      .filter(e => e.UserId !== userIdUser)
                      .value();
                  }
                  let merged = _.chain(
                    _.merge(_.keyBy(a[0], "UserId"), _.keyBy(a[1], "UserId"))
                  )
                    .map(e => ({
                      pseudo: e.UserName,
                      firstName: e.FirstName,
                      score: e.Score,
                      age: e.Age,
                      distance: Math.round(e.DISTANCE * 100) / 100,
                      userUuid: e.Uuid,
                      UserId: e.UserId,
                      isLiked: 0, // Modify when implement like
                      tagsNumber: e.TagsNumber ? e.TagsNumber : 0
                    }))
                    .value();
                  let profiles = utils.sortProfile(merged);
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
