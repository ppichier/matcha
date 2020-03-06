import React, { Component, Fragment, useState } from "react";
import Select from "react-select";
import "../navbar/Navbar.css";
import { Col, Form } from "react-bootstrap";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
const SliderWithTooltip = createSliderWithTooltip(Slider);

const FilterProfile = () => {
  const [values, setValues] = useState({
    options: [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" }
    ]
  });
  const MyComponent = () => <Select options={values.options} />;
  return (
    <Fragment>
      <Form.Label className="style-menu">Tag</Form.Label>
      {MyComponent()}
      <Form className="style-menu">
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>Age</Form.Label>
            <SliderWithTooltip min={17} max={65} marks={{ 18: 18, 65: 65 }} />
          </Form.Group>
        </Form.Row>
      </Form>
      <Form className="style-menu">
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>Localisation</Form.Label>
            <SliderWithTooltip
              min={0}
              max={1000}
              marks={{ 0: 0, 1000: 1000 }}
            />
          </Form.Group>
        </Form.Row>
      </Form>
      <Form className="style-menu">
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>popularité</Form.Label>
            <SliderWithTooltip
              min={0}
              max={1000}
              marks={{ 0: 0, 1000: 1000 }}
            />
          </Form.Group>
        </Form.Row>
      </Form>
      <Form className="style-menu">
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>Taille</Form.Label>
            <SliderWithTooltip
              min={130}
              max={230}
              marks={{ 130: 130, 230: 230 }}
            />
          </Form.Group>
        </Form.Row>
      </Form>
    </Fragment>
  );
};
export default FilterProfile;
