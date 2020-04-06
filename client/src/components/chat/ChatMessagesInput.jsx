import React, { useState, Fragment } from "react";
import "./ChatMessagesInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSmileBeam } from "@fortawesome/free-solid-svg-icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { Emoji } from "emoji-mart";
import InputEmoji from "react-input-emoji";
import Reaction from "./Reaction";
import { useEffect } from "react";

const ChatMessagesInput = ({
  setMessageNative,
  messageNative,
  message,
  setMessage,
  sendMessage,
  sendTypingEvent,
  guestUuid,
}) => {
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const [tmp, setTmp] = useState([]);

  useEffect(() => {
    setIsShowEmoji(false);
  }, [guestUuid]);

  const handleSetShow = (event) => {
    event.preventDefault();
    setIsShowEmoji(!isShowEmoji);
  };
  const handleEmojiselect = (emoji) => {
    setIsShowEmoji(!isShowEmoji);
    setTmp([emoji.native, emoji.colons])
    setMessage(message + emoji.colons);
    setMessageNative(messageNative + emoji.native);
  };

  const handleShowEmoji = () => {
    if (isShowEmoji === true)
      return (
        <Picker
          onSelect={(emoji) => handleEmojiselect(emoji)}
          style={{ position: "absolute", bottom: "50px", right: "0px" }}
        />
      );
  };
  return (
    <form className="chat-messages-input-form">
      <input
        className="pl-3 chat-messages-input-text"
        placeholder="Rédigez un message ..."
        maxLength="1000"
        value={messageNative}
        onChange={(e) => {
          setMessage(tmp === "" ? e.target.value :  e.target.value.replace(tmp[0], tmp[1]));
          setMessageNative(e.target.value);
        }}
        onKeyUp={(e) =>
          e.key === "Enter" ? sendMessage(e) : sendTypingEvent(e)
        }
      />
      <div className="ml-2 chat-messages-input-container-send">
        <button
          className="px-4 py-1 chat-messages-input-send"
          onClick={(e) => {sendMessage(e); setTmp("")}}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
        <button className="c-icon" onClick={handleSetShow}>
          <FontAwesomeIcon icon={faSmileBeam} />
        </button>
        {handleShowEmoji()}
      </div>
    </form>
  );
};

export default ChatMessagesInput;
