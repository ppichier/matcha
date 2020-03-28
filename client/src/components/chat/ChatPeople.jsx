import React, { Fragment } from "react";
import "./ChatPeople.css";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faComments } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { getMatchUsers } from "../../api/chat";
import { readImage } from "../../api/user";

const ChatPeople = ({ sendGuestInfos, messageNotification }) => {
  const [guestIndex, setGuestIndex] = useState(null);
  const [matchPeople, setMatchPeople] = useState([]);
  const [matchImages, setMatchImages] = useState([]);
  const [userNotify, setUsertNotify] = useState([]);

  useEffect(() => {
    getMatchUsers()
      .then(data => {
        if (data.err) return;
        else {
          setMatchPeople([...data.matchPeople]);
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (messageNotification !== null) {
      if (userNotify.indexOf(messageNotification) === -1)
        setUsertNotify([...userNotify, messageNotification]);
    }
  }, [messageNotification, userNotify]);

  useEffect(() => {
    if (matchPeople.length !== 0) {
      let promises = matchPeople.map(people => readImage(people.uuid));
      Promise.all(promises)
        .then(data => {
          if (data.err) return;
          else {
            setMatchImages([...data]);
          }
        })
        .catch(err => console.log(err));
    }
  }, [matchPeople]);

  const updateIndex = index => {
    let guestDiv = document.getElementsByClassName("chat-people-item");
    if (guestIndex !== null)
      guestDiv[guestIndex].classList.remove("chat-people-item-selected");

    if (guestIndex !== index) {
      sendGuestInfos({ ...matchPeople[index], ...matchImages[index] });
      setGuestIndex(index);
    }
    guestDiv[index].classList.add("chat-people-item-selected");
  };

  const profileImage = i => {
    let sourceImage =
      "https://image.flaticon.com/icons/png/512/1177/1177577.png";
    if (matchImages.length === 0 || !matchImages[i])
      sourceImage = "https://image.flaticon.com/icons/png/512/1177/1177577.png";
    else if (matchImages[i].image !== null)
      sourceImage = "data:image/png;base64, " + matchImages[i].image;
    else if (matchImages[i].imageFakeProfile !== null)
      sourceImage = matchImages[i].imageFakeProfile;
    return (
      <Image
        className="chat-people-item-image"
        roundedCircle
        src={sourceImage}
      />
    );
  };

  const badgeMessageNotification = (i, peopleUuid) => {
    if (i === guestIndex) {
      let idxToRemove = userNotify.indexOf(peopleUuid);
      let usertToNotifyTmp = [...userNotify];
      if (idxToRemove > -1) {
        usertToNotifyTmp.splice(idxToRemove, 1);
        setUsertNotify(usertToNotifyTmp);
      }
      return <Fragment />;
    }
    if (userNotify.includes(peopleUuid))
      return <div className="chat-people-item-online"></div>;
    else return <Fragment />;
  };

  return (
    <Fragment>
      <div className="py-3 ml-4 chat-people-col-title">
        <span className="px-2 py-2">
          <FontAwesomeIcon icon={faComments} className="pr-1" />
          Messages
        </span>
      </div>

      <div className=" chat-people-list">
        {matchPeople.map((people, i) => {
          return (
            <div
              className="pl-4 py-2 chat-people-item"
              onClick={() => updateIndex(i)}
              key={i}
            >
              <div className="chat-people-item-container-image">
                {badgeMessageNotification(i, people.uuid)}
                {profileImage(i)}
              </div>
              {/* Logo online + notif message */}
              <div className="ml-3 chat-people-item-infos">
                <div className="chat-people-item-pseudo">
                  {people.userName}{" "}
                </div>
                <div className="chat-people-item-last-msg">
                  <FontAwesomeIcon icon={faReply} className="pr-1" />
                  last message ....
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ChatPeople;
