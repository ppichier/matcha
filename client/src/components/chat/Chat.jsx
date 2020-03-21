import React from "react";
import SocketContext from "../../socket/socket-context";

const Chat = ({ socket }) => {
  console.log(socket);
  socket.emit("join chat", () => {});
  // socket.emit("send message")/ user send message to a user
  // socket.on("receive message")/ user receive message from a user
  return <div>Chat</div>;
};

export default Chat;
