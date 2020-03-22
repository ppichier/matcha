import React from "react";
import { useEffect } from "react";

const Chat = ({ socket }) => {
  console.log(socket);
  useEffect(() => {
    //fetch for get all match in db
    // server will send list of match user [{socketId: "9876", userUuid: "1235", "pseudo": }]
    //fetch all messages
  });
  socket.emit("join chat", () => {});
  // socket.emit("send message")/ user send message with socket id or userUuid in params.
  // Server listen to this event and send this message to all socket who are associate with this userUuid.
  // Before
  // socket.on("receive message")/ user receive message from a user
  return <div>Chat</div>;
};
export default Chat;
