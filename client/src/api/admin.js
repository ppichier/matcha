import { API } from "../config";

export const getUsersReports = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/admin/getUsersReports`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt.token,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const isAdmin = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/admin/isAdmin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt.token,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteUser = (uuid) => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/admin/deleteUser`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uuid }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
