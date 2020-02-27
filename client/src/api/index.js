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

export const uploadProfileImage = data => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/uploadProfileImage`, {
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

export const uploadSecondaryImages = data => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/uploadSecondaryImages`, {
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

export const deleteProfileImage = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/deleteProfileImage`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`
    },
    body: JSON.stringify({ userUuid: jwt.user._id })
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const deleteSecondaryImage = data => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/deleteSecondaryImage`, {
    method: "DELETE",
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

export const readSecondaryImages = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/readSecondaryImages`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
export const readImage = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/readImage`, {
    method: "POST",
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
