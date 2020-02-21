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
      err: "Tous les champs sont requis"
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
      err: "Un champ ne peut être vide"
    });
  }

  // check if email is valid
  const rgxEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!rgxEmail.test(String(req.body.email).toLowerCase())) {
    return res.status(400).json({
      err: "L'email n'est pas valide"
    });
  }

  // check if password is valid
  const regexPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[&#($_);.+!-])[0-9a-zA-Z&#($_);.+!-]{6,}$/;
  if (!regexPwd.test(String(req.body.password))) {
    return res.status(400).json({
      err:
        "Le mot de passe doit contenir plus de 5 caractères, avoir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial ( &#($_);.+!- )"
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

exports.userSigninValidator = (req, res, next) => {
  if (
    typeof req.body.pseudo === "undefined" ||
    typeof req.body.password === "undefined" ||
    req.body.pseudo === null ||
    req.body.password === null ||
    req.body.pseudo.trim().length === 0 ||
    req.body.password.trim().length === 0
  ) {
    return res.status(400).json({
      err: "All fields are required"
    });
  }

  next();
};

// TODO middleware check email --> forgot password

// TODO middleware check email and pasword --> recoverPassword
exports.forgotPasswordValidator = (req, res, next) => {
  if (
    typeof req.body.email === "undefined" ||
    req.body.email === null ||
    req.body.email.trim().length === 0
  ) {
    return res.status(400).json({
      err: "All fields are required"
    });
  }
  const rgxEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!rgxEmail.test(String(req.body.email).toLowerCase())) {
    return res.status(400).json({
      err: "L'email n'est pas valide"
    });
  }
  next();
};
exports.recoverPasswordValidator = (req, res, next) => {
  if (
    typeof req.body.email === "undefined" ||
    typeof req.body.password === "undefined" ||
    req.body.email === null ||
    req.body.password === null ||
    req.body.email.trim().length === 0 ||
    req.body.password.trim().length === 0 ||
    req.body.password.length > 30
  ) {
    return res.status(400).json({
      err: "All fields are required"
    });
  }

  const rgxEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!rgxEmail.test(String(req.body.email).toLowerCase())) {
    return res.status(400).json({
      err: "L'email n'est pas valide"
    });
  }

  // check if password is valid
  const regexPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[&#($_);.+!-])[0-9a-zA-Z&#($_);.+!-]{6,}$/;
  if (!regexPwd.test(String(req.body.password))) {
    return res.status(400).json({
      err:
        "Le mot de passe doit contenir plus de 5 caractères, avoir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial ( &#($_);.+!- )"
    });
  }

  next();
};

exports.updateProfileValidator = (req, res, next) => {
  console.log("bou");
  next();
};
