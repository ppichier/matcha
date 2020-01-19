const pool = require("../db");
const path = require("path");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const transporter = require("../utility/mail");
const template = require("../utility/template/mail");

const handleError = (res, err, displayErr, code, connection) => {
  connection.release();
  console.log(err);
  return res.status(code).json({
    err: displayErr
  });
};

const generateJwt = () => {
  return jwt.sign({ id: "id of user" }, process.env.JWT_SECRET, {
    expiresIn: 86400 // expires in 24 hours
  });
};

exports.signup = (req, res) => {
  const { email, pseudo, password, firstName, lastName } = req.body;

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: "pierantonio.pichierri@gmail.com", //email
    subject: template.templateMailSignUpHeader,
    html: template.templateMailSignUpBody(pseudo, "http://localhost/uuid"),
    attachments: [
      {
        filename: "Logo.png",
        path: path.join(__dirname, "../utility/template/matchaMail.png"),
        cid: "logo"
      }
    ]
  };

  pool.getConnection((err, connection) => {
    if (err) {
      handleError(res, err, "Internal error", 500, connection);
    }
    connection.query(
      "SELECT * FROM User WHERE Email = ?; SELECT * FROM User WHERE Username = ?",
      [[email], [pseudo]],
      (err, result) => {
        if (err) {
          handleError(res, err, "Internal error", 500, connection);
        } else if (result[0].length > 0) {
          handleError(res, err, "This email is already used", 409, connection);
        } else if (result[1].length > 0) {
          handleError(
            res,
            err,
            "This pseudo is not available",
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
                    "INSERT INTO User (Email, Password, UserName, FirstName, LastName, EmailValidate) VALUES (?, ?, ?, ?, ?, ?)",
                    [email, hash, pseudo, firstName, lastName, 0],
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
                        transporter.sendMail(mailOptions, (error, info) => {
                          if (error) {
                            connection.query(
                              "DELETE FROM User WHERE UserName = ?",
                              [pseudo],
                              (err,
                              result => {
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
                              })
                            );
                          } else {
                            connection.release();
                            return res.json({
                              msg: `Un email de confirmation avec un lien été envoyé à ${email}. Veuillez cliquer sur ce lien afin de valider votre compte`
                            });
                          }
                        });
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

  //verif que user exist sinon
  //error: "User with that pseudo does not exist. Please signup" 400

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal error - Db down"
      });
    } else {
      connection.query(
        "SELECT UserName, Password FROM User WHERE UserName = ?",
        [pseudo],
        async (err, result) => {
          if (err) {
            handleError(res, err, "Internal error", 500, connection);
          } else if (!result[0]) {
            //Check if pseudo exists.
            handleError(
              res,
              err,
              "User with that pseudo does not exist. Please signup",
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
                const token = generateJwt();
                connection.release();
                return res.json({
                  auth: true,
                  token: token,
                  msg: "Login success"
                });
              } else {
                connection.release();
                return res.status(401).json({
                  auth: false,
                  token: null,
                  err: "Pseudo and password don't match"
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

  //si exist mais password not match
  // res.status(401).json({ error: "Email and password don't match" });
};
