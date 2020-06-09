import React, { useState, useCallback } from "react";
import "./PopularitySlider.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useEffect } from "react";
import moment from "moment";
import localization from "moment/locale/fr";

const PopularitySlider = ({ people }) => {
  const [slidesToShow, setSlidesToShow] = useState(5);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    draggable: true,
    swipeToSlide: true,
  };

  moment().locale("fr", localization).format("LLL");

  const updateSlidesToShow = useCallback(() => {
    const w = window.innerWidth;

    const elementInPeople = (value) => {
      const l = people.length;
      if (l === 0) return 1;
      if (l >= value) return value;
      else return l;
    };
    if (w > 1240) setSlidesToShow(elementInPeople(5));
    else if (w > 1000) setSlidesToShow(elementInPeople(4));
    else if (w > 800) setSlidesToShow(elementInPeople(3));
    else if (w > 600) setSlidesToShow(elementInPeople(2));
    else setSlidesToShow(1);
  }, [people]);

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, [updateSlidesToShow]);

  const imageProfile = (p) => {
    let src = "";
    if (p.image !== null) src = "data:image/png;base64, " + p.image;
    else if (p.imageFakeProfile !== null) src = p.imageFakeProfile;

    return (
      <Image className="popularity-slider-image" src={src} roundedCircle />
    );
  };

  return (
    <Slider {...settings}>
      {people.map((p, i) => {
        return (
          <div key={i}>
            <Link
              to={`profile/${p.uuid}`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <div className="popularity-slider-container py-3 px-3">
                {imageProfile(p)}
                <div className="popularity-slider-pseudo">{p.pseudo}</div>
                <div className="popularity-slider-age">
                  {p.age === 17 ? null : `${p.age} ans`}
                </div>
                <div className="popularity-slider-date">
                  {moment(p.date).fromNow()}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </Slider>
  );
};

export default PopularitySlider;
