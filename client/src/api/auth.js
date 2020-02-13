import { API } from "../config";

// 1- Client side check JWT is not expired. YES.
// 2- Then check if JWT token is still for an active user on the server. YES/NO possibly

// const logUserOut = token =>{
//   setTimeout(()=> MyLogoutFunction(), token.expiresIn)
// }

export const isAuthenticated = () => {
  //If jwt undefined in local storage crash !!

  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/verifyToken`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt.token
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const signup = data => {
  return fetch(`${API}/signup`, {
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
