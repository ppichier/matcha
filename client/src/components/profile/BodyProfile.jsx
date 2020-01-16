import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import "./BodyProfile.css";

const BodyProfile = ({ handleSubmit }) => {
  const [values, setValues] = useState({
    myTags: [],
    commonTags: [],
    email: "",
    pseudo: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    password: "",
    gender: "N",
    sexualPreference: "N",
    description: "",
    adress: "",
    city: "",
    postalCode: "",
    err: ""
  });
  const handleChange = name => event => {
    const tmp = { ...values, [name]: event.target.value };
    setValues(tmp);
  };
  const handlePress = event => {
    if (event.key === "Enter") {
      const tmp = { ...values, myTags: [...values.myTags, event.target.value] };
      setValues(tmp);
    }
  };

  const handleDeleteTag = i => () => {
    const tab = [...values.myTags];
    tab.splice(i, 1);
    setValues({ ...values, myTags: tab });
  };

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom"
            onChange={handleChange("firstName")}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Prenom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Prenom"
            onChange={handleChange("lastName")}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Pseudo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Pseudo"
            onChange={handleChange("pseudo")}
          ></Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={handleChange("email")}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Mot de Passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de Passe"
            onChange={handleChange("password")}
          ></Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6">
          <Form.Label>Je suis </Form.Label>
          <Form.Control as="select" onChange={handleChange("gender")}>
            <option value="N"> Séléctionnez un genre</option>
            <option value="M"> Un Homme </option>
            <option value="F"> Une Femme </option>
            <option value="TF"> une Transféminine</option>
            <option value="TH"> une Transmasculin</option>
            <option value="B">Bigenre</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Je cherche </Form.Label>
          <Form.Control as="select" onChange={handleChange("sexualPreference")}>
            <option value="N"> Séléctionnez un genre</option>
            <option value="M"> Un Homme </option>
            <option value="F"> Une Femme </option>
            <option value="TF"> une Transféminine</option>
            <option value="TH"> une Transmasculin</option>
            <option value="B">Bigenre</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Group md="12">
        <Form.Label>Date de naissance</Form.Label>
        <Form.Control
          type="date"
          placeholder="date de naissance"
          name="date"
          onChange={handleChange("dateOfBirth")}
        />
      </Form.Group>
      <Form.Group md="12">
        <Form.Label>Adresse postale</Form.Label>
        <Form.Control
          type="text"
          placeholder="Adresse"
          name="Adresse"
          onChange={handleChange("adress")}
        />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} md="6">
          <Form.Label>ville</Form.Label>
          <Form.Control
            type="text"
            placeholder="ville"
            name="ville"
            onChange={handleChange("city")}
          />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Code postal</Form.Label>
          <Form.Control
            type="text"
            placeholder="Code postale"
            name="code postale"
            onChange={handleChange("postalCode")}
          />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="exampleForm.ControlTextarea1" md="12">
        <Form.Label>A propos de vous</Form.Label>
        <Form.Control
          as="textarea"
          rows="4"
          placeholder="A propos de vous"
          name="bio"
          onChange={handleChange("description")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Centres d'intérêt</Form.Label>
        <Form.Control
          onKeyPress={handlePress}
          type="text"
          placeholder="Tags"
          name="myTags"
        />
        <div className="mytags-main mt-2">
          {values.myTags.map((tag, i) => {
            return (
              <div className=" mytags mr-2 pl-2 mt-2" key={i}>
                <div dangerouslySetInnerHTML={{ __html: "#" + tag }} />
                <Badge className="badge-delete" onClick={handleDeleteTag(i)}>
                  x
                </Badge>
              </div>
            );
          })}
        </div>
      </Form.Group>
      <Button onClick={() => handleSubmit(values)}>Valider</Button>
      {JSON.stringify(values)}
    </Form>
  );
};
export default BodyProfile;
