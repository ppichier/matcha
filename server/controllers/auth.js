const pool = require("../db");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../utility/mail");
const template = require("../utility/template/mail");
const uuidv4 = require("uuid/v4");

const handleError = (res, err, displayErr, code, connection) => {
  connection.release();
  console.log(err);
  return res.status(code).json({
    err: displayErr
  });
};

const generateJwt = userUuid => {
  return jwt.sign({ _id: userUuid }, process.env.JWT_SECRET, {
    expiresIn: 86400 // expires in 24 hours
  });
};

exports.signup = (req, res) => {
  const { email, pseudo, password, firstName, lastName } = req.body;
  let uuid = "";

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal Error"
      });
    }
    connection.query(
      "SELECT * FROM User WHERE Email = ?; SELECT * FROM User WHERE Username = ?",
      [[email], [pseudo]],
      (err, result) => {
        const userUuid = uuidv4();
        if (err) {
          handleError(res, err, "Internal error", 500, connection);
        } else if (result[0].length > 0) {
          handleError(
            res,
            err,
            "Cet email a déjà un compte associé.",
            409,
            connection
          );
        } else if (result[1].length > 0) {
          handleError(
            res,
            err,
            "Ce pseudo n'est pas disponible.",
            409,
            connection
          );
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              handleError(res, err, "Internal error", 500, connection);
            } else {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                  handleError(res, err, "Internal error", 500, connection);
                } else {
                  connection.query(
                    "INSERT INTO User (Uuid, Email, Password, UserName, FirstName, LastName, EmailValidate) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [userUuid, email, hash, pseudo, firstName, lastName, 0],
                    (err, result) => {
                      if (err) {
                        handleError(
                          res,
                          err,
                          "Internal error",
                          500,
                          connection
                        );
                      } else {
                        console.log("1 record inserted");
                        //connection release
                        connection.query(
                          "SELECT UserId FROM User WHERE UserName = ?",
                          [pseudo],
                          (err, result) => {
                            if (err) {
                              handleError(
                                res,
                                err,
                                "Internal error",
                                500,
                                connection
                              );
                            } else {
                              uuid = uuidv4();
                              const mailOptions = {
                                from: process.env.NODEMAILER_USER,
                                to: email, //email
                                subject: template.templateMailSignUpHeader,
                                html: template.templateMailSignUpBody(
                                  pseudo,
                                  "http://localhost:3000/verifyAccount/?uuid=" +
                                    uuid
                                ),
                                attachments: [
                                  {
                                    filename: "Logo.png",
                                    path: path.join(
                                      __dirname,
                                      "../utility/template/matchaMail.png"
                                    ),
                                    cid: "logo"
                                  }
                                ]
                              };
                              connection.query(
                                "INSERT INTO Validate_email (UserId, Uuid) VALUES (?, ?)",
                                [result[0].UserId, uuid],
                                (err, result) => {
                                  if (err) {
                                    handleError(
                                      res,
                                      err,
                                      "Internal error",
                                      500,
                                      connection
                                    );
                                  } else {
                                    transporter.sendMail(
                                      mailOptions,
                                      (error, info) => {
                                        if (error) {
                                          connection.query(
                                            "DELETE FROM User WHERE UserName = ?",
                                            [pseudo],
                                            (err, result) => {
                                              if (err) {
                                                handleError(
                                                  res,
                                                  err,
                                                  "Internal error",
                                                  500,
                                                  connection
                                                );
                                              } else {
                                                handleError(
                                                  res,
                                                  err,
                                                  "Erreur. Veuillez réesayer",
                                                  500,
                                                  connection
                                                );
                                              }
                                            }
                                          );
                                        } else {
                                          connection.release();
                                          return res.json({
                                            msg: `Un email de confirmation avec un lien a été envoyé à ${email}. Veuillez cliquer sur ce lien afin de valider votre compte`
                                          });
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              });
            }
          });
        }
      }
    );
  });
};

exports.signin = async (req, res) => {
  const { pseudo, password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal error - Db down"
      });
    } else {
      connection.query(
        "SELECT UserName, Password, EmailValidate, Uuid FROM User WHERE UserName = ?",
        [pseudo],
        async (err, result) => {
          if (err) {
            handleError(res, err, "Internal error", 500, connection);
          } else if (!result[0]) {
            //Check if pseudo exists.
            handleError(
              res,
              err,
              "Ce pseudo ne correspond à aucun compte. Veuillez créer un compte",
              400,
              connection
            );
          } else if (result.length === 1) {
            try {
              const match = await bcrypt.compare(
                password,
                result[0].Password.toString()
              );
              if (match) {
                if (result[0].EmailValidate == 0) {
                  handleError(
                    res,
                    err,
                    "Votre compte n'a pas été activé. Veuillez cliquer sur le lien présent dans l'email d'inscription",
                    400,
                    connection
                  );
                } else {
                  const token = generateJwt(result[0].Uuid);
                  connection.release();
                  return res.json({
                    token: token,
                    user: {
                      _id: result[0].Uuid
                    },
                    msg: "Authentification réussie"
                  });
                }
              } else {
                connection.release();
                return res.status(401).json({
                  token: null,
                  err: "Le mot de passe entré est incorrect."
                });
              }
            } catch (err) {
              handleError(res, err, "Internal error", 500, connection);
            }
          } else {
            // duplicate data
            handleError(res, err, "Internal error", 500, connection);
          }
        }
      );
    }
  });
};

exports.verifyAccount = (req, res) => {
  const { uuid } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal error - Db down"
      });
    } else {
      connection.query(
        "SELECT * FROM User INNER JOIN Validate_email ON User.UserId = Validate_email.UserId WHERE Validate_email.Uuid = ?",
        [uuid],
        (err, result) => {
          if (err) {
            handleError(res, err, "Internal error", 500, connection);
          } else if (result.length != 0) {
            //uuid found
            connection.query(
              "UPDATE User SET EmailValidate = 1 WHERE UserId = ? ; DELETE FROM Validate_email WHERE UserId = ?",
              [[result[0].UserId], [result[0].UserId]],
              (err, result) => {
                if (err) {
                  handleError(res, err, "Internal error", 500, connection);
                } else {
                  connection.release();
                  return res.json({ auth: true });
                }
              }
            );
          } else {
            //no uuid found
            connection.release();
            return res.status(401).json({
              err: "Not authorized"
            });
          }
        }
      );
    }
  });
};
exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal error - Db down"
      });
    } else {
      connection.query(
        "SELECT * FROM User WHERE  Email = ?",
        [email],
        (err, result) => {
          if (err) {
            handleError(res, err, "Internal error", 500, connection);
          } else if (result.length === 0) {
            handleError(
              res,
              err,
              "L'email indiqué n'existe pas",
              400,
              connection
            );
          } else {
            const UserId = result[0].UserId;
            uuid = uuidv4();
            const mailOptions = {
              from: process.env.NODEMAILER_USER,
              to: email, //email
              subject: template.templateMailForgotPasswordHeader,
              html: template.templateMailForgotPasswordgBody(
                result[0].UserName,
                "http://localhost:3000/recoverPassword/?uuid=" + uuid
              ),
              attachments: [
                {
                  filename: "Logo.png",
                  path: path.join(
                    __dirname,
                    "../utility/template/matchaMail.png"
                  ),
                  cid: "logo"
                }
              ]
            };
            transporter.sendMail(mailOptions);
            connection.query(
              "SELECT * FROM `recover_password` WHERE UserId = ?",
              [UserId],
              (err, result) => {
                if (err) {
                  handleError(res, err, "Internal error", 500, connection);
                } else if (result.length > 0) {
                  connection.query(
                    "UPDATE `recover_password` SET Uuid = ? WHERE UserId = ?",
                    [uuid, UserId],
                    (err, result) => {
                      if (err) {
                        handleError(
                          res,
                          err,
                          "Internal error",
                          500,
                          connection
                        );
                      } else {
                        res.json({
                          msg: `Un email a été envoyé à ${email} afin de réinitialiser votre mot de passe`
                        });
                        connection.release();
                      }
                    }
                  );
                } else {
                  connection.query(
                    "INSERT INTO `recover_password` (UserId, Uuid) VALUES (?, ?)",
                    [UserId, uuid],
                    (err, result) => {
                      if (err) {
                        handleError(
                          res,
                          err,
                          "Internal error",
                          500,
                          connection
                        );
                      } else {
                        res.json({
                          msg: `Un email a été envoyé à ${email} afin de réinitialiser votre mot de passe`
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
};

exports.recoverPassword = (req, res) => {
  const { email, password, uuid } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal error - Db down"
      });
    } else {
      connection.query(
        "SELECT * FROM User INNER JOIN recover_password ON User.UserId = recover_password.UserId WHERE recover_password.Uuid = ? AND User.Email = ?",
        [uuid, email],
        (err, result) => {
          if (err) {
            handleError(res, err, "Internal error", 500, connection);
          } else if (result.length === 0) {
            handleError(res, err, "Opération non autorisée", 400, connection);
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              if (err) {
                handleError(res, err, "Internal error", 500, connection);
              } else {
                bcrypt.hash(password, salt, (err, hash) => {
                  if (err) {
                    handleError(res, err, "Internal error", 500, connection);
                  } else {
                    connection.query(
                      "UPDATE `User` SET `Password`=? WHERE `UserId`= ? AND`Email`= ?",
                      [hash, [result[0].UserId], email],
                      (err, result) => {
                        if (err) {
                          handleError(
                            res,
                            err,
                            "Internal error",
                            500,
                            connection
                          );
                        } else {
                          connection.query(
                            "DELETE FROM `recover_password` WHERE `Uuid` = ?",
                            [uuid],
                            (err, result) => {
                              if (err) {
                                handleError(
                                  res,
                                  err,
                                  "Internal error",
                                  500,
                                  connection
                                );
                              } else {
                                connection.release();
                                return res.json({
                                  msg: "Votre mot de passe a bien été modifié"
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                });
              }
            });
          }
        }
      );
    }
  });
};
