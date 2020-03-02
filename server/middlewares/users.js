const formidable = require("formidable");
const fs = require("fs");
const pool = require("../db");
const error = require("../controllers/error");
const _ = require("lodash");

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
        err: "Internal Error"
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

const updateUserTags = (req, res, next, connection, myTags) => {
  connection.query(
    "SELECT userId FROM User WHERE Uuid = ?",
    [req.userUuid],
    (err, result) => {
      if (err) error.handleError(res, err, "Internal error", 500, connection);
      else {
        console.log("YOOOO");
        const id = result[0].userId;
        console.log(id);
        connection.query(
          "SELECT * FROM Tag; SELECT * FROM User_tag WHERE userId = ?",
          [id],
          (err, result) => {
            if (err)
              error.handleError(res, err, "Internal error", 500, connection);
            else {
              console.log(result);
              console.log(myTags);
              let a = result[0]
                .filter(e => result[0].indexOf(e.Label) !== -1)
                .map(e => e.TagId);

              // myTags.map(tag => {
              //   return result[0].forEach(e => {
              //     console.log(tag);
              //     console.log(e.Label);
              //     console.log(e.TagId);
              //     if (tag === e.Label) {
              //       console.log("TROUVVEEE");
              //       return e.TagId;
              //     } else return;
              //   });
              // });
              console.log("END");
              console.log(a);
              connection.release();
              next();
            }
          }
        );
      }
    }
  );
};

exports.updateTags = (req, res, next) => {
  let myTags = req.body.myTags;
  if (myTags === "undefined") {
    return res.status(500).json({
      err: "Tags error server"
    });
  }

  if (myTags.length > 20) {
    return res.status(400).json({
      err: "La limite du nombre de tags est de 20."
    });
  }

  if (myTags.filter(tag => tag.length > 12).length > 0) {
    return res.status(400).json({
      err: "La longueur max d'un tag est de 12 caractères."
    });
  }

  let tagsTmp = _.uniq(
    myTags.map((tag, i) => {
      return tag
        .trim()
        .replace(/ +/g, " ")
        .toLowerCase();
    })
  );

  console.log(tagsTmp);

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal Error"
      });
    }

    // UPDATE COMMON TAGS
    connection.query(
      "SELECT `Label` FROM Tag",
      [req.userUuid],
      (err, result) => {
        if (err) {
          error.handleError(res, err, "Internal error", 500, connection);
        } else {
          commonTags = result.map(tag => {
            return tag.Label;
          });
          console.log(commonTags);
          const differenceTags = _.difference(tagsTmp, commonTags);
          console.log(differenceTags);

          if (differenceTags.length > 0) {
            //Add differenceTags into Tag table
            let queryValues = "";
            let queryParams = [];
            differenceTags.forEach((e, i, differenceTags) => {
              queryValues += "(?)";
              queryParams.push(e);
              if (i !== differenceTags.length - 1) {
                queryValues += ",";
              }
            });
            console.log("+++++++++++++");
            console.log(queryValues);
            console.log(queryParams);
            console.log("+++++++++++++");
            connection.query(
              "INSERT INTO Tag (`Label`) VALUES " + queryValues,
              queryParams,
              (err, result) => {
                if (err)
                  error.handleError(
                    res,
                    err,
                    "Internal error",
                    500,
                    connection
                  );
                else {
                  updateUserTags(req, res, next, connection, tagsTmp);
                  // connection.release();
                  // next();
                }
              }
            );
          } else {
            updateUserTags(req, res, next, connection, tagsTmp);
            // connection.release();
            // next();
          }
        }
      }
    );
  });
};
