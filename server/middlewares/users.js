const formidable = require("formidable");
const fs = require("fs");
const uuidv4 = require("uuid/v4");
const pool = require("../db");
const error = require("../controllers/error");

exports.createUploadDirectory = (req, res, next) => {
  let form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    req.files = files;
    next();
  });

  form.on("fileBegin", (name, file) => {
    if (!fs.existsSync(__dirname + "/../images")) {
      fs.mkdirSync(__dirname + "/../images");
    }
    if (!fs.existsSync(__dirname + `/../images/${req.userUuid}`)) {
      fs.mkdirSync(__dirname + `/../images/${req.userUuid}`);
    }
    randomName = uuidv4();
    format = file.type.split("/");
    if (format.length !== 2) {
      return res.status(400).json({
        err: "Format de l'image non valide"
      });
    }
    file.name = randomName + "." + file.type.split("/")[1];

    file.path = __dirname + `/../images/${req.userUuid}/` + file.name;
  });
};

exports.deletePreviousImage = (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal Error HERE"
      });
    }
    connection.query(
      "SELECT `ImageProfile` FROM User WHERE Uuid= ?",
      [req.userUuid],
      (err, result) => {
        if (err) {
          error.handleError(res, err, "Intenal error", 500, connection);
        } else {
          if (result[0].ImageProfile !== null) {
            fs.unlink(result[0].ImageProfile, err => {
              if (err) {
                error.handleError(res, err, "Internal error", 500, connection);
              }
            });
          }
          connection.release();
          next();
        }
      }
    );
  });
};
