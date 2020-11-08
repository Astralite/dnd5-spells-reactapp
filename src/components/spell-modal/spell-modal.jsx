import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Modal';

import './spell-modal.scss';

function SpellModal({ show, onHide, spellInfo }) {
  const { name, desc, level, duration, range } = spellInfo;
  const heading = name || "Loading...";
  const content = desc || "";
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
        <div className="attributes-container">
          <div className="attribute"><b>Level:&nbsp;</b>{level}</div>
          <div className="attribute"><b>Duration:&nbsp;</b>{duration}</div>
          <div className="attribute"><b>Range:&nbsp;</b>{range}</div>
        </div>
        {content}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SpellModal;