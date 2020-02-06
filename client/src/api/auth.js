import { API } from "../config";

export const signup = data => {
  return fetch(`http://localhost:8000/api/signup`, {
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

export const signin = data => {
  return fetch(`${API}/signin`, {
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

export const forgotPassword = data => {
  return fetch(`${API}/forgotPassword`, {
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

export const verifyAccount = (uuid, signal) => {
  return fetch(`${API}/verifyAccount`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ uuid: uuid }),
    signal: signal
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
