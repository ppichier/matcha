import { API } from "../config";

export const updateProfile = (data) => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/updateProfile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
    body: JSON.stringify({ ...data, userUuid: jwt.user._id }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const uploadProfileImage = (data) => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/uploadProfileImage`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const uploadSecondaryImages = (data) => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/uploadSecondaryImages`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteProfileImage = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/deleteProfileImage`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteSecondaryImage = (data) => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/deleteSecondaryImage`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
    body: JSON.stringify({ ...data }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const readSecondaryImages = (guestUuid) => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/readSecondaryImages`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guestUuid }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const readImage = (guestUuid = null) => {
  // send uuid of user image
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/readImage`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guestUuid }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const readProfile = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/readProfile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uuid: "TESTUUID" }), // delete body and POST -> GET
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const readGuestProfile = (guestUuid) => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/readGuestProfile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guestUuid }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const Picture = (data) => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/Picture`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const userBlocked = (userBlocked) => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/userBlocked`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userBlocked }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const userReport = (userReport) => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/profile/userReport`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userReport }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
