import { API } from "../config";

export const getUserLike = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/popularity/getUserLike`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getUserVisit = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/popularity/getUserVisit`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
