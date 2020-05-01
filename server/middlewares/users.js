const formidable = require("formidable");
const fs = require("fs");
const pool = require("../db");
const error = require("../controllers/error");
const _ = require("lodash");

exports.checkDatabaseStatus = (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal Error"
      });
    } else {
      connection.release();
      next();
    }
  });
};

exports.createUploadDirectory = (req, res, next) => {
  let form = new formidable.IncomingForm();
  const types = ["png", "jpeg", "gif"];
  let newName = "";
  let err = "";

  form.parse(req, (err, fields, files) => {
    if (newName === null) {
      return res.status(500).json({
        err: "Internal error : key file is not valid"
      });
    }
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
        format = file.type.split("/");
    if(types.indexOf(format[1]) !== -1)
      {   
  
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
      }
      // else{
      //   return res.status(400).json({
      //       err: "Format de l'image non valide"
      //     });
      // }
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
        const id = result[0].userId;
        connection.query(
          "SELECT * FROM Tag; DELETE FROM User_tag WHERE userId = ?",
          [id],
          (err, result) => {
            if (err)
              error.handleError(res, err, "Internal error", 500, connection);
            else {
              for (let i = 0; i < myTags.length; i++) {
                let idx = result[0].findIndex(e => e.Label === myTags[i]);
                let a = result[0][idx].TagId;
                connection.query(
                  "INSERT INTO User_tag (userId, tagId) VALUES (?, ?)",
                  [id, a],
                  (err, result) => {
                    if (err)
                      error.handleError(
                        res,
                        err,
                        "Internal error",
                        500,
                        connection
                      );
                  }
                );
              }
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
          const differenceTags = _.difference(tagsTmp, commonTags);

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
                }
              }
            );
          } else {
            updateUserTags(req, res, next, connection, tagsTmp);
          }
        }
      }
    );
  });
};
