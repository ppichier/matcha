
import React, { useState, Fragment, useEffect } from "react";
import { ButtonGroup, Button } from "react-bootstrap";




const Test = () => {
return(
  <Fragment>
     <ButtonGroup  variant="outline-info" className="style-menu px-4 py-4 my-3 " style={{ width: "100%"}}>
    <Button variant="outline-info" className="btn-switsh">Match</Button>
    <Button variant="outline-info" className="btn-switsh">Recherche</Button>
  </ButtonGroup>
  </Fragment>
);

}
export default Test;