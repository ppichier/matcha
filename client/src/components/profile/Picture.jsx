import React, { useState, Fragment } from "react";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import "./Picture.css";

const Picture = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
  return (
    <Fragment>
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={handleSelect}
      >
        <Carousel.Item>
          <img
            className="test"
            src="https://img.myloview.fr/images/icone-de-profil-d-espace-reserve-par-defaut-400-81929628.jpg?text=First slide&bg=373940"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="test"
            src="https://img.myloview.fr/images/icone-de-profil-d-espace-reserve-par-defaut-400-81929628.jpg?text=Second slide&bg=282c34"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="test"
            src="https://img.myloview.fr/images/icone-de-profil-d-espace-reserve-par-defaut-400-81929628.jpg?text=Third slide&bg=20232a"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </Fragment>
  );
};
export default Picture;
