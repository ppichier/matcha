import React, { Fragment } from "react";
import "./ChatMessagesDisplay.css";
import { Image } from "react-bootstrap";
import { useEffect } from "react";

const ChatMessagesDisplay = ({ messages, guestInfosToDisplay }) => {
  useEffect(() => {
    let a = document.getElementById("container-scroll");
    if (!a) return;
    a.scrollTo({
      top: a.scrollHeight,
      left: 0
      // behavior: "smooth"
    });
  }, [guestInfosToDisplay]);

  const messagesDisplay = () => {
    if (guestInfosToDisplay)
      return (
        <div id="container-scroll" className="chat-messages-display-container">
          <div className="chat-messages-display-message-intro">
            <Image
              className="chat-messages-display-message-intro-img"
              src="https://image.flaticon.com/icons/png/512/1177/1177577.png"
              roundedCircle
            />
            <div>Vous avez matché avec nom !</div>
          </div>
          <div className="chat-messages-display-container-me">
            <div className="chat-messages-display-message-item chat-messages-display-message-item-color-me">
              Salut! Comment ça va?
            </div>
          </div>
          <div className="chat-messages-display-container-guest">
            <Image
              className="chat-messages-display-message-item-guest-img"
              src="https://image.flaticon.com/icons/png/512/1177/1177577.png"
              roundedCircle
            />
            <div className="chat-messages-display-message-item chat-messages-display-message-item-color-guest">
              Hello, plutot bien et toi ?
            </div>
          </div>
        </div>
      );
    else return <Fragment />;
  };

  return <Fragment>{messagesDisplay()}</Fragment>;
};

export default ChatMessagesDisplay;
