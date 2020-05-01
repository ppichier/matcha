const fs = require("fs");
const error = require("./error");
const pool = require("../db");
const utils = require("../utility/utils");
const _ = require("lodash");
const path = require('path')

exports.updateProfile = (req, res) => {
  const {
    email,
    pseudo,
    firstName,
    lastName,
    age,
    gender,
    sexualPreference,
    description,
    userSize,
    lat,
    lng,
    userUuid,
    localisationActive,
    widthProgressBar,
  } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal Error HERE",
      });
    } else {
      connection.query(
        "SELECT * FROM User WHERE Email = ?; SELECT * FROM User WHERE Username = ?",
        [email, pseudo],
        (err, result) => {
          if (err) {
            error.handleError(res, err, "Internal error", 500, connection);
          } else if (result[0].length > 0 && result[0][0].Uuid !== userUuid) {
            error.handleError(
              res,
              err,
              "Cet email a déjà un compte associé.",
              409,
              connection
            );
          } else if (result[1].length > 0 && result[1][0].Uuid !== userUuid) {
            error.handleError(
              res,
              err,
              "Ce pseudo n'est pas disponible.",
              409,
              connection
            );
          } else {
            connection.query(
              "UPDATE `user` SET `Email`= ?, `UserName`= ?,`FirstName` = ?,`LastName` = ?, `SexualOrientationId` = ? , `GenreId` = ?,`Age` = ?, `UserSize` = ?,`Bio` = ?, `StateProfile` = ? ,`Lat` = ?, `Lng` = ?, `LocalisationActive` = ? WHERE `Uuid` = ?",
              [
                email,
                pseudo,
                firstName,
                lastName,
                sexualPreference,
                gender,
                age,
                userSize,
                description,
                widthProgressBar,
                lat,
                lng,
                localisationActive,
                req.userUuid,
              ],
              (err, result) => {
                if (err) {
                  error.handleError(
                    res,
                    err,
                    "Internal error",
                    500,
                    connection
                  );
                } else {
                  connection.release();
                  return res.json({ msg: "Profil mis à jour" });
                }
              }
            );
          }
        }
      );
    }
  });
};

exports.uploadProfileImage = (req, res) => {
  let userUuid = req.userUuid;
  let file = req.files.photo;
  const types = ['.png', '.jpeg', '.gif']
  //Check format de l image and size

    if(types.indexOf(path.extname(file.name)) === -1)
      return res.status(400).json({
          err: "format invalide",
        });
  var bitmap = fs.readFileSync(
    __dirname + `/../images/${userUuid}/` + file.name
  );
  image64 = new Buffer.from(bitmap).toString("base64");
  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(
        "UPDATE `user` SET `ImageProfile`= ? WHERE Uuid= ?",
        [file.path, userUuid],
        (err, result) => {
          if (err) {
            error.handleError(res, err, "Internal error", 500, connection);
          } else {
            connection.release();
          }
        }
      );
    }
  });

  return res.json({
    image: image64,
    msg: "Profile image upload",
  });
};

exports.uploadSecondaryImages = (req, res) => {
  let image64 = [];
  let files = req.files;
  let userUuid = req.userUuid;
  const types = ['.png', '.jpeg', '.gif']
  const len = Object.keys(files).length; 
  if (len >= 5) {
    return res.status(400).json({
      err: "Vous pouvez upload 5 photos maximum",
    });
  }

  let newFiles = _.filter(files, image => {
    return(types.indexOf(path.extname(image.name)) !== -1)
  });
  const lenNewFiles = newFiles.length
  for (let i = 0; i < lenNewFiles; i++) {
    // const key = "photo" + i;
      const bitmap = fs.readFileSync(
      __dirname + `/../images/${userUuid}/` + newFiles[i].name
    );
    image64.push(new Buffer.from(bitmap).toString("base64"));
    let key = newFiles[i].name.charAt(5)
    console.log(key);
    let columnImage = "Image" + key;
        pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({
          err: "Internal Error",
        });
      }
      connection.query(
        `UPDATE User SET ${columnImage} = ? WHERE Uuid= ?`,
        [newFiles[i].path, req.userUuid],
        (err, result) => {
          if (err) {
            error.handleError(res, err, "Intenal error", 500, connection);
          } else {
            connection.release(); 
          }
        }
      );
    });
  }
  if(image64.length === 0)
    return res.status(400).json({
          err: "format invalide",
        });
 return res.json({
            images: image64,
            msg: "Images uploaded",
            });
  
};

exports.deleteProfileImage = (req, res) => {
  const userUuid = req.userUuid;
  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    }
    connection.query(
      `SELECT * FROM User WHERE Uuid = ?`,
      [userUuid],
      (err, result) => {
        if (err) {
          error.handleError(res, err, "Internal error", 500, connection);
        } else {
          //!if result[0].ImageProfile is undefined
          const image = result[0].ImageProfile;
          connection.query(
            `UPDATE User SET ImageProfile = ? WHERE Uuid = ?`,
            [null, userUuid],
            (err, result) => {
              if (err) {
                error.handleError(res, err, "Internal error", 500, connection);
              } else if (image === null) {
                return error.handleError(
                  res,
                  err,
                  "Internal error",
                  500,
                  connection
                );
              } else {
                fs.unlink(image, (err) => {
                  if (err) {
                    error.handleError(
                      res,
                      err,
                      "Internal error",
                      500,
                      connection
                    );
                  } else {
                    connection.release();
                    return res.json({
                      msg: "image delete",
                    });
                  }
                });
              }
            }
          );
        }
      }
    );
  });
};

exports.deleteSecondaryImage = (req, res) => {
  const { imageIdRemove } = req.body;
  const userUuid = req.userUuid;
  let deleteImage = "Image" + (imageIdRemove + 1);

  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    }
    connection.query(
      `SELECT * FROM User WHERE Uuid = ?`,
      [userUuid],
      (err, result) => {
        if (err) {
          error.handleError(res, err, "Intenal error", 500, connection);
        } else {
          const image = result[0][deleteImage];
          connection.query(
            `UPDATE User SET ${deleteImage} = ? WHERE Uuid = ?`,
            [null, userUuid],
            (err, result) => {
              if (err) {
                error.handleError(res, err, "Intenal error", 500, connection);
              } else if (image === null) {
                return error.handleError(
                  res,
                  err,
                  "Intenal error",
                  500,
                  connection
                );
              } else {
                fs.unlink(image, (err) => {
                  if (err) {
                    error.handleError(
                      res,
                      err,
                      "Internal error",
                      500,
                      connection
                    );
                  } else {
                    connection.release();

                    return res.json({
                      msg: "image delete",
                    });
                  }
                });
              }
            }
          );
        }
      }
    );
  });
};

exports.readSecondaryImages = (req, res) => {
  let uuid = req.body.guestUuid ? req.body.guestUuid : req.userUuid;
  let image64 = [];
  let a = ["image1", "image2", "image3", "image4"];
  if (fs.existsSync(__dirname + `/../images/${uuid}/`)) {
    filesName = fs.readdirSync(__dirname + `/../images/${uuid}/`);
    filesNameTmp = filesName.map((e) => e.substring(0, 6));
    for (let i = 0; i < 4; i++) {
      let j = filesNameTmp.indexOf(a[i]);
      if (j !== -1) {
        const bitmap = fs.readFileSync(
          __dirname + `/../images/${uuid}/` + filesName[j]
        );
        image64.push(new Buffer.from(bitmap).toString("base64"));
      } else {
        image64.push("");
      }
    }
  }

  return res.json({
    images: image64,
    msg: "Read image success",
  });
};

exports.readImage = (req, res) => {
  let uuid = req.body.guestUuid ? req.body.guestUuid : req.userUuid;
  let image64 = "";
  if (fs.existsSync(__dirname + `/../images/${uuid}/`)) {
    filesName = fs.readdirSync(__dirname + `/../images/${uuid}/`);
    filesNameTmp = filesName.map((e) => e.substring(0, 12));
    let j = filesNameTmp.indexOf("imageProfile");
    if (j !== -1) {
      const bitmap = fs.readFileSync(
        __dirname + `/../images/${uuid}/` + filesName[j]
      );
      image64 = new Buffer.from(bitmap).toString("base64");
      return res.json({
        image: image64,
        imageFakeProfile: null,
      });
    } else {
      return res.json({
        image: null,
        imageFakeProfile:
          "https://image.flaticon.com/icons/png/512/1177/1177577.png",
      });
    }
  } else {
    pool.getConnection((err, connection) => {
      if (err) {
        error.handleError(res, err, "Internal error", 500, connection);
      } else {
        connection.query(
          "SELECT ImageProfile FROM User WHERE Uuid = ?",
          [uuid],
          (err, result) => {
            if (err) {
              error.handleError(res, err, "Internal error", 500, connection);
            } else if (result.length === 0 || result[0].ImageProfile === null) {
              connection.release();
              return res.json({
                image: null,
                imageFakeProfile:
                  "https://image.flaticon.com/icons/png/512/1177/1177577.png",
              });
            } else {
              connection.release();
              return res.json({
                image: null,
                imageFakeProfile: result[0].ImageProfile,
              });
            }
          }
        );
      }
    });
  }

  // }
};

exports.readProfile = async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(
        `SELECT user.*, genre.GenreId AS GenreId, sexual_orientation.SexualOrientationId AS SexualOrientationId FROM user LEFT JOIN genre ON user.GenreId = genre.GenreId  LEFT JOIN sexual_orientation ON user.SexualOrientationId = sexual_orientation.SexualOrientationId WHERE Uuid = ?;
         SELECT tag.Label AS TagLabel FROM user_tag INNER JOIN tag ON user_tag.TagId = tag.TagId WHERE UserId = (SELECT UserId FROM user WHERE Uuid = ?);
         SELECT tag.Label AS CommonTagsLabel FROM  tag`,
        [req.userUuid, req.userUuid],
        (err, result) => {
          if (err) {
            error.handleError(res, err, "Intenal error", 500, connection);
          } else {
            const myTags = result[1].map((e) => e.TagLabel);
            const commonTags = result[2].map((e) => e.CommonTagsLabel);
            const commonTagsTmp = commonTags.map((ct) => {
              if (myTags.findIndex((mt) => mt === ct) > -1)
                return { label: ct, checked: true };
              else return { label: ct, checked: false };
            });
            connection.release();
            return res.json({
              firstName: result[0][0].FirstName,
              lastName: result[0][0].LastName,
              pseudo: result[0][0].UserName,
              email: result[0][0].Email,
              userSize: result[0][0].UserSize,
              age: result[0][0].Age,
              gender: result[0][0].GenreId,
              sexualPreference: result[0][0].SexualOrientationId,
              description: result[0][0].Bio,
              commonTags: commonTagsTmp,
              myTags: [],
              lat: result[0][0].Lat,
              lng: result[0][0].Lng,
              localisationActive: result[0][0].LocalisationActive,
            });
          }
        }
      );
    }
  });
};

exports.readGuestProfile = async (req, res) => {
  let userId = req.userId;
  const uuid = req.body.guestUuid;
  const userUuid = req.userUuid;
  let lat = "";
  let lng = "";
  try {
    let result = await utils.getUserInfos(userUuid);
    lat = result[0].Lat;
    lng = result[0].Lng;
  } catch {
    error.handleError(res, err, "Intenal error", 500, connection);
  }
  pool.getConnection((err, connection) => {
    if (err) {
      error.handleError(res, err, "Internal error", 500, connection);
    } else {
      connection.query(
        `SELECT user.*, genre.GenreId AS GenreId, sexual_orientation.SexualOrientationId AS SexualOrientationId FROM user LEFT JOIN genre ON user.GenreId = genre.GenreId  LEFT JOIN sexual_orientation ON user.SexualOrientationId = sexual_orientation.SexualOrientationId WHERE Uuid = ?;
         SELECT tag.Label AS TagLabel FROM user_tag INNER JOIN tag ON user_tag.TagId = tag.TagId WHERE UserId = (SELECT UserId FROM user WHERE Uuid = ?);
         SELECT tag.Label AS CommonTagsLabel FROM  tag;
         SELECT LikeSender, LikeReceiver FROM user_like WHERE LikeSender = (SELECT UserId FROM user WHERE Uuid = ?) And LikeReceiver = (SELECT UserId FROM user WHERE Uuid = ?);
         SELECT LikeSender, LikeReceiver FROM user_like WHERE LikeSender = (SELECT UserId FROM user WHERE Uuid = ?) And LikeReceiver = (SELECT UserId FROM user WHERE Uuid = ?);
         SELECT ( 6371 * ACOS( COS(RADIANS(${lat})) * COS(RADIANS(Lat)) * COS(RADIANS(Lng) - RADIANS(${lng})) + SIN(RADIANS(${lat})) * SIN(RADIANS(Lat)))) AS DISTANCE FROM user WHERE Uuid = ?;
         SELECT UserBlockedSender, UserBlockedReceiver FROM user_blocked WHERE UserBlockedSender = (SELECT UserId FROM user WHERE Uuid = ?) And UserBlockedReceiver = (SELECT UserId FROM user WHERE Uuid = ?);
         SELECT UserReportSender, UserReportReceiver FROM user_report WHERE UserReportSender = (SELECT UserId FROM user WHERE Uuid = ?) And UserReportReceiver = (SELECT UserId FROM user WHERE Uuid = ?)`,
        [
          uuid,
          uuid,
          uuid,
          userUuid,
          userUuid,
          uuid,
          uuid,
          userUuid,
          uuid,
          userUuid,
          uuid,
        ],
        (err, result) => {
          if (err) {
            error.handleError(res, err, "Intenal error", 500, connection);
          } else if (result[0].length === 0) {
            error.handleError(res, err, "invalid uuid", 404, connection);
          } else {
            connection.query(
              "INSERT INTO user_visit (UserVisitor, UserVisited) VALUES (?, ?); UPDATE USER SET Score = Score + 1 WHERE UserId = ?; INSERT INTO notification (NotificationSender, NotificationReceiver, NotificationType) VALUES (?,?,?); UPDATE user SET NotificationNumber = NotificationNumber + 1 WHERE UserId = ? ", // We have to check limit score
              [
                userId,
                result[0][0].UserId,
                result[0][0].UserId,
                userId,
                result[0][0].UserId,
                1,
                result[0][0].UserId,
              ],
              (err, r) => {
                if (err)
                  error.handleError(res, err, "Intenal error", 500, connection);
                else {
                  console.log(result[5][0].DISTANCE);
                  connection.release();
                  const myTags = result[1].map((e) => e.TagLabel);
                  let dataUser = {
                    firstName: result[0][0].FirstName,
                    lastName: result[0][0].LastName,
                    pseudo: result[0][0].UserName,
                    email: result[0][0].Email,
                    userSize: result[0][0].UserSize,
                    age: result[0][0].Age,
                    gender: result[0][0].GenreId,
                    sexualPreference: result[0][0].SexualOrientationId,
                    description: result[0][0].Bio,
                    score: result[0][0].Score,
                    distance: Math.round(result[5][0].DISTANCE * 100) / 100,
                    myTags,
                  };
                  let dataLike = {
                    userReport: result[7].length > 0 ? true : false,
                    userBlocked: result[6].length > 0 ? 1 : 0,
                    logout: result[0][0].LastConnection,
                    like: result[4].length > 0 ? 1 : 0,
                    likeMe: result[3].length > 0 ? 1 : 0,
                  };
                  return res.json({
                    dataUser,
                    dataLike,
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

exports.userBlocked = (req, res) => {
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
        if (req.body.userBlocked) {
          connection.query(
            "INSERT INTO user_blocked (UserBlockedSender, UserBlockedReceiver) VALUES (?, ?)",
            [userId, userLikedId],
            (err, result) => {
              if (err) reject(500);
              else {
                connection.release();
                p = { msg: "user est bloque" };
              }
            }
          );
        } else {
          connection.query(
            "DELETE FROM user_blocked WHERE UserBlockedSender = ? AND UserBlockedReceiver = ?",
            [userId, userLikedId],
            (err, result) => {
              if (err) reject(500);
              else {
                connection.release();
                p = { msg: "user est debloque" };
              }
            }
          );
        }
        return res.json(p);
      } catch {
        error.handleError(res, err, "Internal error", 500, connection);
      }
    }
  });
};

exports.userReport = (req, res) => {
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
        if (req.body.userReport) {
          connection.query(
            "INSERT INTO user_report (UserReportSender, UserReportReceiver) VALUES (?, ?)",
            [userId, userLikedId],
            (err, result) => {
              if (err) {
                console.log(err);
                reject(500);
              } else {
                connection.release();
                p = { msg: "user est bloque" };
              }
            }
          );
        } else {
          connection.query(
            "DELETE FROM user_report WHERE UserReportSender = ? AND UserReportReceiver = ?",
            [userId, userLikedId],
            (err, result) => {
              if (err) reject(500);
              else {
                connection.release();
                p = { msg: "user est debloque" };
              }
            }
          );
        }
        return res.json(p);
      } catch {
        error.handleError(res, err, "Internal error", 500, connection);
      }
    }
  });
};

exports.changePage = (req, res) => {
  return res.json({ auth: true });
};
