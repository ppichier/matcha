export const verifValidatedPassword = (password) => {
  let rgxpassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&#($_);.+\-!])/;
  let lenPassword = password.length;
  if (password === "") {
    return { err: "Veuillez remplir tous les champs" };
  } else if (lenPassword < 6 || lenPassword > 30) {
    return {
      err:
        "La longueur du mot de passe doit être comprise entre 6 et 30 caractères",
    };
  } else if (!rgxpassword.test(password)) {
    return {
      err:
        "Le mot de passe doit comporter au moins un chiffre, une majuscule et un caractère spécial",
    };
  }
  return {
    err: null,
  };
};

export const verifValidatedEmail = (email) => {
  // console.log(email);
  let rgxmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email === "") {
    return { err: "Veuillez remplir tous les champs" };
  } else if (!rgxmail.test(email)) {
    return { err: "Votre adresse email n'est pas valide." };
  }
  return {
    err: null,
  };
};

export const verifValidated = (values) => {
  let lenFirstName = values.firstName.trim().length;
  let lenLastName = values.lastName.trim().length;
  let lenPseudo = values.pseudo.trim().length;
  // const verifPassword = verifValidatedPassword(values.password);
  const verifEmail = verifValidatedEmail(values.email);

  if (verifEmail !== null) {
    if (verifEmail.err !== null) {
      return { err: verifEmail.err };
    } else if (
      lenFirstName < 3 ||
      lenFirstName > 20 ||
      lenLastName < 3 ||
      lenLastName > 20 ||
      lenPseudo < 3 ||
      lenPseudo > 20
    ) {
      return {
        err:
          "Les champs principaux doivent faire plus de 3 et moins de 20 caractères",
      };
    } else if (values.description) {
      if (values.description.length > 1000) {
        return {
          err:
            "La longueur de la description doit être inférieure à 1000 caractères",
        };
      }
    }
  }
  return {
    err: null,
  };
};

export const valitedPassword = (values) => {
  // if(verifValidatedEmail != null && )
};

export const validatedTag = (tag) => {
  const lenTag = tag.length;
  if (lenTag > 12) {
    return {
      err: "La longueur max d'un tag est de 12 caractères.",
    };
  }
  return {
    err: null,
  };
};
