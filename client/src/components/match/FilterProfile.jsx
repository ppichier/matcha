import React, { Component, Fragment, useState, useEffect } from "react";
import Select from "react-select";
import "../navbar/Navbar.css";
import { Col, Form, Button } from "react-bootstrap";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { filterProfile } from "../../api/";

// import queryString from "query-string";
// import { readProfile } from "../../api/";

const FilterProfile = () => {
  const [values, setValues] = useState({
    // myTags: [],
    // commonTags: [],
    options: [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" }
    ],
    age: [
      {
        min: 18,
        max: 64
      }
    ],
    location: [
      {
        min: 0,
        max: 0
      }
    ],
    popularite: [
      {
        min: 0,
        max: 0
      }
    ],
    userSize: [
      {
        min: 0,
        max: 0
      }
    ],
    err: "",
    msg: ""
  });
  // useEffect(() => {
  //   readProfile()
  //     .then(data => {
  //       setValues({
  //         ...values,
  //         commonTags: data.commonTags
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }, []);
  const MyComponent = () => (
    <Select className="basic-multi-select" isMulti options={values.options} />
  );
  const handleChange = (name, i) => event => {
    const a = values[name];
    a.splice(i, 1);
    a.splice(i, 0, { min: event[0], max: event[1] });
    setValues({
      ...values,
      [name]: a
    });
  };

  const handleSubmit = event => {
    filterProfile({
      age: values.age,
      userSize: values.userSize,
      location: values.location,
      opularite: values.popularite
    })
      .then(data => {
        if (data.err) {
          setValues({
            ...values,
            err: data.err
          });
        } else {
          setValues({
            ...values,
            err: "",
            msg: data.msg
          });
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Fragment>
      <Form.Label className="style-menu">Tag</Form.Label>
      {MyComponent()}
      <Form className="style-menu">
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>Age</Form.Label>
            <Range
              min={17}
              max={65}
              onChange={handleChange("age")}
              marks={{ 18: 18, 65: 65 }}
            />
          </Form.Group>
        </Form.Row>
      </Form>
      <Form className="style-menu">
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>Localisation</Form.Label>
            <Range
              min={0}
              max={1000}
              onChange={handleChange("location")}
              marks={{ 0: 0, 1000: 1000 }}
            />
          </Form.Group>
        </Form.Row>
      </Form>
      <Form className="style-menu">
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>popularité</Form.Label>
            <Range
              min={0}
              max={1000}
              onChange={handleChange("popularite")}
              marks={{ 0: 0, 1000: 1000 }}
            />
          </Form.Group>
        </Form.Row>
      </Form>
      <Form className="style-menu">
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>Taille</Form.Label>
            <Range
              min={130}
              max={230}
              onChange={handleChange("userSize")}
              marks={{ 130: 130, 230: 230 }}
            />
          </Form.Group>
        </Form.Row>
      </Form>
      <Button
        onClick={() => handleSubmit(values)}
        className="text-uppercase style-menu profile-btn "
      >
        Valider
      </Button>
    </Fragment>
  );
};
export default FilterProfile;
