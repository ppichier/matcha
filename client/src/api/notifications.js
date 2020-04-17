import { API } from "../config";

export const readNotifications = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/notifications/getNotifications`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getNotificationsNumber = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  return fetch(`${API}/notifications/getNotificationsNumber`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
