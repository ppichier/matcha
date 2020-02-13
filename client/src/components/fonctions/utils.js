export const verifValited = values => {
  let rgxpassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&#($_);.+\-!])/;
  let rgxmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let lenPassword = values.newPassword.length;
  let lenFirstName = values.firstName.length;
  let lenLastName = values.lastName.length;
  let lenPseudo = values.pseudo.length;
  if (values.email === "" || values.password === "") {
    return { err: "Veuillez remplir tous les champ" };
  } else if (lenPassword < 6 && lenPassword > 30) {
    return {
      err: "Le code d'accès doit etre composé min de 6 caractères et max 30 "
    };
  } else if (!rgxpassword.test(values.newPassword)) {
    return {
      err:
        " votre mot de passe doit figurer au moins un chiffre, une majuscule et un caractère spécial.."
    };
  } else if (!rgxmail.test(values.email)) {
    return { err: "votre adresse email n'est pas valide." };
  } else if (
    (lenFirstName < 3 && lenFirstName > 30) ||
    (lenLastName < 3 && lenLastName > 30) ||
    (lenPseudo < 3 && lenPseudo > 30)
  ) {
    return {
      err: "votre nom ou prenom ..."
    };
  }
  return {
    err: null
  };
};

export const verifValitedPassword = values => {
  let rgxpassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&#($_);.+\-!])/;
  let lenPassword = values.password.length;
  if (values.email === "" || values.password === "") {
    return { err: "Veuillez remplir tous les champ" };
  } else if (lenPassword < 6 && lenPassword > 30) {
    return {
      err: "Le code d'accès doit etre composé min de 6 caractères et max 30 "
    };
  } else if (!rgxpassword.test(values.password)) {
    return {
      err:
        " votre mot de passe doit figurer au moins un chiffre, une majuscule et un caractère spécial.."
    };
  }
  return {
    err: null
  };
};

// TODO verif forget password if email
export const verifValitedEmail = values => {
  let rgxmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (values.email === "") {
    return { err: "Veuillez remplir tous les champ" };
  } else if (!rgxmail.test(values.email)) {
    return { err: "votre adresse email n'est pas valide." };
  }
  return {
    err: null
  };
};
