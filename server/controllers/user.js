const formidable = require("formidable");
const fs = require("fs");
const pool = require("../db");
const error = require("./error");
const fsExtra = require("fs-extra");

exports.updateProfile = (req, res) => {
  const {
    myTags,
    email,
    pseudo,
    firstName,
    lastName,
    age,
    gender,
    sexualPreference,
    description,
    userSize,
    width,
    userUuid
  } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal Error HERE"
      });
    }
    connection.query(
      "UPDATE `user` SET `Email`= ?, `UserName`= ?,`FirstName` = ?,`LastName` = ?, `SexualOrientationId` = ? , `GenreId` = ?,`Age` = ?, `userSize` = ?,`Bio` = ? WHERE `Uuid` = ?",
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
        userUuid
      ],
      (err, result) => {
        if (err) {
          error.handleError(res, err, "Internal error", 500, connection);
        } else {
          connection.release();
          return res.json({ msg: "Profil mis à jour" });
        }
      }
    );
  });
};

exports.uploadProfileImage = (req, res) => {
  let form = new formidable.IncomingForm();

  //Check format de l image and size
  let userUuid = "";
  form.parse(req, (err, fields, files) => {
    userUuid = fields.userUuid;
  });

  form.on("fileBegin", (name, file) => {
    file.path = __dirname + "/../images/" + file.name;
  });

  form.on("file", (name, file) => {
    var bitmap = fs.readFileSync(__dirname + "/../images/" + file.name);
    image64 = new Buffer(bitmap).toString("base64");
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({
          err: "Internal Error HERE"
        });
      }
      connection.query(
        "UPDATE `user` SET `ImageProfile`= ? WHERE Uuid= ?",
        [file.path, userUuid],
        (err, result) => {
          if (err) {
            error.handleError(res, err, "Intenal error", 500, connection);
          } else {
            connection.release();
          }
        }
      );
    });

    // TEST TO DO - UPLAOD EXISTING IMAGE
    return res.json({
      image: image64,
      msg: "Profile image upload"
    });
  });
};

exports.uploadSecondaryImages = (req, res) => {
  let form = new formidable.IncomingForm();

  let userUuid = "";
  let image64 = [];

  if (!fs.existsSync(__dirname + "/../images/")) {
    fs.mkdirSync(__dirname + "/../images/");
  }

  //Check format de l image and size

  form.on("fileBegin", (name, file) => {
    file.path = __dirname + "/../images/" + file.name;
  });

  form.parse(req, (err, fields, files) => {
    userUuid = fields.userUuid;
    const len = Object.keys(files).length;

    if (len >= 5) {
      return res.status(400).json({
        err: "Vous pouvez upload 5 photos maximum"
      });
    }
    for (let i = 0; i < len; i++) {
      const key = "photo" + i;
      const bitmap = fs.readFileSync(
        __dirname + "/../images/" + files[key].name
      );
      image64.push(new Buffer(bitmap).toString("base64"));

      let columnImage = "Image" + (i + 1);

      pool.getConnection((err, connection) => {
        if (err) {
          return res.status(500).json({
            err: "Internal Error"
          });
        }
        connection.query(
          `UPDATE User SET ${columnImage} = ? WHERE Uuid= ?`,
          [files[key].path, userUuid],
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
    // TEST TO DO - UPLAOD EXISTING IMAGE
    return res.json({
      images: image64,
      msg: "Images uploaded"
    });
  });
};

exports.deleteProfileImage = (req, res) => {
  const { userUuid } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      if (err) {
        error.handleError(res, err, "Internal error", 500, connection);
      }
    }
    connection.query(
      `SELECT * FROM User WHERE Uuid = ?`,
      [userUuid],
      (err, result) => {
        if (err) {
          error.handleError(res, err, "Intenal error", 500, connection);
        } else {
          console.log(result[0].UserId);
          const image = result[0].ImageProfile;
          connection.query(
            `UPDATE User SET ImageProfile = ? WHERE Uuid = ?`,
            [null, userUuid],
            (err, result) => {
              if (err) {
                error.handleError(res, err, "Intenal error", 500, connection);
              } else {
                fs.unlink(image, err => {
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
                      msg: "image delete"
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
  const { userUuid, imageIdRemove } = req.body;
  let deleteimage = "Image" + (imageIdRemove + 1);
  pool.getConnection((err, connection) => {
    if (err) {
      if (err) {
        error.handleError(res, err, "Internal error", 500, connection);
      }
    }
    connection.query(
      `SELECT * FROM User WHERE Uuid = ?`,
      [userUuid],
      (err, result) => {
        if (err) {
          error.handleError(res, err, "Intenal error", 500, connection);
        } else {
          console.log(result[0].UserId);
          const image = result[0][deleteimage];
          connection.query(
            `UPDATE User SET ${deleteimage} = ? WHERE Uuid = ?`,
            [null, userUuid],
            (err, result) => {
              if (err) {
                error.handleError(res, err, "Intenal error", 500, connection);
              } else {
                fs.unlink(image, err => {
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
                      msg: "image delete"
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

exports.readImage = (req, res) => {
  var bitmap = fs.readFileSync(__dirname + "/../images/smoke.png");
  image64 = new Buffer(bitmap).toString("base64");

  return res.json({
    image: image64
  });
};

exports.changePage = (req, res) => {
  return res.json({ auth: true });
};
