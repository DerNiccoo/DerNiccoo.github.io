import React from "react";
import "./Modal.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

/**
 * Custom Modal to show for e.g. are you sure questions. Parameters
 * 
 * show: true/false => show the modal or not, props to force a rerender on change
 * title: string => Headline text
 * body: string => Body text
 * submit: string => Text inside the submit button
 * handleClose: method => what should happen if the modal is closed. Best default ist just to change show = false
 * handleSubmit: method => the user submitted the modal. Delete / Save or what else should happen goes here
 * @param {*} props 
 */
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
        <Button variant="primary" onClick={() => {props.handleSubmit()}}>
          {props.submit}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
