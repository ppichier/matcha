require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const chalk = require("chalk");
const faker = require("./faker");

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

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("a user has left");
  });
});

http.listen(port, () => {
  console.log(chalk.blue(`App listen on port ${port}`));
});
