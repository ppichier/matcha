const fs = require("fs");
const error = require("./error");
const pool = require("../db");

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
  let userUuid = req.userUuid;
  let file = req.files.photo;

  //Check format de l image and size

  var bitmap = fs.readFileSync(
    __dirname + `/../images/${userUuid}/` + file.name
  );
  image64 = new Buffer.from(bitmap).toString("base64");
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

  return res.json({
    image: image64,
    msg: "Profile image upload"
  });
};

exports.uploadSecondaryImages = (req, res) => {
  let image64 = [];
  let files = req.files;
  let userUuid = req.userUuid;

  const len = Object.keys(files).length;

  if (len >= 5) {
    return res.status(400).json({
      err: "Vous pouvez upload 5 photos maximum"
    });
  }
  for (let i = 0; i < len; i++) {
    const key = "photo" + i;
    const bitmap = fs.readFileSync(
      __dirname + `/../images/${userUuid}/` + files[key].name
    );
    image64.push(new Buffer.from(bitmap).toString("base64"));

    let columnImage = "Image" + (i + 1);

    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({
          err: "Internal Error"
        });
      }
      connection.query(
        `UPDATE User SET ${columnImage} = ? WHERE Uuid= ?`,
        [files[key].path, req.userUuid],
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
  return res.json({
    images: image64,
    msg: "Images uploaded"
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
  let deleteImage = "Image" + (imageIdRemove + 1);
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
          const image = result[0][deleteImage];
          connection.query(
            `UPDATE User SET ${deleteImage} = ? WHERE Uuid = ?`,
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

exports.readSecondaryImages = (req, res) => {
  let image64 = [];
  let a = ["image1", "image2", "image3", "image4"];

  if (fs.existsSync(__dirname + `/../images/${req.userUuid}/`)) {
    filesName = fs.readdirSync(__dirname + `/../images/${req.userUuid}/`);
    filesNameTmp = filesName.map(e => e.substring(0, 6));
    for (let i = 0; i < 4; i++) {
      let j = filesNameTmp.indexOf(a[i]);
      if (j !== -1) {
        const bitmap = fs.readFileSync(
          __dirname + `/../images/${req.userUuid}/` + filesName[j]
        );
        image64.push(new Buffer.from(bitmap).toString("base64"));
      } else {
        image64.push("");
      }
    }
  }

  return res.json({
    image: image64,
    msg: "Read image success"
  });
};
exports.readImage = (req, res) => {
  let image64 = "";
  if (fs.existsSync(__dirname + `/../images/${req.userUuid}/`)) {
    filesName = fs.readdirSync(__dirname + `/../images/${req.userUuid}/`);
    filesNameTmp = filesName.map(e => e.substring(0, 12));
    let j = filesNameTmp.indexOf("imageProfile");
    if (j !== -1) {
      const bitmap = fs.readFileSync(
        __dirname + `/../images/${req.userUuid}/` + filesName
      );
      image64 = new Buffer.from(bitmap).toString("base64");
    } else {
      image64 = null;
    }
  }
  return res.json({
    image: image64
  });
};

exports.changePage = (req, res) => {
  return res.json({ auth: true });
};
