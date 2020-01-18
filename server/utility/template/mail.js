const templateMailSignUpHeader = "Welcome to Matcha - Account confirmation";
const templateMailSignUpBody = (pseudo, email) => {
  return `<div style="border: 4px solid #fad5c0; border-radius: 3px; padding: 10px"><h1>Matcha</h1><h4>Confirmation de votre inscription</h4><p>Bonjour <span style="color: #fad5c0">${pseudo}</span> et bienvenue sur Matcha ! <p/><p>Afin d\'activer votre compte et commencer à faire de nouvelles rencontres, veuillez cliquer sur le lien ci-dessous.</p><a href="#">${email}</a><div style="text-align: center"><img src="cid:logo"></div><hr/><p><i>Matcha - 2020. 42 project</i></p></div>`;
};

/* 
pseudo variable
Link validate email
*/

module.exports = {
  templateMailSignUpHeader,
  templateMailSignUpBody
};
