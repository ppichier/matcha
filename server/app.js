//global import
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const chalk = require("chalk");
const con = require("./db");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth");

//app
const app = express();

con.connect(err => {
  if (err) throw err;
  console.log(chalk.blue("Connected to SQL server"));
});

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

//routes middlewares
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(chalk.blue(`App listen on port ${port}`));
});
