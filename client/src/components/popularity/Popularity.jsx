import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./Popularity.css";
import NavbarHeader from "../navbar/Navbar";
import PopularitySlider from "./PopularitySlider";
import { getUserLike, getUserVisit } from "../../api/popularity";
import { readImage } from "../../api/user";
import { notificationAlert } from "../functions/notification";

const Popularity = () => {
  const [peopleLike, setPeopleLike] = useState([]);
  const [peopleVisit, setPeopleVisit] = useState([]);

  async function fetchDataLike() {
    try {
      const data = await getUserLike();
      if (!data) {
        notificationAlert("Server down", "danger", "bottom-center");
        return;
      } else if (data.err) {
        notificationAlert(data.err, "danger", "bottom-center");
        return;
      }
      if (data.people.length !== 0) {
        let data_p = data.people;
        let promises = data_p.map((p) => readImage(p.uuid));
        Promise.all(promises)
          .then((data) => {
            if (data.err) return;
            else {
              const people = data_p.map((p, i) => {
                return { ...p, ...data[i] };
              });
              const firstElement = people.shift();
              people.push(firstElement);
              setPeopleLike(people);
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchDataVisit() {
    try {
      const data = await getUserVisit();
      if (data.err) return;
      if (data.people.length !== 0) {
        let data_p = data.people;
        let promises = data_p.map((p) => readImage(p.uuid));
        Promise.all(promises)
          .then((data) => {
            if (data.err) return;
            else {
              const people = data_p.map((p, i) => {
                return { ...p, ...data[i] };
              });
              const firstElement = people.shift();
              people.push(firstElement);
              setPeopleVisit(people);
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchDataLike();
    fetchDataVisit();
  }, []);

  return (
    <Fragment>
      <NavbarHeader />

      <Container fluid className="my-2">
        {/* <h3>Score de popularité :</h3> */}
        <Row className="px-4 py-4 mb-2">
          <Col>
            <div className="mb-5 row-title">
              <span>
                Les derniers <span>Like</span> reçus
              </span>
            </div>
            <PopularitySlider people={peopleLike} />
          </Col>
        </Row>
        <Row className="px-4 py-4">
          <div className="mb-5 row-title">
            <span>
              Les dernieres <span>visites</span> reçues
            </span>
          </div>
          <Col>
            <PopularitySlider people={peopleVisit} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Popularity;
