export const signup = data => {
  return fetch("path", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return { error: "Mail envoyé" };
    })
    .catch(error => console.log(error));
};
