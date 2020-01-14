const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  console.log(req.body);
  res.json({ err: "test" });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
