const con = require("../db");

exports.signup = (req, res) => {
  console.log("req.body", req.body);

  //   console.log("req.body", req.body);
  /* const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }

    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  }); */

  // variables length if  error res.json(400) with err: ""

  const sql =
    "INSERT INTO User (Mail, Password, UserName, FirstName, LastName) VALUES (?, ?, ?, ?, ?)";
  con.query(
    sql,
    [
      req.body.email,
      req.body.password,
      req.body.pseudo,
      req.body.firstName,
      req.body.lastName
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({
          err: "Internal error"
        });
        // throw err;
      } else {
        res.json({
          msg: `Un email de confirmation avec un lien été envoyé à ${req.body.email}. Veuillez cliquer sur ce lien afin de continuer`
        });
        console.log("1 record inserted");
      }
      //send mail if no err
    }
  );
};
