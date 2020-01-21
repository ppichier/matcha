import React, { useState, Fragment } from "react";
import { Col } from "react-bootstrap";

const CardPicture = () => {
  return (
    <Fragment>
      <div>
        <div className="col-lg-3 col-md-4 wav-left-none">
          <label htmlFor="single">
            <img
              className="test"
              src="https://img.myloview.fr/images/icone-de-profil-d-espace-reserve-par-defaut-400-81929628.jpg?text=First slide&bg=373940"
              alt="First slide"
            />
          </label>
          <input type="file" name="file" id="single" />
        </div>
      </div>
    </Fragment>
  );
};
export default CardPicture;
