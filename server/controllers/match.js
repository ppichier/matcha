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

exports.filterProfile = async (req, res) => {
  const { age, location, score, userSize, selectedTags, moreProfiles } = req.body;
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
              try {
                let tagsTmp = await utils.validatorFilter(selectedTags);
                tagsParams = tagsTmp.map(tag => tag.TagId).join();
              } catch {
                error.handleError(res, err, "Intenal error", 500, connection);
              }
            }
            let ageFilter = age[0] === 17 && age[1] === 17 ? [17, 66] : age;
            const locationFilter =
              location[0] === 0 && location[1] === 0 ? [0, 100] : location;
            const scoreFilter =
              score[0] === 0 && score[1] === 0 ? [0, 1000] : score;
            const userSizeFilter =
              userSize[0] === 129 && userSize[1] === 129
                ? [129, 230]
                : userSize;
            const lat = result[0].Lat;
            const lng = result[0].Lng;
            const userIdUser = result[0].UserId;
            const genreId = result[0].GenreId;
            const sexualOrientationId = result[0].SexualOrientationId;
            connection.query(
              `SELECT *, ( 6371 * ACOS( COS(RADIANS(${lat})) * COS(RADIANS(Lat)) * COS(RADIANS(Lng) - RADIANS(${lng})) + SIN(RADIANS(${lat})) * SIN(RADIANS(Lat)))) AS DISTANCE FROM user WHERE GenreId = ? AND SexualOrientationId = ? AND age >= ? AND age <= ? AND score >= ? And score <= ? AND userSize >= ? And userSize <= ? ORDER BY DISTANCE ASC  LIMIT ?;
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
                moreProfiles,
                sexualOrientationId,
                genreId
              ],
              (err, result) => {
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
                      isLiked: 0, // Modify when implement like
                      tagsNumber: e.TagsNumber ? e.TagsNumber : 0,
                      userSize: e.UserSize
                    }))
                    .filter(
                      e =>
                        e.distance >= locationFilter[0] &&
                        e.distance <= locationFilter[1] &&
                        (selectedTags.length === 0 || e.tagsNumber > 0)
                    )
                    .value();
                  let profiles = utils.sortProfile(merged);
                  console.log(profiles)
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
  console.log("---------------------------------------")
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
                      isLiked: 0, // Modify when implement like
                      tagsNumber: e.TagsNumber ? e.TagsNumber : 0,
                      userSize: e.UserSize
                    }))
                    .value();
                  let profiles = utils.sortProfile(merged);
                  console.log(profiles)
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

/* ADD or DELETE row in user_like */

const getIds = (userUuid, userLikedUuid, connection) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT UserId FROM user WHERE Uuid = ?; SELECT UserId FROM user WHERE Uuid = ?",
      [[userUuid], [userLikedUuid]],
      (err, result) => {
        if (err) reject(500);
        else {
          resolve({
            userId: result[0][0].UserId,
            userLikedId: result[1][0].UserId
          });
        }
      }
    );
  });
};

const addRowUserLike = (userId, userLikedId, connection) => {
  // Checi if B likes A -> yes : socketio emit notif
  return new Promise((resolve, reject) => {
    console.log("add");
    connection.query(
      "SELECT * FROM user_like WHERE LikeSender = ? AND LikeReceiver = ?",
      [userId, userLikedId],
      (err, result) => {
        if (err) reject(500);
        else if (result.length !== 0) resolve({ msg: "like" });
        else {
          connection.query(
            "INSERT INTO user_like (LikeSender, LikeReceiver) VALUES (?, ?)",
            [userId, userLikedId],
            (err, result) => {
              if (err) reject(500);
              else {
                connection.release();
                resolve({ msg: "like" });
              }
            }
          );
        }
      }
    );
  });
};

const deleteRowUserLike = (userId, userLikedId, connection) => {
  // Checi if B likes A -> yes : socketio emit notif - delete messages
  return new Promise((resolve, reject) => {
    console.log("delete");
    connection.query(
      "DELETE FROM user_like WHERE LikeSender = ? AND LikeReceiver = ?",
      [userId, userLikedId],
      (err, result) => {
        if (err) reject(500);
        else {
          connection.release();
          resolve({ msg: "dislike" });
        }
      }
    );
  });
};

exports.heartClick = (req, res) => {
  console.log(req.body);
  pool.getConnection(async (err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      try {
        let { userId, userLikedId } = await getIds(
          req.userUuid,
          req.body.userUuid,
          connection
        );
        let p = {};
        if (req.body.isLiked) {
          p = await addRowUserLike(userId, userLikedId, connection);
        } else {
          p = await deleteRowUserLike(userId, userLikedId, connection);
        }
        return res.json(p);
      } catch {
        error.handleError(res, err, "Internal error", 500, connection);
      }
    }
  });
};

/* end user_like */
