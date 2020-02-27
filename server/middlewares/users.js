const formidable = require("formidable");
const fs = require("fs");
const pool = require("../db");
const error = require("../controllers/error");

exports.createUploadDirectory = (req, res, next) => {
  let form = new formidable.IncomingForm();
  let newName = "";

  form.parse(req, (err, fields, files) => {
    if (newName === null) {
      return res.status(500).json({
        err: "Internal error : key file is not valid"
      });
    }
    let keys = Object.keys(files);
    let maxsize = false;
    keys.forEach(key => {
      if (files[key].size > 1000000) maxsize = true;
    });
    if (maxsize) {
      return res.status(400).json({
        err: "Le poids de l'image doit d'être inférieur à 1mb"
      });
    } else {
      req.files = files;
      next();
    }
  });

  // const types = ["image/png", "image/jpeg", "image/gif"];
  // files.forEach((file, i) => {
  //   if (types.every(type => file.type !== type)) {
  //     return res.status(400).json({
  //       err: "Format de l'image non valide"
  //     });
  //   } else if (file.size > 150000) {
  //     return res
  //       .status(400)
  //       .json({ err: "veuillez choisir une photo plus petit" });
  //   }
  // });

  form.on("fileBegin", (name, file) => {
    if (!fs.existsSync(__dirname + "/../images")) {
      fs.mkdirSync(__dirname + "/../images");
    }
    if (!fs.existsSync(__dirname + `/../images/${req.userUuid}`)) {
      fs.mkdirSync(__dirname + `/../images/${req.userUuid}`);
    }
    // randomName = uuidv4();
    format = file.type.split("/");
    if (format.length !== 2) {
      return res.status(400).json({
        err: "Format de l'image non valide"
      });
    }
    switch (name) {
      case "photo":
        newName = "imageProfile";
        break;
      case "photo0":
        newName = "image1";
        break;
      case "photo1":
        newName = "image2";
        break;
      case "photo2":
        newName = "image3";
        break;
      case "photo3":
        newName = "image4";
        break;
      default:
        newName = null;
    }
    file.name = newName + "." + file.type.split("/")[1];
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
