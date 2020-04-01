import { API } from "../config";

//CREER MATCHA.JS !!!!!!!!!!!!
//CREER MATCHA.JS !!!!!!!!!!!!
//CREER MATCHA.JS !!!!!!!!!!!!
//CREER MATCHA.JS !!!!!!!!!!!!
//CREER MATCHA.JS !!!!!!!!!!!!
//CREER MATCHA.JS !!!!!!!!!!!!
//CREER MATCHA.JS !!!!!!!!!!!!
//CREER MATCHA.JS !!!!!!!!!!!!
export const filterProfile = data => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/match/filterProfile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const sortProfile = data => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/match/sortProfile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const readCommonTag = uuid => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/match/readCommonTag`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ uuid: "TESTUUID" })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const firstFilter = (moreProfiles) => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/match/firstFilter`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
      "Content-Type": "application/json"
    },
      body: JSON.stringify({ moreProfiles})
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const heartClick = userLiked => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/match/heartClick`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...userLiked })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
