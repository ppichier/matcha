const con = require("../db");
const path = require("path");
const transporter = require("../utility/mail");
const template = require("../utility/template/mail");

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

  con.query(
    "SELECT * FROM User WHERE Username = ?; SELECT * FROM User WHERE Email = ?",
    [[req.body.pseudo], [req.body.email]],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          err: "Internal error"
        });
      } else if (result[0].length > 0) {
        return res.status(409).json({
          err: "This pseudo is not available"
        });
      } else if (result[1].length > 0) {
        return res.status(409).json({
          err: "This email is already used"
        });
      } else {
        con.query(
          "INSERT INTO User (Email, Password, UserName, FirstName, LastName, EmailValidate) VALUES (?, ?, ?, ?, ?, ?)",
          [
            req.body.email,
            req.body.password,
            req.body.pseudo,
            req.body.firstName,
            req.body.lastName,
            0
          ],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                err: "Internal error"
              });
            } else {
              console.log("1 record inserted");
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  return res.status(500).json({
                    err:
                      "Erreur lors de l'envoi du mail de confirmation. Veuillez réesayer."
                  });
                  //delete Row in db if user don't receiver the message
                  con.query("");
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
    }
  );
};
