const con = require("../db");
const path = require("path");
const bcrypt = require("bcrypt");
const transporter = require("../utility/mail");
const template = require("../utility/template/mail");

const handleError = (res, err, displayErr, code) => {
  console.log(err);
  return res.status(code).json({
    err: displayErr
  });
};

exports.signup = (req, res) => {
  console.log("req.body", req.body);

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: "pierantonio.pichierri@gmail.com", //req.body.email
    subject: template.templateMailSignUpHeader,
    html: template.templateMailSignUpBody(
      req.body.pseudo,
      "http://localhost/uuid"
    ),
    attachments: [
      {
        filename: "Logo.png",
        path: path.join(__dirname, "../utility/template/matchaMail.png"),
        cid: "logo"
      }
    ]
  };

  //encrypt password

  /* bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body, salt, function(err, hash) {
      // Store hash in your password DB.

    });
  }); */

  con.query(
    "SELECT * FROM User WHERE Email = ?; SELECT * FROM User WHERE Username = ?",
    [[req.body.email], [req.body.pseudo]],
    (err, result) => {
      if (err) {
        handleError(res, err, "Internal error", 500);
      } else if (result[0].length > 0) {
        handleError(res, err, "This email is already used", 409);
      } else if (result[1].length > 0) {
        handleError(res, err, "This pseudo is not available", 409);
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            handleError(res, err, "Internal error", 500);
          } else {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) {
                handleError(res, err, "Internal error", 500);
              } else {
                con.query(
                  "INSERT INTO User (Email, Password, UserName, FirstName, LastName, EmailValidate) VALUES (?, ?, ?, ?, ?, ?)",
                  [
                    req.body.email,
                    hash,
                    req.body.pseudo,
                    req.body.firstName,
                    req.body.lastName,
                    0
                  ],
                  (err, result) => {
                    if (err) {
                      handleError(res, err, "Internal error", 500);
                    } else {
                      console.log("1 record inserted");
                      transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                          con.query(
                            "DELETE FROM User WHERE UserName = ?",
                            [req.body.pseudo],
                            (err,
                            result => {
                              if (err) {
                                handleError(res, err, "Internal error", 500);
                              } else {
                                handleError(
                                  res,
                                  err,
                                  "Erreur. Veuillez réesayer",
                                  500
                                );
                              }
                            })
                          );
                        } else {
                          return res.json({
                            msg: `Un email de confirmation avec un lien été envoyé à ${req.body.email}. Veuillez cliquer sur ce lien afin de valider votre compte`
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
};
