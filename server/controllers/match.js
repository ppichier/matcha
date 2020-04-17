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
          let commonTags = result.map((e) => {
            return {
              value: e.Label,
              label: e.Label,
            };
          });
          return res.json({
            commonTags: commonTags,
          });
        }
      });
    }
  });
};

exports.filterProfile = (req, res) => {
  const {
    age,
    location,
    score,
    userSize,
    selectedTags,
    moreProfiles,
    searchActif,
  } = req.body;
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
                let tags = tagsTmp.map((tag) => tag.TagId);
                tagsParams = tags.join();
              }
            } else {
              try {
                let tagsTmp = await utils.validatorFilter(selectedTags);
                tagsParams = tagsTmp.map((tag) => tag.TagId).join();
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
            const genreId =
              result[0].GenreId === 6 ||
              result[0].GenreId === 5 ||
              searchActif === "search"
                ? [1, 2, 5, 6]
                : result[0].GenreId;
            const sexualOrientationId =
              result[0].SexualOrientationId === 6 ||
              result[0].SexualOrientationId === 5 ||
              searchActif === "search"
                ? [1, 2, 5, 6]
                : result[0].SexualOrientationId;
            const offset =
              selectedTags.length === 0
                ? `LIMIT 20 OFFSET ${moreProfiles[1]}`
                : "";
            const reqSql =
              "GenreId IN (?) AND SexualOrientationId IN (?) AND age >= ? AND age <= ? AND score >= ? And score <= ? AND userSize >= ? And UserSize <= ? AND UserId <> ?";
            connection.query(
              `SELECT *, (SELECT count(*) FROM user WHERE ${reqSql} ) AS resultsNumber, ( 6371 * ACOS( COS(RADIANS(${lat})) * COS(RADIANS(Lat)) * COS(RADIANS(Lng) - RADIANS(${lng})) + SIN(RADIANS(${lat})) * SIN(RADIANS(Lat)))) AS DISTANCE FROM user WHERE ${reqSql} ORDER BY DISTANCE ASC ${offset};
               SELECT count(*) AS TagsNumber , T.UserId FROM user_tag T, user U WHERE tagId IN (${tagsParams}) AND U.UserId = T.UserId AND U.GenreId IN (?) AND U.SexualOrientationId IN (?) GROUP BY T.UserId ORDER BY count(*) DESC;
                SELECT UserLikeId AS likes, LikeReceiver AS UserId FROM user_like WHERE LikeSender= ?;
                SELECT UserLikeId AS likesMe, LikeSender AS UserId FROM user_like WHERE LikeReceiver = ?`,
              [
                sexualOrientationId,
                genreId,
                ageFilter[0],
                ageFilter[1],
                scoreFilter[0],
                scoreFilter[1],
                userSizeFilter[0],
                userSizeFilter[1],
                userIdUser,
                sexualOrientationId,
                genreId,
                ageFilter[0],
                ageFilter[1],
                scoreFilter[0],
                scoreFilter[1],
                userSizeFilter[0],
                userSizeFilter[1],
                userIdUser,
                sexualOrientationId,
                genreId,
                userIdUser,
                userIdUser,
              ],
              (err, result) => {
                if (err) {
                  error.handleError(res, err, "Intenal error", 500, connection);
                } else {
                  connection.release();
                  let resultsNumber = 0;
                  if (
                    result[0].length > 0 &&
                    result[0][0].resultsNumber !== undefined &&
                    selectedTags.length === 0
                  )
                    resultsNumber = result[0][0].resultsNumber;
                  else if (
                    result[0].length > 0 &&
                    result[0][0].resultsNumber !== undefined &&
                    selectedTags.length !== 0
                  )
                    resultsNumber = result[1].length;
                  let a = [];
                  for (let i = 0; i < result.length; i++) {
                    a[i] = _.chain(result[i])
                      .map((r) => ({ ...r }))
                      .value();
                  }
                  let merged = _.chain(
                    _.merge(
                      _.keyBy(a[0], "UserId"),
                      _.keyBy(a[1], "UserId"),
                      _.keyBy(a[2], "UserId"),
                      _.keyBy(a[3], "UserId")
                    )
                  )
                    .map((e) => ({
                      pseudo: e.UserName,
                      firstName: e.FirstName,
                      score: e.Score,
                      age: e.Age,
                      distance: Math.round(e.DISTANCE * 100) / 100,
                      userUuid: e.Uuid,
                      isLiked: e.likes ? 1 : 0,
                      likesMe: e.likesMe ? 1 : 0,
                      tagsNumber: e.TagsNumber ? e.TagsNumber : 0,
                      userSize: e.UserSize,
                    }))
                    .filter(
                      (e) =>
                        e.distance >= locationFilter[0] &&
                        e.distance <= locationFilter[1] &&
                        (selectedTags.length === 0 || e.tagsNumber > 0)
                    )
                    .value();
                  let profiles = utils.sortProfile(merged);
                  if (selectedTags.length > 0 && profiles.length > 0) {
                    const end =
                      moreProfiles[1] + 20 > profiles.length
                        ? profiles.length
                        : moreProfiles[1] + 20;
                    profiles = _.slice(profiles, moreProfiles[1], end);
                  }
                  return res.json({
                    profiles,
                    resultsNumber,
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
  let moreProfiles = req.body.moreProfiles;
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
              let tags = tagsTmp.map((tag) => tag.TagId);
              tagsParams = tags.join();
            }
            const stateProfile =
              result[0].StateProfile >= 60 ? "match" : "search";
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
            connection.query(
              `SELECT *,( SELECT count(*) FROM user WHERE GenreId IN (?) AND SexualOrientationId IN (?) ) AS resultsNumber, ( 6371 * ACOS( COS(RADIANS(${lat})) * COS(RADIANS(Lat)) * COS(RADIANS(Lng) - RADIANS(${lng})) + SIN(RADIANS(${lat})) * SIN(RADIANS(Lat)))) AS DISTANCE FROM user WHERE GenreId IN (?) AND SexualOrientationId IN (?) AND UserId <> ? ORDER BY DISTANCE ASC LIMIT 20 OFFSET ?;
               SELECT count(*) AS TagsNumber , T.UserId FROM user_tag T, user U WHERE tagId IN (${tagsParams}) AND U.UserId = T.UserId AND U.GenreId IN (?) AND U.SexualOrientationId IN (?) GROUP BY T.UserId ORDER BY count(*) DESC;
               SELECT UserLikeId AS likes, LikeReceiver AS UserId FROM user_like WHERE LikeSender= ?;
                SELECT UserLikeId AS likesMe, LikeSender AS UserId FROM user_like WHERE LikeReceiver = ?`,

              [
                sexualOrientationId,
                genreId,
                sexualOrientationId,
                genreId,
                userIdUser,
                moreProfiles[1],
                sexualOrientationId,
                genreId,
                userIdUser,
                userIdUser,
              ],
              async (err, result) => {
                if (err) {
                  error.handleError(res, err, "Intenal error", 500, connection);
                } else {
                  connection.release();
                  let resultsNumber = 0;
                  if (
                    result[0].length > 0 &&
                    result[0][0].resultsNumber !== undefined
                  )
                    resultsNumber = result[0][0].resultsNumber;
                  let a = [];
                  for (let i = 0; i < result.length; i++) {
                    a[i] = _.chain(result[i])
                      .map((r) => ({ ...r }))
                      .value();
                  }
                  let merged = _.chain(
                    _.merge(
                      _.keyBy(a[0], "UserId"),
                      _.keyBy(a[1], "UserId"),
                      _.keyBy(a[2], "UserId"),
                      _.keyBy(a[3], "UserId")
                    )
                  )
                    .map((e) => ({
                      pseudo: e.UserName,
                      firstName: e.FirstName,
                      score: e.Score,
                      age: e.Age,
                      distance: Math.round(e.DISTANCE * 100) / 100,
                      userUuid: e.Uuid,
                      isLiked: e.likes ? 1 : 0,
                      likesMe: e.likesMe ? 1 : 0,
                      tagsNumber: e.TagsNumber ? e.TagsNumber : 0,
                      userSize: e.UserSize,
                    }))
                    .value();
                  let profiles = utils.sortProfile(merged);
                  return res.json({
                    profiles,
                    resultsNumber,
                    stateProfile,
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

const addRowUserLike = (userId, userLikedId, connection) => {
  // Checi if B likes A -> yes : socketio emit notif
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM user_like WHERE LikeSender = ? AND LikeReceiver = ?",
      [userId, userLikedId],
      (err, result) => {
        if (err) reject(500);
        else if (result.length !== 0) {
          connection.release();
          resolve({ msg: "like" });
        } else {
          connection.query(
            //We have to check if score is 0.
            "SELECT * FROM user_like WHERE LikeSender = ? AND LikeReceiver = ? ;INSERT INTO user_like (LikeSender, LikeReceiver) VALUES (?, ?); UPDATE USER SET Score = Score + 10 WHERE UserId = ?;  ",
            [userLikedId, userId, userId, userLikedId, userLikedId],
            (err, result) => {
              if (err) reject(500);
              else {
                let typeNotif = 2;
                if (result[0].length > 0) typeNotif = 3;
                connection.query(
                  "INSERT INTO notification (NotificationSender, NotificationReceiver, NotificationType) VALUES (?,?,?); UPDATE user SET NotificationNumber = NotificationNumber + 1 WHERE UserId = ?;",
                  [userId, userLikedId, typeNotif, userLikedId],
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
        }
      }
    );
  });
};

const deleteRowUserLike = (userId, userLikedId, connection) => {
  // Checi if B likes A -> yes : socketio emit notif - delete messages
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM user_like WHERE LikeSender = ? AND LikeReceiver = ?; DELETE FROM message WHERE (MessageSender = ? AND MessageReceiver = ?) OR (MessageSender = ? AND MessageReceiver = ?);DELETE FROM last_message WHERE (LastMessageFrom = ? AND LastMessageTo = ?) OR (LastMessageFrom = ? AND LastMessageTo = ?)",
      [
        userId,
        userLikedId,
        userId,
        userLikedId,
        userLikedId,
        userId,
        userId,
        userLikedId,
        userLikedId,
        userId,
      ],
      (err, result) => {
        if (err) {
          reject(500);
        } else if (result[0].affectedRows > 0) {
          connection.query(
            "SELECT * FROM user_like WHERE LikeSender = ? AND LikeReceiver = ? ;UPDATE USER SET Score = Score - 10 WHERE UserId = ?",
            [userLikedId, userId, userLikedId],
            (err, result) => {
              if (err) reject(500);
              else if (result[0].length > 0) {
                connection.query(
                  "INSERT INTO notification (NotificationSender, NotificationReceiver, NotificationType) VALUES (?,?,?); UPDATE user SET NotificationNumber = NotificationNumber + 1 WHERE UserId = ?;",
                  [userId, userLikedId, 5, userLikedId],
                  (err, result) => {
                    if (err) reject(500);
                    else {
                      connection.release();
                      resolve({ msg: "like" });
                    }
                  }
                );
              } else {
                connection.release();
                resolve({ msg: "dislike" });
              }
            }
          );
        } else {
          connection.release();
          resolve({ msg: "dislike" });
        }
      }
    );
  });
};

const checkProfileImage = (userId, connection) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT ImageProfile, Image1, Image2, Image3, Image4 FROM user WHERE UserId = ?",
      [userId],
      (err, result) => {
        if (err) reject(500);
        else {
          for (let [key, value] of Object.entries(result[0])) {
            if (value !== null) resolve(true);
          }
          resolve(false);
        }
      }
    );
  });
};

exports.heartClick = (req, res) => {
  pool.getConnection(async (err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      try {
        let { userId, userLikedId } = await utils.getIds(
          req.userUuid,
          req.body.userUuid,
          connection
        );
        let p = {};
        if (req.body.isLiked) {
          let userHasImages = await checkProfileImage(userId, connection);
          if (!userHasImages) {
            connection.release();
            return res.status(403).json({
              err: "Vous devez avoir au moins une photo pour pouvoir liker.",
            });
          }
          p = await addRowUserLike(userId, userLikedId, connection);
        } else {
          p = await deleteRowUserLike(userId, userLikedId, connection);
        }
        return res.json(p);
      } catch (err) {
        error.handleError(res, err, "Internal error", 500, connection);
      }
    }
  });
};

/* end user_like */
