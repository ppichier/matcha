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

  useEffect(() => {
    if (uuid && guestInfos.uuid) {
      socket.emit("join", uuid, guestInfos.uuid, messages => {
        // console.log(messages);
        setAllMessages([...messages]);
      });
      // return () => {
      //   socket.off();
      // };
    }
  }, [socket, uuid, guestInfos.uuid]);

  useEffect(() => {
    socket.on("message", message => {
      // console.log("Reception du message: ", message);
      if (
        (message.from === guestInfos.uuid && message.to === uuid) ||
        (message.from === uuid && message.to === guestInfos.uuid)
      ) {
        setAllMessages([...allMessages, message]);
      } else {
        sendMessageNotification(message.from);
      }
    });

    // socket.on("isTyping", () => {
    //   // add class is typing if not already bind
    //   console.log("il ecrit");
    // });

    // socket.on("stopTyping", () => {
    //   // delete class is typing if not already delete
    //   console.log("il n'ecrit plus");
    // });

    return () => {
      socket.off();
    };
  }, [socket, guestInfos.uuid, uuid, allMessages, sendMessageNotification]);

  const sendMessage = e => {
    e.preventDefault();
    if (guestInfos && message) {
      socket.emit("sendMessage", uuid, guestInfos.uuid, message, () =>
        setMessage("")
      );
    }
  };

  // const sendTypingEvent = e => {
  //   console.log(e);
  //   socket.emit(
  //     "typingMessage",
  //     uuid,
  //     guestInfos.uuid,
  //     e.target.value,
  //     () => {}
  //   );
  // };

  const messageDisplay = () => {
    if (guestInfos.uuid) {
      return (
        <Fragment>
          <div style={{ height: "92%" }}>
            <ChatMessagesDisplay
              guestInfos={guestInfos}
              allMessages={allMessages}
              uuid={uuid}
            />
          </div>
          <div className="chat-messages-container-input">
            <ChatMessagesInput
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
              // sendTypingEvent={sendTypingEvent}
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
