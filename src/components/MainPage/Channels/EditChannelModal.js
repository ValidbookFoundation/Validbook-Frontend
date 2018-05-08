import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'react-md';
import { Modal } from 'react-bootstrap';
import './index.scss';

export default class EditChannelModal extends Component {
  render() {
    const { closeModalHandler, show_modal } = this.props;

    return (
      <Modal
        show={show_modal}
        onHide={closeModalHandler}
        className="modal-channel"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit channel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          edit channel body
        </Modal.Body>

        <Modal.Footer>
          <div style={{float: 'right'}}>
            <button
              className="btn-brand btn-cancel"
              onClick={closeModalHandler}
            >
              Cancel
            </button>
            <button
              className="btn-brand"
              style={{
                marginLeft: '10px'
              }}
            >
              Create Channel
            </button>
          </div>
        </Modal.Footer>

      </Modal>
    );
  }
}

EditChannelModal.propTypes = {
  channel_name: PropTypes.string,
  channel_description: PropTypes.string,
  createChannel: PropTypes.func,
  loadChannels: PropTypes.func,
  authorized_user: PropTypes.object,
};
