import React, { useState, Fragment} from "react";
import "./ChatMessagesInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSmileBeam } from "@fortawesome/free-solid-svg-icons";
import 'emoji-mart/css/emoji-mart.css'
import { Picker, emojiIndex } from 'emoji-mart';
import { Emoji } from 'emoji-mart';
import InputEmoji from 'react-input-emoji';
// import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
// import "@webscopeio/react-textarea-autocomplete/style.css";
import Reaction from './Reaction';

const ChatMessagesInput = ({
  message,
  setMessage,
  sendMessage,
  sendTypingEvent
}) => {
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSetShow = (event) => {
      event.preventDefault();
      setIsShowEmoji(!isShowEmoji)
  }
  const handleEmojiselect = (emoji) =>{
    setIsShowEmoji(!isShowEmoji)
    setMsg(msg + emoji.native)
    setMessage(msg + emoji.colons)
  }

  const handleShowEmoji = () => {
   if(isShowEmoji === true)
      return(<Picker onSelect={emoji => handleEmojiselect(emoji)}  style={{ position: 'absolute', bottom: '20px', right: '20px'}}/>);
  }
  return (
    <form className="chat-messages-input-form">
      <input
        className="pl-3 chat-messages-input-text"
        placeholder="Rédigez un message ..."
        maxLength="1000"
        value={msg}
        onChange={e => setMsg(e.target.value)}
        onKeyUp={e => (e.key === "Enter" ? sendMessage(e) : sendTypingEvent(e))}
      />
      <div className="ml-2 chat-messages-input-container-send">
        <button
          className="px-4 py-1 chat-messages-input-send"
          onClick={e => sendMessage(e)}
        >
          <FontAwesomeIcon icon={faPaperPlane} />          
        </button>
        <button
          className="c-icon"  
          onClick={handleSetShow}
        >
        <FontAwesomeIcon icon={faSmileBeam} /> 
        </button>  
        {handleShowEmoji()}
      </div>
    </form>
  );
};

export default ChatMessagesInput;
