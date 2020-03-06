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
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const deleteSecondaryImage = data => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/deleteSecondaryImage`, {
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

export const readSecondaryImages = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/readSecondaryImages`, {
    method: "GET",
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
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const readProfile = uuid => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/readProfile`, {
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

// export const deleteTag = tag => {
//   let jwt = JSON.parse(localStorage.getItem("jwt"));
//   return fetch(`${API}/profile/deleteTag`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${jwt.token}`
//     },
//     body: JSON.stringify({ tag })
//   })
//     .then(res => res.json())
//     .catch(err => console.log(err));
// };
export const filterProfile = data => {
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
