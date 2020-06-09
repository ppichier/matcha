import React from "react";
import "./Dashboard.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useEffect } from "react";
import { getUsersReports, deleteUser } from "../../api/admin";
import { useState } from "react";
import { notificationAlert } from "../functions/notification";

const Dashboard = () => {
  const [usersBlocked, setUsersBlocked] = useState([]);
  const [show, setShow] = useState(false);
  const [userUuidToDelete, setUserUuidToDelete] = useState(null);
  useEffect(() => {
    getUsersReports()
      .then((data) => {
        if (!data) {
          console.log("server down");
          return;
        } else {
          setUsersBlocked(data);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (uuid) => {
    setUserUuidToDelete(uuid);
    setShow(true);
  };

  const handleDeleteUser = () => {
    const newUsersBlocked = usersBlocked.filter(
      (e) => e.uuid !== userUuidToDelete
    );
    deleteUser(userUuidToDelete).then((data) => {
      if (!data) {
        console.error("impossible de supprimer l'utilisateur");
        return;
      } else {
        setShow(false);
        setUsersBlocked(newUsersBlocked);
        notificationAlert(data.msg, "danger", "bottom-center");
      }
    });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h3 className="dashboard-container-tile">Admin Dashboard</h3>
        <Table className="dashboard-core" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Pseudo</th>
              <th>Report</th>
              <th>Banir</th>
            </tr>
          </thead>
          <tbody>
            {usersBlocked.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.pseudo}</td>
                  <td>{e.count}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleShow(e.uuid)}
                      size="sm"
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Suppression utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est
          irréversible
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Quitter
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
