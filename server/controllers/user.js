const formidable = require("formidable");
const fs = require("fs");
const pool = require("../db");
const error = require("./error");

exports.updateProfile = (req, res) => {
  console.log(req.body);
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

exports.uploadImage = (req, res) => {
  let form = new formidable.IncomingForm();
  // form.keepExtensions = true;
  // console.log(form);
  console.log(form);
  console.log("upoad image");

  //Check format de l image and size
  let userUuid = "";
  form.parse(req, (err, fields, files) => {
    console.log(files);
    userUuid = fields.userUuid;
  });

  //stock in uuid directory

  form.on("fileBegin", (name, file) => {
    console.log(file);
    file.path = __dirname + "/../images/" + file.name;
  });

  form.on("file", (name, file) => {
    console.log("Uploaded " + file.name);
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
      image: image64
    });
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
