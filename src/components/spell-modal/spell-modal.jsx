import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Modal';

function SpellModal({ show, onHide, heading, content }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SpellModal;