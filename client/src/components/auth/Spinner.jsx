import React from "react";
import { Spinner } from "react-bootstrap";

const CustomSpinner = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Spinner animation="border" variant="info" />
    </div>
  );
};

export default CustomSpinner;
