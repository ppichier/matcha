require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const chalk = require("chalk");
const faker = require("./faker");
const jwt = require("jsonwebtoken");
const utils = require("./utility/utils");

const { getAllMessages, saveMessage } = require("./socket/chat");

//app
const app = express();
const http = require("http").createServer(app);
global.io = require("socket.io")(http, {
  pingTimeout: 60000,
});

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const matchRoutes = require("./routes/match");
const chatRoutes = require("./routes/chat");
const popularityRoutes = require("./routes/popularity");
const notificationsRoutes = require("./routes/notifications");
const adminRoutes = require("./routes/admin");
const error = require("./controllers/error");
const pool = require("./db");

//faker
// faker.generateFakeProfiles();

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

//routes middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", matchRoutes);
app.use("/api", chatRoutes);
app.use("/api", popularityRoutes);
app.use("/api", notificationsRoutes);
app.use("/api", adminRoutes);

const port = process.env.PORT || 8000;

/* TEST SOCKET */

users_connected = {};

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

io.on("connection", (socket) => {
  console.log(chalk.magenta("connection ws"));
  let userUuid = null;

  socket.on("register", (token, cb) => {
    console.log(chalk.magenta("REGISTER: ", token));
    if (!users_connected.hasOwnProperty(socket.id)) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(chalk.yellow(err));
          return { err: "Socket connection error" };
        }
        users_connected[socket.id] = decoded._id;
        userUuid = decoded._id;
        console.log(users_connected);
        console.log(chalk.magenta(`${userUuid} est en ligne`));
        io.to(userUuid).emit("online");
      });
    }
    cb(users_connected);
  });

  socket.on("logout", (userUuid, cb) => {
    //
    // if user click on deconnect delete all row with user_id concerned
    // and emit event offline user
  });

  socket.on("visit", (userUuid, guestUuid, cb) => {
    console.log(chalk.redBright("MON ID: ", userUuid));
    console.log(chalk.redBright("VISIT ID: ", guestUuid));
    // get ids
    pool.getConnection(async (err, connection) => {
      if (err) {
        connection.release();
      } else {
        try {
          let { userId, userLikedId } = await utils.getIds(
            userUuid,
            guestUuid,
            connection
          );
          connection.release();
          let usersBlockedByGuest = await utils.getUsersBlocked(userLikedId);
          // let usersBlockedByMe = await utils.getUsersBlocked(userId);
          console.log("+++++++++++++++++");
          console.log(usersBlockedByGuest);
          console.log("+++++++++++++++++");
          if (
            usersBlockedByGuest.findIndex(
              (x) => x.UserBlockedReceiver === userId
            ) !== -1
          ) {
            console.log("User is block - visit emit not sent");
            return;
          }
          // } else if (
          //   usersBlockedByMe.findIndex(
          //     (x) => x.UserBlockedReceiver === userLikedId
          //   ) !== -1
          // ) {
          //   return;
          // }
          socket.join(guestUuid);
          let guestSockets = utils.findSocketsGivenUuid(guestUuid);
          console.log("YO", guestSockets);
          [...guestSockets].forEach((e) => {
            console.log("emit to:", e);
            io.to(e).emit("receiveNotification");
          });
        } catch (e) {
          console.log(e);
          connection.release();
          return;
        }
      }
    });
  });

  socket.on("join", async (userUuid, guestUuid, cb) => {
    console.log("joining room", userUuid);
    try {
      const messages = await getAllMessages(userUuid, guestUuid);
      cb(messages);
    } catch (err) {
      console.log(chalk.red("Error socket fetch getAllMessages: ", err));
      cb([]);
    }
  });

  socket.on("sendMessage", async (userUuid, guestUuid, message, cb) => {
    // socket.emit("message", { from: userUuid, to: guestUuid, msg: message });
    try {
      await saveMessage(userUuid, guestUuid, message);
      // await saveLastMessage(userUuid, guestUuid, message);
      let guestSockets = utils.findSocketsGivenUuid(guestUuid);
      let meSockets = utils.findSocketsGivenUuid(userUuid);
      [...guestSockets].forEach((e) => {
        io.to(e).emit("receiveNotification");
      });
      [...guestSockets, ...meSockets].forEach((e) => {
        io.to(e).emit("message", {
          from: userUuid,
          to: guestUuid,
          msg: message,
        });
      });
      cb();
    } catch (err) {
      console.log(message);
      console.log(chalk.red("Error socket fetch saveMessage: ", err));
    }
  });

  socket.on("typingMessage", (userUuid, guestUuid, message, cb) => {
    let guestSockets = utils.findSocketsGivenUuid(guestUuid);
    let typingEvent = message.length === 0 ? "stopTyping" : "isTyping";

    guestSockets.forEach((e) => {
      io.to(e).emit(typingEvent, userUuid);
    });
  });

  socket.on("disconnect", () => {
    const userIdDelete = users_connected[socket.id];
    delete users_connected[socket.id];
    setTimeout(() => {
      if (
        Object.values(users_connected).filter((u) => u === userIdDelete)
          .length === 0
      ) {
        console.log(chalk.magenta("No more socket for userid: ", userIdDelete));
        io.to(userIdDelete).emit("offline");
        // no more socket of userid so emit event offline
      } else {
        console.log("Sockets still exist for userid:", userIdDelete);
      }
    }, 2000);
  });
});

/* END TEST SOCKET */

http.listen(port, () => {
  console.log(chalk.blue(`App listen on port ${port}`));
});
