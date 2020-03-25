import React, { Fragment, useState, useEffect } from "react";
import Select from "react-select";
import "../navbar/Navbar.css";
import { Col, Form, Button } from "react-bootstrap";
import Slider, { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { filterProfile } from "../../api";
import makeAnimated from "react-select/animated";
import MatchMe from "./MatchMe";

import queryString from "query-string";
import { readCommonTag } from "../../api";

const SliderWithTooltip = createSliderWithTooltip(Slider.Range);

const FilterProfile = ({ setFilterParams }, location, props) => {
  console.log("+++++++++++++++++++++");

  const [filter, setfilter] = useState({
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
        if (!data) {
          return;
        }
        if (data && data.err) {
        } else {
        }
        setfilter({
          ...data,
          ...filter,
          commonTags: data.commonTags
        });
      })
      .catch(err => console.log(err));
  }, [location]);

  const handleChangeTags = tags => {
    if (tags === null) {
      setfilter({ ...filter, selectedTags: [] });
    } else {
      let tmp = tags.map(tag => tag.value);
      setfilter({ ...filter, selectedTags: tmp });
    }
  };

  const MyComponent = () => (
    <Select
      placeholder="Tags"
      closeMenuOnSelect={false}
      onChange={handleChangeTags}
      components={animatedComponents}
      isMulti
      options={filter.commonTags}
    />
  );
  props = filter;
  const handleChange = (name, i) => event => {
    let b = [event[0], event[1]];
    setfilter({
      ...filter,
      [name]: b
    });
    return <MatchMe props={filter} />;
  };

  return (
    <Fragment>
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
        <Form.Row className="px-4 py-4">
          <Form.Group as={Col}>
            <Form.Label>Age</Form.Label>
            <SliderWithTooltip
              min={17}
              max={65}
              value={[filter.age[0], filter.age[1]]}
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
              value={[filter.location[0], filter.location[1]]}
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
              value={[filter.score[0], filter.score[1]]}
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
              value={[filter.userSize[0], filter.userSize[1]]}
              onChange={handleChange("userSize")}
              marks={{ 130: "130", 230: "230" }}
              tipFormatter={v => (v.toString() === "129" ? "Aucun" : `${v}cm`)}
            />
          </Form.Group>
        </Form.Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={setFilterParams({ ...filter })}
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
