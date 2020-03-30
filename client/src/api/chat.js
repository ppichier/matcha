import { API } from "../config";

export const getMatchUsers = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/chat/getMatchUsers`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
