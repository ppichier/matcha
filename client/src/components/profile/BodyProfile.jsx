import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormCheck from "react-bootstrap/FormCheck";
import Badge from "react-bootstrap/Badge";

const BodyProfile = () => {
  const [values, setValues] = useState({
    tags: []
  });
  const handlePress = event => {
    console.log(event.target.value);
    console.log(values.tags);
    if (event.key === "Enter") {
      const tmp = { ...values, tags: [...values.tags, event.target.value] };
      setValues(tmp);
    }
  };

  const handleDeleteTag = () => {};

  const handleSubmit = () => {};
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" placeholder="Nom"></Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Prenom</Form.Label>
          <Form.Control type="text" placeholder="Prenom"></Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Pseudo</Form.Label>
          <Form.Control type="text" placeholder="Pseudo"></Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email"></Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Mot de Passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de Passe"
          ></Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6">
          <Form.Label>Je suis </Form.Label>
          <Form.Control as="select">
            <option> Un Homme </option>
            <option> Une Femme </option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Je cherche </Form.Label>
          <Form.Control as="select">
            <option> Un Homme </option>
            <option> Une Femme </option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Group md="12">
        <Form.Label>Date de naissance</Form.Label>
        <Form.Control type="date" placeholder="date de naissance" name="date" />
      </Form.Group>
      <Form.Group md="12">
        <Form.Label>Adresse postale</Form.Label>
        <Form.Control type="text" placeholder="Adresse" name="Adresse" />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} md="6">
          <Form.Label>ville</Form.Label>
          <Form.Control type="text" placeholder="ville" name="ville" />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Code postal</Form.Label>
          <Form.Control
            type="text"
            placeholder="Code postale"
            name="code postale"
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
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Centres d'intérêt</Form.Label>
        <Form.Control
          onKeyPress={handlePress}
          type="text"
          placeholder="Tags"
          name="tags"
        />
        <div>
          {values.tags.map((tag, i) => {
            return (
              <Badge key={i} variant="secondary">
                <div dangerouslySetInnerHTML={{ __html: "#" + tag }} />
                <Badge>x</Badge>
              </Badge>
            );
          })}
        </div>
      </Form.Group>
      <Button onClick={handleSubmit}>Valider</Button>
    </Form>
  );
};
export default BodyProfile;
