import React from "react";
import image404 from "../../images/4042.jpg";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="image-container">
      <img className="image-core" alt="notFoundPage" src={image404} />
    </div>
  );
};

export default NotFound;
