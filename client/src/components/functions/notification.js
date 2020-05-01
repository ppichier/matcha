import { store } from "react-notifications-component";


export const notificationAlert = (msg, type, position) => {
  store.addNotification({
    message: msg,
    type: type,
    insert: "top",
    container: position,
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};
