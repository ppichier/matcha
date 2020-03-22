import React, { Fragment, useState, useEffect } from "react";
import Select from "react-select";
import "../navbar/Navbar.css";
import { Col, Form, Button } from "react-bootstrap";
import Slider, { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { filterProfile } from "../../api";
import makeAnimated from "react-select/animated";

import queryString from "query-string";
import { readCommonTag } from "../../api";

const SliderWithTooltip = createSliderWithTooltip(Slider.Range);

const FilterProfile = location => {
  const [values, setValues] = useState({
    selectedTags: [],
    commonTags: [],
    age: [17, 17],
    location: [0, 0],
    score: [0, 0],
    userSize: [129, 129],
    err: "",
    msg: ""
  });

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const v = queryString.parse(location.search);
    readCommonTag(v.uuid)
      .then(data => {
        if (data && data.err) {
        } else {
        }
        setValues({
          ...data,
          ...values,
          commonTags: data.commonTags
        });
      })
      .catch(err => console.log(err));
  }, [location]);

  const handleChangeTags = tags => {
    if (tags === null) {
      setValues({ ...values, selectedTags: [] });
    } else {
      let tmp = tags.map(tag => tag.value);
      setValues({ ...values, selectedTags: tmp });
    }
  };

  const MyComponent = () => (
    <Select
      placeholder="Tags"
      closeMenuOnSelect={false}
      onChange={handleChangeTags}
      components={animatedComponents}
      isMulti
      options={values.commonTags}
    />
  );

  const handleChange = (name, i) => event => {
    let b = [event[0], event[1]];
    setValues({
      ...values,
      [name]: b
    });
  };

  const handleSubmit = event => {
    filterProfile({
      age: values.age,
      userSize: values.userSize,
      location: values.location,
      score: values.score,
      selectedTags: values.selectedTags
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
      {/* <Form.Label className="style-menu">Tags</Form.Label> */}
      <Form
        style={{
          backgroundColor: "#fff",
          fontWeight: "bold",
          color: "#808080"
        }}
      >
        <Form.Row className="px-4 pt-4">
          <Form.Group as={Col}>{MyComponent()}</Form.Group>
        </Form.Row>
        {/* <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>Age</Form.Label>
            <SliderWithTooltip
              min={17}
              max={65}
              value={[values.age[0], values.age[1]]}
              onChange={handleChange("age")}
              marks={{ 18: 18, 65: 65 }}
            />
          </Form.Group>
        </Form.Row> */}
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>Age</Form.Label>
            <SliderWithTooltip
              min={17}
              max={65}
              value={[values.age[0], values.age[1]]}
              onChange={handleChange("age")}
              marks={{ 18: 18, 65: 65 }}
              tipFormatter={v => (v.toString() === "17" ? "Aucun" : `${v}ans`)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>Localisation</Form.Label>
            <SliderWithTooltip
              min={0}
              max={100}
              value={[values.location[0], values.location[1]]}
              onChange={handleChange("location")}
              marks={{ 0: "0", 100: "100" }}
              tipFormatter={v => `${v}km`}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label> Popularite</Form.Label>
            <SliderWithTooltip
              min={0}
              max={1000}
              value={[values.score[0], values.score[1]]}
              onChange={handleChange("score")}
              marks={{ 0: "0", 1000: "1000" }}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>Taille</Form.Label>
            <SliderWithTooltip
              min={129}
              max={230}
              value={[values.userSize[0], values.userSize[1]]}
              onChange={handleChange("userSize")}
              marks={{ 130: "130", 230: "230" }}
              tipFormatter={v => (v.toString() === "129" ? "Aucun" : `${v}cm`)}
            />
          </Form.Group>
        </Form.Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => handleSubmit(values)}
            className="text-uppercase mx-4 mb-4"
            variant="outline-info"
            style={{ letterSpacing: "1px", fontWeight: "bold" }}
          >
            Valider
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};
export default FilterProfile;
