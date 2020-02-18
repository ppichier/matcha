export const verifValidatedPassword = password => {
  let rgxpassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&#($_);.+\-!])/;
  let lenPassword = password;
  if (password === "") {
    return { err: "Veuillez remplir tous les champ" };
  } else if (lenPassword < 6 && lenPassword > 30) {
    return {
      err: "Le code d'accès doit etre composé min de 6 caractères et max 30 "
    };
  } else if (!rgxpassword.test(password)) {
    return {
      err:
        " Votre mot de passe doit figurer au moins un chiffre, une majuscule et un caractère spécial..vali"
    };
  }
  return {
    err: null
  };
};

export const verifValidatedEmail = email => {
  // console.log(email);
  let rgxmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email === "") {
    return { err: "Veuillez remplir tous les champs" };
  } else if (!rgxmail.test(email)) {
    return { err: "Votre adresse email n'est pas valide." };
  }
  return {
    err: null
  };
};

export const verifValidated = values => {
  let lenFirstName = values.firstName.length;
  let lenLastName = values.lastName.length;
  let lenPseudo = values.pseudo.length;
  const verifPassword = verifValidatedPassword(values.password);
  const verifEmail = verifValidatedEmail(values.email);

  if (verifEmail !== null && valitedPassword !== null) {
    if (verifEmail.err !== null) {
      return { err: verifEmail.err };
    } else if (verifPassword.err !== null) {
      return { err: verifPassword.err };
    } else if (
      lenFirstName < 3 ||
      lenFirstName > 30 ||
      lenLastName < 3 ||
      lenLastName > 30 ||
      lenPseudo < 3 ||
      lenPseudo > 30
    ) {
      return {
        err: "Votre nom ou prenom ..."
      };
    }
  }
  return {
    err: null
  };
};

export const valitedPassword = values => {
  // if (values.newPassword !== "" && values.oldPassword !== "") {
  //   const newPassword = verifValidatedPassword(values.newPassword);
  //   const oldPassword = verifValidatedPassword(values.oldPassword);
  const email = verifValidatedEmail(values.email);
  //   if (newPassword.err !== null && oldPassword !== null) {
  //     if (newPassword.err !== null) {
  //       return { err: newPassword.err };
  //     } else return { err: oldPassword.err };}
  if (email !== null) {
    return { err: email };
  }

  return { err: null };
};

export const validatedTag = tag => {
  const lenTag = tag.length;
  if (lenTag > 12) {
    return {
      err: "La longueur max d'un tag est de 12 caractères."
    };
  }
  return {
    err: null
  };
};
