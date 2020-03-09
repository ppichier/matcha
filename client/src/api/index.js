import { API } from "../config";

export const filterProfile = data => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/match/filterProfile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`
    },
    body: JSON.stringify({ ...data, userUuid: jwt.user._id })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const sortProfile = data => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/match/filterProfile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`
    },
    body: JSON.stringify({ ...data, userUuid: jwt.user._id })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
