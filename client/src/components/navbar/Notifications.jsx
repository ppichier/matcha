import React from "react";
import "./Notifications.css";
import { useState } from "react";
import { useEffect } from "react";
import { readNotifications } from "../../api/notifications";
import moment from "moment";
import localization from "moment/locale/fr";

const Notifications = ({ showNotifications }) => {
  const [listNotifications, setlistNotifications] = useState([]);

  moment().locale("fr", localization).format("LLL");

  useEffect(() => {
    readNotifications().then((data) => {
      if (!data) return;
      else if (data.err) {
        console.log(data.err);
      } else {
        setlistNotifications(data.listNotifications);
      }
    });
  }, [showNotifications]);

  const notifications = () => {
    return (
      <div className="notifications-box">
        <div className="py-1 px-2" style={{ color: "#808080" }}>
          Notifications
        </div>
        {listNotifications.map((e, i) => (
          <div className="notifications-item" key={i}>
            <div className="notifications-item-header">
              <div className="notifications-item-title">{e.title}</div>
              <div className="notifications-item-date">
                {moment(e.date).fromNow()}
              </div>
            </div>
            <div className="notifications-item-content">{e.content}</div>
          </div>
        ))}
      </div>
    );
  };

  return <div>{notifications()}</div>;
};

export default Notifications;
