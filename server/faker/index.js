const faker = require("faker");
const error = require("../controllers/error");
const pool = require("../db");
const uuidv4 = require("uuid/v4");
const _ = require("lodash");

exports.generateFakeProfiles = () => {
  //Generate fake profiles
  faker.locale = "fr";

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        err: "Internal Error HERE"
      });
    } else {
      connection.query("SELECT * FROM Tag", [], (err, result) => {
        let userTags = [];
        if (err) error.handleError(res, err, "Internal error", 500, connection);
        else {
          let commonTags = [];
          if (result.length > 0) {
            commonTags = result.map(tag => tag.Label);
            let rand = Math.floor(Math.random() * commonTags.length + 1);
            for (let i = 0; i < rand; i++) {
              userTags.push(
                commonTags[Math.floor(Math.random() * commonTags.length)]
              );
            }
          }
          const lastConnexion = [null, faker.date.recent()];
          const people = {
            lastName: faker.name.lastName(),
            firstName: faker.name.firstName(),
            pseudo: faker.internet.userName(),
            email: faker.internet.email(),
            uuid: uuidv4(),
            password:
              "$2b$10$aS80Io9ilmNVSdy1jbJxje6.hKnlWahac8dWNCBp0ETPFDAAw3/ri", // Matcha123+
            tags: _.uniq(userTags),
            lastConnexion: lastConnexion[Math.round(Math.random())], //generate date
            emailValidate: 1,
            genreId: Math.floor(Math.random() * 7), // generate random 0-6
            sexualOrientation: Math.floor(Math.random() * 7), // generate random 0-6
            age: Math.floor(Math.random() * (66 - 18)) + 18, //generate random between 18 - 65
            userSize: Math.floor(Math.random() * (231 - 130)) + 130, //generate random betweem  130 230
            bio: faker.lorem.text(),
            imageProfile: faker.image.avatar(),
            displayMap: 1,
            lat: Math.random() * (49.026657 - 48.736129) + 48.736129, // generate -90 90
            lng: Math.random() * (2.549672 - 2.10954) + 2.10954, // generate -180 180 48.882072
            localisationActive: 1
          };
          // PARIS 48.881303,2.329421

          console.log(people);
        }
        connection.release();
      });
    }
  });
};
