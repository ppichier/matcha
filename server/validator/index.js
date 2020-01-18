function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

exports.userSignupValidator = (req, res, next) => {
  // check if variable is undefined
  if (
    typeof req.body.email === "undefined" ||
    typeof req.body.pseudo === "undefined" ||
    typeof req.body.firstName === "undefined" ||
    typeof req.body.lastName === "undefined" ||
    typeof req.body.password === "undefined"
  ) {
    return res.status(400).json({
      err: "All fields are required"
    });
  }

  //check if variable is null
  if (
    req.body.email === null ||
    req.body.pseudo === null ||
    req.body.firstName === null ||
    req.body.lastName === null ||
    req.body.password === null
  ) {
    return res.status(400).json({
      err: "Value cannot be null"
    });
  }

  // check if email is valid
  const rgxEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!rgxEmail.test(String(req.body.email).toLowerCase())) {
    return res.status(400).json({
      err: "Email is not valid"
    });
  }

  // check if password is valid
  const regexPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[&#($_);.+!-])[0-9a-zA-Z&#($_);.+!-]{6,}$/;
  if (!regexPwd.test(String(req.body.password))) {
    return res.status(400).json({
      err: "Password is not valid"
    });
  }

  //check if pseudo is valid (letter , number, certains special chars)

  const regexPseudo = /^[0-9a-zA-Z&#($_);.+!-]{1,}$/;
  if (!regexPseudo.test(String(req.body.pseudo))) {
    return res.status(400).json({
      err: "Pseudo is not valid"
    });
  }

  // check length of variable
  req.body.firstName = escapeHtml(req.body.firstName);
  req.body.lastName = escapeHtml(req.body.lastName);

  if (
    req.body.email.length > 255 ||
    req.body.pseudo.length > 40 ||
    req.body.password.length > 30 ||
    req.body.firstName.length > 255 ||
    req.body.firstName.length === 0 ||
    req.body.lastName.length > 255 ||
    req.body.lastName.length === 0
  ) {
    return res.status(400).json({
      err: "Error value Min-Max length"
    });
  }

  next();
};
