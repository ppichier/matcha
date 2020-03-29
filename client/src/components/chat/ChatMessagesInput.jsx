import React from "react";
import "./ChatMessagesInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// https://dev.to/rexeze/how-to-build-a-real-time-chat-app-with-nodejs-socketio-and-mongodb-2kho
//  Notify user when typing

const ChatMessagesInput = ({
  message,
  setMessage,
  sendMessage,
  sendTypingEvent
}) => {
  return (
    <form className="chat-messages-input-form">
      <input
        className="pl-3 chat-messages-input-text"
        placeholder="Rédigez un message ..."
        maxLength="1000"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyUp={e =>
          e.key === "Enter" ? sendMessage(e) : sendTypingEvent(e)
        }
      />
      <div className="ml-2 chat-messages-input-container-send">
        <button
          className="px-4 py-1 chat-messages-input-send"
          onClick={e => sendMessage(e)}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </form>
  );
};

export default ChatMessagesInput;
