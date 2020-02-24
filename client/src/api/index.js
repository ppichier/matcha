import { API } from "../config";

export const updateProfile = data => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/updateProfile`, {
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

export const uploadImage = data => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/uploadImage`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`
    },
    body: data
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const readImage = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/readImage`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const Picture = data => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/Picture`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`
    },
    body: data
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

// export const createProduct = (userId, token, product) => {
//   return fetch(`${API}/profile/${userId}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: product //Product is a form-data type
//   })
//     .then(response => response.json())
//     .catch(err => console.error(err));
// };
