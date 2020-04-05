import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./Popularity.css";
import NavbarHeader from "../navbar/Navbar";
import PopularitySlider from "./PopularitySlider";
import { getUserLike } from "../../api/popularity";
import { readImage } from "../../api/user";

const Popularity = () => {
  const [peopleLike, setPeopleLike] = useState([]);

  async function fetchDataLike() {
    try {
      const data = await getUserLike();
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
              setPeopleLike(people);
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  }

  // async function fetchDataVisit() {
  //   try {
  //     const data = await getUserLike();
  //     if (data.err) return;
  //     if (data.people.length !== 0) {
  //       let data_p = data.people;
  //       let promises = data_p.map((p) => readImage(p.uuid));
  //       Promise.all(promises)
  //         .then((data) => {
  //           if (data.err) return;
  //           else {
  //             const people = data_p.map((p, i) => {
  //               return { ...p, ...data[i] };
  //             });
  //             setPeopleLike(people);
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return;
  //   }
  // }

  useEffect(() => {
    fetchDataLike();
    // fetchDataVisit();
  }, []);
  console.log();

  return (
    <Fragment>
      <NavbarHeader />

      <Container fluid className="my-2">
        <Row className="px-4 py-4">
          <Col>
            <div className="mb-4 row-title">Les derniers Like reçus</div>
            <PopularitySlider people={peopleLike} />
          </Col>
        </Row>
        <Row className="px-4 py-4">
          <div className="mb-4 row-title">Les dernieres visites reçues</div>
          <Col>
            <PopularitySlider people={[]} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Popularity;
