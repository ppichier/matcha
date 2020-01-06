const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  console.log(req.body);
  res.json({err: "test"});
});

app.listen(8000, () => {
  console.log("App listen on port 8000");
});
