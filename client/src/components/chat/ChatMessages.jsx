import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import "./ChatMessages.css";
import ChatMessagesInput from "./ChatMessagesInput";
import ChatMessagesDisplay from "./ChatMessagesDisplay";

const ChatMessages = ({
  socket,
  guestInfos,
  uuid,
  sendMessageNotification,
  sendLastMessage,
}) => {
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [guestTyping, setGuestTyping] = useState([]);

  const eventOnMessage = (message) => {
    // console.log("Reception du message: ", message);
    const idx = guestTyping.indexOf(message.from);
    if (idx !== -1) {
      const guestTypingTmp = [...guestTyping];
      guestTypingTmp.splice(idx, 1);
      setGuestTyping(guestTypingTmp);
    }
    if (
      (message.from === guestInfos.uuid && message.to === uuid) ||
      (message.from === uuid && message.to === guestInfos.uuid)
    ) {
      setAllMessages([...allMessages, message]);
    } else {
      sendMessageNotification(message.from);
    }
    sendLastMessage({
      with: message.from === uuid ? message.to : message.from,
      from: message.from,
      msg: message.msg,
    });
  };

  const eventOnTyping = (t) => {
    // console.log("is typing");
    if (guestTyping.indexOf(t) === -1) setGuestTyping([...guestTyping, t]);
  };

  const eventStopTyping = (t) => {
    const idx = guestTyping.indexOf(t);
    if (idx !== -1) {
      const guestTypingTmp = [...guestTyping];
      guestTypingTmp.splice(idx, 1);
      setGuestTyping(guestTypingTmp);
    }
  };

  useEffect(() => {
    if (uuid && guestInfos.uuid) {
      setMessage("");
      socket.emit("join", uuid, guestInfos.uuid, (messages) => {
        // console.log("je join la room");
        setAllMessages([...messages]);
      });
    }
  }, [socket, uuid, guestInfos.uuid]);

  useEffect(() => {
    // console.log(allMessages);

    socket.on("message", eventOnMessage);

    socket.on("isTyping", eventOnTyping);

    socket.on("stopTyping", eventStopTyping);

    return () => {
      socket.removeListener("message", eventOnMessage);
      socket.removeListener("isTyping", eventOnTyping);
      socket.removeListener("stopTyping", eventStopTyping);
      // socket.off("message");
      // socket.off("isTyping");
      // socket.off("stopTyping");
      // socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    socket,
    guestInfos.uuid,
    // uuid,
    allMessages,
    // sendMessageNotification,
    guestTyping,
    // sendLastMessage,
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (guestInfos && message) {
      socket.emit("sendMessage", uuid, guestInfos.uuid, message, () => {
        setMessage("");
      });
    }
  };

  const sendTypingEvent = (e) => {
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
              guestUuid={guestInfos.uuid}
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
