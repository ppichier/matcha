import { API } from "../config";

export const profileUser = data => {
  return fetch(`${API}/profileUser`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const cardPicture = data => {
  return fetch(`${API}/cardPicture`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: FormData
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const Picture = data => {
  return fetch(`${API}/Picture`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: FormData
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
