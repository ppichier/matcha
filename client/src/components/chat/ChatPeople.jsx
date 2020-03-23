import React, { Fragment } from "react";
import "./ChatPeople.css";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faComments } from "@fortawesome/free-solid-svg-icons";

const ChatPeople = ({ peoples }) => {
  return (
    <Fragment>
      <div className="my-3 ml-4 chat-people-col-title">
        <span className="px-2 py-2">
          <FontAwesomeIcon icon={faComments} className="pr-1" />
          Messages
        </span>
      </div>
      <div className="mt-4 chat-people-list">
        <div className="pl-4 py-2 chat-people-item" style={{ display: "flex" }}>
          <Image
            className="chat-people-item-image"
            src="https://image.flaticon.com/icons/png/512/1177/1177577.png"
            roundedCircle
          />
          {/* Logo online + notif message */}
          <div className="ml-3 chat-people-item-infos">
            <div className="chat-people-item-pseudo">ppichier</div>
            <div className="chat-people-item-last-msg">
              <FontAwesomeIcon icon={faReply} className="pr-1" />
              last message ....
            </div>
          </div>
        </div>

        <div className="pl-4 py-2 chat-people-item" style={{ display: "flex" }}>
          <Image
            className="chat-people-item-image"
            src="https://image.flaticon.com/icons/png/512/1177/1177577.png"
            roundedCircle
          />
          {/* Logo online + notif message */}
          <div className="ml-3 chat-people-item-infos">
            <div className="chat-people-item-pseudo">ppichier</div>
            <div className="chat-people-item-last-msg">
              <FontAwesomeIcon icon={faReply} className="pr-1" />
              last message ....
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatPeople;
