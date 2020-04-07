import React, { Fragment } from "react";
import "./ChatMessagesDisplay.css";
import { Image } from "react-bootstrap";
import { useEffect } from "react";

const ChatMessagesDisplay = ({
  allMessages,
  guestInfos,
  uuid,
  guestTyping,
}) => {
  useEffect(() => {
    let a = document.getElementById("container-scroll");
    if (!a) return;
    a.scrollTo({
      top: a.scrollHeight,
      left: 0,
    });
  }, [guestInfos, allMessages]);

  const messageFromMe = (i, msg) => {
    return (
      <div key={i} className="chat-messages-display-container-me">
        <div className="chat-messages-display-message-item chat-messages-display-message-item-color-me">
          {msg}
        </div>
      </div>
    );
  };

  const messageFromGuest = (i, msg) => {
    return (
      <div key={i} className="chat-messages-display-container-guest">
        <Image
          className="chat-messages-display-message-item-guest-img"
          src={
            guestInfos.image !== null
              ? "data:image/png;base64, " + guestInfos.image
              : guestInfos.imageFakeProfile
          }
          roundedCircle
        />
        <div className="chat-messages-display-message-item chat-messages-display-message-item-color-guest">
          {msg}
        </div>
      </div>
    );
  };

  const typingBubbles = () => {
    if (guestTyping.indexOf(guestInfos.uuid) > -1)
      return (
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
    else return <Fragment />;
  };

  const messagesDisplay = () => {
    if (guestInfos.uuid)
      return (
        <div id="container-scroll" className="chat-messages-display-container">
          <div style={{ position: "relative", height: "auto" }}>
            <div className="chat-messages-display-message-intro">
              <Image
                className="chat-messages-display-message-intro-img"
                src={
                  guestInfos.image !== null
                    ? "data:image/png;base64, " + guestInfos.image
                    : guestInfos.imageFakeProfile
                }
                roundedCircle
              />
              <div className="chat-messages-display-message-intro-txt">
                Vous avez matché avec {guestInfos.userName} !
              </div>
            </div>
            <div>
              {allMessages.map((e, i) =>
                e.from === uuid
                  ? messageFromMe(i, e.msg)
                  : messageFromGuest(i, e.msg)
              )}
            </div>
            {/* <span style={{ position: "absolute", bottom: "10" }}> */}
            {typingBubbles()}
            {/* </span> */}
          </div>
        </div>
      );
    else return <Fragment />;
  };

  return <Fragment>{messagesDisplay()}</Fragment>;
};

export default ChatMessagesDisplay;
