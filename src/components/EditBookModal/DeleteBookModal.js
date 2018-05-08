import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import './delete-book-modal.scss';

export default class DeleteBookModal extends Component {
  static propTypes = {
    show_modal: PropTypes.bool,
    closeModalHandler: PropTypes.func,
    deleteBookHandler: PropTypes.func
  }
  
  componentDidMount() {
    const modals = document.querySelectorAll('div[role="dialog"][data-reactroot]');

    modals.forEach(modal => {
      if (modal.querySelector('.delete_book_modal')) {
        const first_child = modal.querySelector('.modal-backdrop');

        first_child.style.zIndex = 1050;
      }
    });
  }
  
  render() {
    const { show_modal, closeModalHandler, deleteBookHandler } = this.props;

    return (
      <Modal
        className="delete_book_modal"
        show={show_modal}
        onHide={closeModalHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete book</Modal.Title>
        </Modal.Header>
    
        <Modal.Body>
          Deleting a book is permanent
        </Modal.Body>
    
        <Modal.Footer>
          <div className="btn_group_modal">
            <button
              className="btn-brand btn-cancel"
              onClick={closeModalHandler}
            >
              Cancel
            </button>
            <button
              className="btn-brand"
              style={{marginLeft: '10px'}}
              onClick={deleteBookHandler}
            >
              DELETE
            </button>
          </div>
        </Modal.Footer>
    
      </Modal>
    );
  }
}
