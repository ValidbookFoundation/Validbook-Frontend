import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './sign-error-modal.scss'; 

const SignErrorModal = ({ showModal, closeModalHandler, error }) => (
  <Modal
    dialogClassName="sign-error"
    show={showModal}
    onHide={closeModalHandler}
  >
    <Modal.Header closeButton>
      <Modal.Title>Error</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div>
        {error 
          ? error
          : 'Sorry, something went wrong. The document was not signed.'
        }
      </div>
    </Modal.Body>

    <Modal.Footer>
      <button
        style={{display: 'block'}}
        className="btn-brand" 
        onClick={closeModalHandler}>OK</button>
    </Modal.Footer>
  </Modal>
);

SignErrorModal.PropTypes = {
  showModal: PropTypes.boolean,
  closeModalHandler: PropTypes.func,
  error: PropTypes.string
};

export default SignErrorModal;
