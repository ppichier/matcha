import React from "react";
import "./Admin.css";
import { Form, Button } from "react-bootstrap";

const Admin = () => {
    
  const handleSubmit = () => {
    console.log("yo");
// fetch db admin table if ok redirect to /admin/panel
// if not ok error msg
  };
  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            autoComplete="on"
            type="email"
            placeholder="Entrez votre email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            required
            autoComplete="on"
            type="password"
            placeholder="Mot de passe"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Valider
        </Button>
      </Form>
    </div>
  );
};

export default Admin;
