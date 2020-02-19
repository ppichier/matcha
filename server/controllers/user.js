const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

exports.profile = (req, res) => {
  // const form = new FormData.IncomingForm()

  // form.parse( err, fields, files , () => {

  //   const data = fs.readFile(files[0])

  //   INSERT

  // })
  console.log("youhou");
  return res.json({
    msg: req.userId
  });
};

exports.uploadImage = (req, res) => {
  let form = new formidable.IncomingForm();
  console.log(form);
  console.log("upoad image");

  form.parse(req);

  form.on("fileBegin", (name, file) => {
    file.path = __dirname + "/../images/" + file.name;
  });

  form.on("file", (name, file) => {
    console.log("Uploaded " + file.name);
    l;
    var bitmap = fs.readFileSync(__dirname + "/../images/smoke.png");
    // var bitmap = fs.readFileSync(__dirname + "/../images/userUuid/imageprofile.png");
    image64 = new Buffer(bitmap).toString("base64");

    // STOCKER BD PATH
    return res.json({
      image: image64
    });
  });
};

exports.readImage = (req, res) => {
  var bitmap = fs.readFileSync(__dirname + "/../images/smoke.png");
  // convert binary data to base64 encoded string
  image64 = new Buffer(bitmap).toString("base64");

  return res.json({
    image: image64
  });
};
