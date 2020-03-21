require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const chalk = require("chalk");
const faker = require("./faker");
const jwt = require("jsonwebtoken");

//app
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const matchRoutes = require("./routes/match");

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

const port = process.env.PORT || 8000;

const users_connected = {};

io.on("connection", socket => {
  console.log(chalk.magenta("connection ws"));
  socket.on("register", (token, cb) => {
    if (!users_connected.hasOwnProperty(socket.id)) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return { err: "Socket connection error" };
        users_connected[socket.id] = decoded._id;
      });
    }
    cb(users_connected);
  });

  socket.on("logout", () => {
    // if user click on deconnect delete all row with user_id concerned
    // and emit event offline user
  });

  // socket.on("join chat", () => {
  //   console.log("joiiiiiinnnnn", socket.id);
  // });

  socket.on("disconnect", () => {
    const userIdDelete = users_connected[socket.id];
    delete users_connected[socket.id];
    setTimeout(() => {
      if (
        Object.values(users_connected).filter(u => u === userIdDelete)
          .length === 0
      ) {
        console.log(chalk.magenta("No more socket for userid: ", userIdDelete));
        // no more socket of userid so emit event offline
      } else {
        console.log("Sockets still exist for userid:", userIdDelete);
      }
    }, 2000);
  });
});

http.listen(port, () => {
  console.log(chalk.blue(`App listen on port ${port}`));
});
