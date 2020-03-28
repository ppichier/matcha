import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import "./ChatMessages.css";
import ChatMessagesInput from "./ChatMessagesInput";
import ChatMessagesDisplay from "./ChatMessagesDisplay";

const ChatMessages = ({ socket, guestInfos, uuid }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");

  // console.log(guestInfos);

  useEffect(() => {
    if (uuid && guestInfos.uuid) {
      socket.emit("join", uuid, guestInfos.uuid, messages => {
        //   console.log(messages);
        //get all messages between user and guest
        console.log(messages);
        setAllMessages([...messages]);
      });
      // return () => {
      //   socket.off();
      // };
    }
  }, [socket, uuid, guestInfos.uuid]);

  useEffect(() => {
    socket.on("message", message => {
      //get single message in live
      // console.log(guestInfos);
      console.log("Reception du message: ", message);
      if (
        (message.from === guestInfos.uuid && message.to === uuid) ||
        (message.from === uuid && message.to === guestInfos.uuid)
      ) {
        console.log("HERE");
        setAllMessages([...allMessages, message]);
      }
      //store in db the message regarding uuid and guest id
    });
    return () => {
      socket.off();
    };
  }, [socket, guestInfos, allMessages]);

  const sendMessage = e => {
    e.preventDefault();
    if (guestInfos && message) {
      // console.log(guestInfos);
      socket.emit("sendMessage", uuid, guestInfos.uuid, message, () =>
        setMessage("")
      );
    }
  };

  //   console.log(message);
  //   console.log(allMessages);

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
