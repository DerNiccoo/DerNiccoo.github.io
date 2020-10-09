import React from "react";
import "./Modal.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function CustomModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Zurück
        </Button>
        <Button variant="primary" onClick={props.handleSubmit}>
          {props.submit}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
