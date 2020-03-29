import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import "./ChatMessages.css";
import ChatMessagesInput from "./ChatMessagesInput";
import ChatMessagesDisplay from "./ChatMessagesDisplay";

const ChatMessages = ({
  socket,
  guestInfos,
  uuid,
  sendMessageNotification
}) => {
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [guestTyping, setGuestTyping] = useState([]);

  useEffect(() => {
    if (uuid && guestInfos.uuid) {
      setMessage("");
      socket.emit("join", uuid, guestInfos.uuid, messages => {
        // console.log(messages);
        setAllMessages([...messages]);
      });
      // return () => {
      //   socket.off();
      // };
    }
  }, [socket, uuid, guestInfos.uuid]);

  const removeGuestTyping = guestUuid => {
    const idx = guestTyping.indexOf(guestUuid);
    if (idx !== -1) {
      const guestTypingTmp = [...guestTyping];
      guestTypingTmp.splice(idx, 1);
      setGuestTyping(guestTypingTmp);
    }
  };

  useEffect(() => {
    socket.on("message", message => {
      // console.log("Reception du message: ", message);
      removeGuestTyping(message.from);
      if (
        (message.from === guestInfos.uuid && message.to === uuid) ||
        (message.from === uuid && message.to === guestInfos.uuid)
      ) {
        setAllMessages([...allMessages, message]);
      } else {
        sendMessageNotification(message.from);
      }
    });

    socket.on("isTyping", t => {
      if (guestTyping.indexOf(t) === -1) setGuestTyping([...guestTyping, t]);
      // add class is typing if not already bind
    });

    socket.on("stopTyping", t => {
      // delete class is typing if not already delete
      removeGuestTyping(t);
    });

    return () => {
      socket.off();
    };
  }, [
    socket,
    guestInfos.uuid,
    uuid,
    allMessages,
    sendMessageNotification,
    guestTyping
  ]);

  const sendMessage = e => {
    e.preventDefault();
    if (guestInfos && message) {
      socket.emit("sendMessage", uuid, guestInfos.uuid, message, () =>
        setMessage("")
      );
    }
  };

  const sendTypingEvent = e => {
    // console.log(e);
    socket.emit(
      "typingMessage",
      uuid,
      guestInfos.uuid,
      e.target.value,
      () => {}
    );
  };

  const messageDisplay = () => {
    if (guestInfos.uuid) {
      return (
        <Fragment>
          <div style={{ height: "92%" }}>
            <ChatMessagesDisplay
              guestInfos={guestInfos}
              allMessages={allMessages}
              uuid={uuid}
              guestTyping={guestTyping}
            />
          </div>
          <div className="chat-messages-container-input">
            <ChatMessagesInput
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
              sendTypingEvent={sendTypingEvent}
            />
          </div>
        </Fragment>
      );
    } else {
      return (
        <div
          style={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
          <img
            alt={"chat-phone"}
            src={
              "https://m.coruscatesolution.com/wp-content/themes/Coruscate/img/Services/chatting-application/customizations.svg"
            }
          />
        </div>
      );
    }
  };
  return <Fragment>{messageDisplay()}</Fragment>;
};

export default ChatMessages;
