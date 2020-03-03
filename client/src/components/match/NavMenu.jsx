import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import "../navbar/Navbar.css";
import { Row, Col, Form } from "react-bootstrap";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
const SliderWithTooltip = createSliderWithTooltip(Slider);

const NavMenu = () => {
  return (
    <Fragment>
      <Col md={4} className="pl-5">
        <Row className="style_menu mt-5">
          <Col>
            <Form>
              <Form.Row>
                <Form.Group as={Col} className="px-3">
                  <Form.Label>Age</Form.Label>
                  <SliderWithTooltip
                    min={17}
                    max={65}
                    marks={{ 18: 18, 65: 65 }}
                  />
                </Form.Group>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Col>
    </Fragment>
  );
};
export default NavMenu;
