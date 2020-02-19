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

export const uploadImage = data => {
  return fetch(`${API}/profile/uploadImage`, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: data
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const readImage = () => {
  return fetch(`${API}/profile/readImage`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
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
    body: data
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

// export const createProduct = (userId, token, product) => {
//   return fetch(`${API}/product/create/${userId}`, {
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
