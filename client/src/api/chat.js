import { API } from "../config";

export const getMatchUsers = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/chat/getMatchUsers`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      //   "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`
    }
    // body: JSON.stringify({ ...data, userUuid: jwt.user._id })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
