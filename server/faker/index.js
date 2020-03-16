const faker = require("faker");
const error = require("../controllers/error");
const pool = require("../db");
const uuidv4 = require("uuid/v4");
const _ = require("lodash");

exports.generateFakeProfiles = () => {
  faker.locale = "fr";
  let inc = 0;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(`Internal Error: ${err}`);
      return;
    } else {
      connection.query("SELECT * FROM Tag", [], (err, result) => {
        let userTags = [];
        if (err) {
          console.log(`Internal Error: ${err}`);
          return;
        } else {
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
            emailValidate: 1,
            tags: _.uniq(userTags),
            lastConnexion: lastConnexion[Math.round(Math.random())], //generate date
            emailValidate: 1,
            genreId: Math.floor(Math.random() * 7), // generate random 0-6
            sexualOrientationId: Math.floor(Math.random() * 7), // generate random 0-6
            age: Math.floor(Math.random() * (66 - 18)) + 18, //generate random between 18 - 65
            userSize: Math.floor(Math.random() * (231 - 130)) + 130, //generate random betweem  130 230
            bio: faker.lorem.text(),
            imageProfile: faker.image.avatar(),
            // displayMap: 1,
            lat: Math.random() * (49.026657 - 48.736129) + 48.736129, // generate -90 90
            lng: Math.random() * (2.549672 - 2.10954) + 2.10954, // generate -180 180 48.882072
            localisationActive: 1,
            popularity: Math.floor(Math.random() * 301)
          };
          // PARIS 48.881303,2.329421

          connection.query(
            "INSERT INTO User (Uuid, Email, Password, UserName, FirstName, LastName, EmailValidate, GenreId, SexualOrientationId, Age, UserSize, Bio, Lat, Lng, LocalisationActive, Score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              people.uuid,
              people.email,
              people.password,
              people.pseudo,
              people.firstName,
              people.lastName,
              people.emailValidate,
              people.genreId,
              people.sexualOrientationId,
              people.age,
              people.userSize,
              people.bio,
              people.lat,
              people.lng,
              people.localisationActive,
              people.popularity
            ],
            (err, result) => {
              if (err)
                console.log(
                  `ERROR - Fake user ${inc} was not created : ${err}`
                );
              else console.log(`OK - Fake user ${inc} was created`);
              inc++;
            }
          );
          console.log(people);
          connection.release();
          return;
        }
      });
    }
  });
};
